---
layout:     post
published:  true
toc:        true
title:      ELV IPWE .net lib
slug:       ipwe-dotnet-lib
date:       2014-04-24 12:00:00
categories: software
summary: >
  dotnet library to read the sensor values of an ELV IPWE 1 weather station.
tags:
 - elv
 - ipwe
 - dotnet
 - library
 - c#
 - software
 - assembly
---

Let's take a look on a little bit of code I wrote years ago to read the values 
from a weather station I bought. Basically everyone who doesn’t own the weather 
station IPWE (Ip Wetterdatenempfänger / Ip weather data receiver) from the 
manufacturer ELV can stop reading, because this is a .NET Class Library to read 
data from the device. It is written in C# and can be used with only two lines 
of code.

{% include image.html slug=page.slug image="device" %}

## How to use it

After adding a reference to the IpweOne project you can use the following two 
lines of code to get the data off all aquired sensors.

{% highlight ruby %}
IpweDevice ipwe = new IpweDevice("192.168.1.20");
List<IpweSensor> data = ipwe.GetSensors();
{% endhighlight %}

{% include image.html slug=page.slug image="data" %}

You can find the whole project on [GitHub][1]

## How it works

Internally I originally wanted to use the telnet server of the Ipwe Device. 
Turns out the telnet implementation is kind of exotic, because you have to send 
each character seperatly with specific timings. After some harsh outbursts of 
hate I decided to take on another approach and just do some easy screen 
scraping. So finally this application just downloads the html string of the 
website and extracts the relevant information.

{% include image.html slug=page.slug image="website" %}

So lets see if anyone can still find a use for it, because the product is 
discontinued. But still if you have questions leave a comment or send me an 
email or a tweet. See you soon.

[1]: https://github.com/theorangecurtain/Ipwe
