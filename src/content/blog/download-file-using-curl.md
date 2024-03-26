---
title: 'Download file using curl'
published: true
description: 'quick curl & tar command'
tags: 
  - curl
#cover_image: '/blog-placeholder-2.jpg'
published_at: '2024-03-26 20:23 +0000'
updated_at: '2024-03-26 20:23 +0000'
#in min
read_time: 2 
author: 
  - kuldeep_singh
---
Sometime i need to use `curl` to download things from web as a developer here is a quick command if you forget it.

```bash
curl -o <outputfilename> <downloadlink>
```

also if it is zip file that you are downloading, You can use below `tar` command:
```bash
tar -xf archive.tar
```

download & extract with same command

```bash
curl -L <downloadfileurl> | tar zx
```

