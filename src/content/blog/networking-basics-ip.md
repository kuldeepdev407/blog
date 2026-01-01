---
title: Basic Networking (IP)
published: true
description: It a story about how i got a burn out & what it taught me
tags:
  - ip
  - networking
published_at: 2025-12-21 09:23 +0000
updated_at: 2025-12-21 09:23 +0000
read_time: 2
author: Kuldeep Singh
---
Recently, I have been studying networking, and I thought I would share what I’ve learned so far. This post is about IP and routing not all routing algorithms, but just the basics. These concepts allow us to assign a unique ID to each device so they can connect with each other and communicate over a vast network.

## 1. Ipv4
IPv4 is Internet Protocol version 4. It uses a 32-bit address space, which means it has a limited number of available addresses. IPv4 has been used since the early days of the internet.An IPv4 address is represented as four numbers separated by dots (`.`), where each number can range from 0 to 255. For example, `192.168.0.1`—you’ve probably seen this before.

Originally, we were supposed to run out of IPv4 addresses. However, engineers came up with several techniques that allow us to continue using IPv4 without major issues.

### NAT (Network Translation Layer)
This is what is currently saving the internet. Basically, suppose you have a router with multiple users connected to it. When you send a packet to an IP address, it travels from your router to your ISP and then to the destination server. The router replaces your device’s private IP address with its own public IP address.

Because of this, the same IP addresses can be used by multiple people on different networks—similar to how two different buildings can both have a house numbered 101. You still know which house it is because you also know the building number.

In simple terms, this adds an extra layer that allows IP addresses to be shared, instead of consuming a unique public IP address for every device.

you can read more about it on https://en.wikipedia.org/wiki/Network_address_translation

![nat-working.png](/images/nat-working.png)

### IPv6
This is a newer version of IP that uses 128-bit addresses instead of 32-bit. It provides a nearly infinite number of IP addresses—about 340 undecillion (340,282,366,920,938,463,463,374,607,431,768,211,456).

This is comparable to assigning an IP address to every grain of sand on Earth and still having trillions of addresses left. With this version, Network Address Translation (NAT) is no longer necessary.

It is usually represented in hexadecimal format, separated by colons (:). 

## 2. Ipv4 Classes
IPv4 addresses are divided into five main classes, which define how a given IP range is intended to be used.

1. **Class A**
- Used for very large networks, such as cloud providers and government organizations (e.g., AWS, GCP, military networks).
- Range: 1.0.0.0 – 126.0.0.0
- Supports ~16 million devices per network

2. **Class B**
- Used for medium-sized organizations, such as universities, colleges, and large schools.
- Range: 128.0.0.0 – 191.255.0.0
- Supports ~65,000 devices per network

3. **Class C**
- Used for small organizations, startups, and home networks.
- Range: 192.0.0.0 - 223.255.255.0
- Supports 256 IP addresses per network

4. **Class D**:
- Reserved for multicast traffic, which allows routers and devices to communicate with multiple systems simultaneously.
- Range: 224.0.0.0 - 239.255.255.255
- Not used for standard host addressing
- Total addresses: 268,435,456

5. **Class E**:
- Initially reserved for experimental purposes.
- Considered a wasted IP range because many routers are hardcoded to reject these addresses.
- Range: 240.0.0.0 - 255.255.255.0
- Total addresses: 268,435,456 (~6.25% of the total IPv4 address space)

Thats basic of IP i think



