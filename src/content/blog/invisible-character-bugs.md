---
title: "Invisible Character Bugs"
published: true
description: "A brief overview of the kinds of bugs you can encounter when dealing with \n, standards, and Unicode, based on my experience."
tags:
  - unicode
  - experience
  - bugs
published_at: 2026-03-21 06:00 +0000
updated_at: 2026-03-21 06:00 +0000
read_time: 2
author: Kuldeep Singh
---

This week I ran into a surprisingly interesting bug while working on a feature that generates diffs for history changes in comments, description.

### The Setup

We have a system that tracks history changes in back-end. Whenever there’s a modification, we generate a diff and send both the old and new values to the front-end. The initial content follows a simple template:

```
Task {id}: Working on abc\n
Data: {data}\n
```

If anything changes, the diff should reflect it clearly.

### The Problem

While testing, I noticed something odd.

Even when no changes were made—just clicking the **Save** button for first time in FE —the system still generated a diff. The front-end showed differences between the "old" and "new" values, even though the text looked identical.

At first, I checked the strings using console logs. Everything appeared normal. No visible differences.

After spending some time debugging, I copied the API response and inspected it more closely. That’s when I noticed the issue:

- The old version used `\n` (LF – Line Feed) - system generate initially
- The new version used `\r\n` (CRLF – Carriage Return + Line Feed) - user update other things once from FE

So even though the text looked the same, the underlying newline characters were different—causing the diff algorithm to treat them as changes.

### Root Cause

The culprit turned out to be the browser.

When using a `<textarea>` in the front-end, browsers normalize line endings to `\r\n` as part of the HTML specification. So even if the user doesn’t modify anything and simply clicks save, the value retrieved from the textarea contains `\r\n` line endings.

This behavior is expected and standardized across browsers.

### The Fix

The solution was simple: normalize line endings before sending data to the API or in BE.

```js
text.replace(/\r\n/g, '\n')
```

By converting everything to \n, we ensured consistent comparisons and eliminated false diffs.

### Zero-Width Unicode Characters

A while back, I encountered another tricky issue related to invisible characters.

Some data in our database someone has added zero-width Unicode characters (like zero-width space or joiners). These characters are not visible when rendering text, but they still exist in the string and can affect comparisons, search, and validation logic.

We eventually had to scan the entire database table to identify and clean such entries.

### Takeaway

This bug was a great reminder that:
- Invisible characters can cause very visible issues
- Browsers follow standards that may not always align with back-end assumptions
- Normalizing input data is crucial when doing string comparisons
- Watch-out for Unicode 😁
