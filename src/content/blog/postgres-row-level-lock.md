---
title: Postgres Row level Lock
description: exploring row level lock in postgres and how they work with example
published: true
tags:
  - postgres
  - tech
  - pg-locks
published_at: 2026-11-03 06:00 +0000
updated_at: 2026-11-03 06:00 +0000
read_time: 3
author: Kuldeep Singh
---
Recently when i was using Claude to build thinks at my work and reading the project i came across code where it was writing query with `SELECT .. FOR KEY SHARE`, `FOR UPDATE`. So as a developer i just explored this topic more and found that this is a concept called Row level Locks that are available in Postgres. So i will be sharing this with you today.

## What Row Level Locks Do

Row level locks basically allow you to lock a row so other transactions can't change it until your transaction commits or rolls back. A normal `SELECT` does not take these locks and is never blocked by them, so reads and writes don't block each other. Only writes and locking reads like `SELECT ... FOR SHARE` can wait for a lock. There are different types of locks depending on what you want to block.

## Setup DB
**Setup used in all examples** (run in two separate sessions, T1 and T2):

```sql
CREATE TABLE accounts (
    id      INT PRIMARY KEY,
    email   TEXT UNIQUE,
    balance INT
);
CREATE TABLE orders (
    id         SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(id),
    amount     INT
);
INSERT INTO accounts VALUES (1, 'a@x.com', 100);
```
In the examples below try each T2 line separately. If you run them in order, T2 gets stuck on the first ⏳ line and the next lines won't run until T1 commits.

## Row Block Types

- `FOR KEY SHARE` - This is a basic one in which other transactions can't delete the row or change its key columns, which means the primary key and unique columns like `email` here. They can read it and update other columns like `balance`. Example:
```sql
-- T1

BEGIN;  
SELECT * FROM accounts WHERE id = 1 FOR KEY SHARE;  
-- T2  
SELECT * FROM accounts WHERE id = 1; -- ✅ works  
UPDATE accounts SET balance = 200 WHERE id = 1; -- ✅ works (non-key column)  
UPDATE accounts SET id = 2 WHERE id = 1; -- ⏳ waits (key change)  
DELETE FROM accounts WHERE id = 1; -- ⏳ waits  
-- T1  
COMMIT; -- T2's waiting statements now proceed
```


- `FOR SHARE` - This goes one level up it blocks any update or deletion of row but it allow other transaction to read from that row also it will allow other transaction to use `FOR SHARE` and `FOR KEY SHARE`. Example:
```sql
-- T1

BEGIN;  
SELECT * FROM accounts WHERE id = 1 FOR SHARE;  
-- T2  
SELECT * FROM accounts WHERE id = 1; -- ✅ works  
SELECT * FROM accounts WHERE id = 1 FOR SHARE; -- ✅ works (shared)  
SELECT * FROM accounts WHERE id = 1 FOR KEY SHARE; -- ✅ works  
UPDATE accounts SET balance = 200 WHERE id = 1; -- ⏳ waits  
DELETE FROM accounts WHERE id = 1; -- ⏳ waits  
-- T1  
COMMIT;  
```
    

- `FOR NO KEY UPDATE` - This blocks any update or deletion of the row and also blocks other transactions from taking `FOR SHARE`, `FOR NO KEY UPDATE` or `FOR UPDATE` on it, but it allows `FOR KEY SHARE`, so insertions in child tables that reference this row can still happen. Example:
```sql
-- T1

BEGIN;  
SELECT * FROM accounts WHERE id = 1 FOR NO KEY UPDATE;  
-- (UPDATE accounts SET balance = balance - 50 WHERE id = 1; takes this same lock implicitly)  
-- T2  
SELECT * FROM accounts WHERE id = 1; -- ✅ works  
INSERT INTO orders (account_id, amount) VALUES (1, 30); -- ✅ works (FK check uses FOR KEY SHARE)  
SELECT * FROM accounts WHERE id = 1 FOR SHARE; -- ⏳ waits  
UPDATE accounts SET balance = 200 WHERE id = 1; -- ⏳ waits  
DELETE FROM accounts WHERE id = 1; -- ⏳ waits  
-- T1  
COMMIT;  
```


- `FOR UPDATE` - This blocks any kind of modification for the row it even does not allow above locks to be shared it makes transaction wait till this is done. This is Strongest one. Example:
```sql
-- T1

BEGIN;  
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;  
-- T2  
SELECT * FROM accounts WHERE id = 1; -- ✅ works (plain read)  
SELECT * FROM accounts WHERE id = 1 FOR KEY SHARE; -- ⏳ waits  
INSERT INTO orders (account_id, amount) VALUES (1, 30); -- ⏳ waits (FK check needs KEY SHARE)  
UPDATE accounts SET balance = 200 WHERE id = 1; -- ⏳ waits  
DELETE FROM accounts WHERE id = 1; -- ⏳ waits  
-- T1  
COMMIT;
```

## How Locks Can Be Shared

This table shows what T2 can do while T1 is holding each lock (✅ works, ⏳ waits):

| T1 holds | Plain `SELECT` | `FOR KEY SHARE` / child `INSERT` | `FOR SHARE` | `FOR NO KEY UPDATE` / non-key `UPDATE` | `FOR UPDATE` / `DELETE` / key `UPDATE` |
|---|---|---|---|---|---|
| `FOR KEY SHARE` | ✅ | ✅ | ✅ | ✅ | ⏳ |
| `FOR SHARE` | ✅ | ✅ | ✅ | ⏳ | ⏳ |
| `FOR NO KEY UPDATE` | ✅ | ✅ | ⏳ | ⏳ | ⏳ |
| `FOR UPDATE` | ✅ | ⏳ | ⏳ | ⏳ | ⏳ |

## Links

- [Explicit Locking: Row-Level Locks](https://www.postgresql.org/docs/current/explicit-locking.html#LOCKING-ROWS)
