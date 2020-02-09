---
layout:     post
published:  true
toc:        true
title:      Robot Electronics EthRly16 .net core lib
slug:       ethrly-dotnet-core-lib
date:       2015-04-30 12:00:00
categories: software
summary: >
  dotnet core library to control an 
  EthRly 16 relay board from Robot Electronics.
tags:
 - dotnet
 - .net
 - core
 - library
 - c#
 - ethrly16
 - robot
 - electronics
 - relay
---

Let’s move on to the next quick bit of code I refurbished lately. This time 
it’s a C# Library for an 8-port relay card from RobotElectronics. 
Specifically the EthRly16 with an ethernet port and 8 relays of which each 
one has a Normally-Open and Normally-Closed output. That probably explains 
the 16 in the model name, or its the 16 amps of switching load, who knows.

{% include image.html slug=page.slug image="device" %}

## How to use it

{% highlight csharp %}
EthRly16Card relayCard = new EthRly16Card("192.168.1.22");
{% endhighlight %}

Like the IPWE library this one will be instantiated by telling it the ip 
address of the device. After that you can use all functions the EthRly16 has 
to offer. Ask for the input voltage, the firmware version, the MAC address or 
to get to the good part, set and unset one or all relays and query the current 
states of them.

{% highlight csharp %}
double voltage = relayCard.GetInputVoltage();
byte[] mac = relayCard.GetMacAddress();
int version = relayCard.GetFirmwareVersion();
bool[] states = relayCard.GetRelaysStates();

relayCard.SetRelay(i, true);
relayCard.SetRelays(true);
{% endhighlight %}

{% include image.html slug=page.slug image="output" %}

The library including a sample console project is available on [Github][1].

<iframe class="youtube-embed" 
        title="Youtube video of relay card while the tests are running." 
        src="https://www.youtube.com/embed/sjE4ff9qfhI" 
        allowfullscreen>
</iframe>

## How it works

The relay card offers a tcp endpoint which is used to send commands to the 
device. More information about that is listed on the device website that is 
accessible using the ip address in the browser address line. Basically you 
send two bytes to the device. The first byte contains the command code and the 
second if needed the payload. After that you get the response which is 
usually one byte, except you query the mac address. In that case you get of 
course six bytes which represents the mac address.

{% include image.html slug=page.slug image="website" %}

Hopefully this will help someone and if you have questions leave a comment or 
send me an email or a tweet. See you with the next post.

[1]: https://github.com/theorangecurtain/EthRly16/
