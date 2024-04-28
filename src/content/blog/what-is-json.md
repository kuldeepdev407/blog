---
title: 'What is JSON'
published: true
description: 'Basics story of JSON'
tags: 
  - json
published_at: '2024-04-28 20:23 +0000'
updated_at: '2024-04-28 20:23 +0000'
#in min
read_time: 2 
author: "Kuldeep Singh"
---

I was getting bored so here is an article about JSON.

## What the heck JSON?
JSON or Jason you can pronounce it anyway as its creater [Crockford said in 2011](https://en.wikipedia.org/wiki/JSON).
> *"There's a lot of argument about how you pronounce that, but I strictly don't care."*

Its a basic file & data transfer formate. It is widely used in case of transfter of data also there are database that are based on JSON like MongoDB, Firebase etc. So knowing basic json is must for every programmer & developer.

## Types Supported by JSON
JSON only support `string`, `boolean`, `number`, `Array`, `Object`. From these type you can reperesent all the data you what to reperesent in the world.
 
For example if you want to reperesent date&time you can use `string` - `2024-04-01T10:00:00+00.00Z`.If you want to reperesent location coordinate you can use `number` & `Object`.

> There you go you now leanred JSON

Let's dissucss some of the complex data so you can grasp it full.

## Examples
Imagin you have user who have some data like below
```TXT
Name - John Dev
Email - john-dev@gmail.com
Gender - Male
haveChildern - No
Salary - 25000
```
Below is the Same reperesentaion in JSON

```JSON
{
  "name":"John Dev",
  "email":"john-dev@gmail.com",
  "gender":"male" // we could use boolean but there are more gender so we have to use string
  "haveChildren":false,
  "salary":5000000.01

}
```








