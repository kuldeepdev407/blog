---
title: NPM package symbol
description: "What the ^, ~ and other npm version symbols mean, and how MAJOR.MINOR.PATCH versioning works, with examples."
published: true
tags:
  - npm
  - versioning
published_at: 2026-11-04 06:00 +0000
updated_at: 2026-11-04 06:00 +0000
read_time: 3
author: Kuldeep Singh
---
So I have been working with web app for a long time, and until now I had never really focused on versions. I knew how versioning works, but yesterday, while looking at a git diff, I saw a package update where the `^` symbol had been removed from the version. It looked something like this:

```diff
- "express": "^4.18.2"
+ "express": "4.18.2"
```

That sparked my curiosity to explore this a bit. Before we get to that, let me tell you about basic versioning.

## How basic versioning works

You might have seen package versions like `1.0.1` or `12.9.1`. You see them on almost every application because this is a kind of standard among developers, and it is the one used by npm packages and most libraries. Some projects use dates as versions instead. For example, Ubuntu `24.04` was released in April 2024. There are many more ways to do it, but I am not going to cover them all. Here we are only looking at the one npm libraries use.

## MAJOR MINOR PATCH

In this versioning system you give any package 3 numbers separated by dots. The template looks like `{MAJOR}.{MINOR}.{PATCH}`. The suggested starting point for a new app is `0.1.0`, but it is up to you where you want to start. After that, you just keep going.

- **MAJOR** - changed when you update the code in a way that could break other people's code. Example: `1.4.2` → `2.0.0` after renaming a function that others call.
- **MINOR** - changed when you add something new but old code still works. Example: `1.4.2` → `1.5.0` after adding a new function.
- **PATCH** - changed when you are just fixing bugs, without adding anything new, and usage remains the same. Example: `1.4.2` → `1.4.3` after fixing a bug.

Notice that the numbers to the right reset to 0 when you bump one. Also, while the major version is `0` (like `0.3.1`), the project is still in early development and anything can change at any time. Once the public API is stable, you release `1.0.0`.

This versioning system is called **Semantic Versioning (SemVer)**, and most libraries use it. It is just a convention and there is no hard and fast rule, so nothing stops a package from breaking something in a minor update. You can read more about it at the link below.

## Basic NPM Symbols

There are many symbols available in npm that tell it which versions of a package it is allowed to install and how far it can update.

1. `^` - allows minor and patch updates, so the latest version is picked while MAJOR stays the same. Example: `^1.2.3` means `>=1.2.3 <2.0.0`, so `1.2.4` and `1.9.0` are allowed but `2.0.0` is not. Be careful, it is stricter below `1.0.0`: `^0.2.3` means `>=0.2.3 <0.3.0`, and `^0.0.3` allows only `0.0.3`.
2. `~` - allows only patch updates. Example: `~1.2.3` means `>=1.2.3 <1.3.0`, so `1.2.9` is allowed but `1.3.0` is not.
3. `>`, `>=`, `<`, `<=` - these are basically the same as in programming: greater than, greater than or equal to, less than, and less than or equal to. A space between two of them means AND. Example: `>=1.0.2 <=10.0.1` means the version should be greater than or equal to `1.0.2` and less than or equal to `10.0.1`. You can make other combinations the same way.
4. `||` - this is OR, which means either of the given ranges can be used. Example: `^1.0.0 || ^2.0.0` allows `1.5.0` and `2.3.0` but not `3.0.0`.
5. No symbol - only that exact version. Example: `1.2.3` allows `1.2.3` and nothing else.
6. `-` - an inclusive range. Example: `1.2.3 - 2.3.4` means `>=1.2.3 <=2.3.4`.
7. `x` and `*` - a wildcard for any number. Example: `1.2.x` means `>=1.2.0 <1.3.0`, and `*` means any version.

These are all I have been able to find for now. If you know of any others, let me know.

## So what does removing `^` do?

Now back to the diff from the start. With `^4.18.2`, npm can pick any newer `4.x` version when it resolves the package. With `4.18.2`, it can only ever use that exact version, so an update has to be done on purpose.

By default, `npm install express` saves the version with `^`. If you want the exact version saved instead, use `npm install express --save-exact`.

## Links

- https://semver.org/
- https://github.com/npm/node-semver
