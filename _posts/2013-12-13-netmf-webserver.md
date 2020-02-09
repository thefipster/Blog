---
layout:     post
published:  true
title:      Webserver using NETMF and Gadgeteer
slug:       netmf-webserver
date:       2013-12-13 12:00:00
summary:    Implement a basic web server on a Gadgeteer micro controller using the .net micro framework.
categories: software
tags:
 - mcu
 - Gadgeteer
 - netmf
 - web server
 - micro
 - framework
 - http
---

Hi there, today we will tackle the task to host a little web server on a micro controller that runs the 
.NET Microframework and expose some REST like endpoints.

## Stuff and things

* FEZ Cerberus or FEZ Hydra or FEZ Spider
* Power module
* ENC 28 module
* 2x Gadgeteer cable
* Mini USB cable

## Preparation

If you want to use a FEZ Spider board, we already have an article for this preparation step. 
After that you can directly jump to the implementation part.

Depending on your micro controller board you have to do some prior steps before we can switch to implementing. 
Since I will use the FEZ Cerberus the preparations described here are explicit to that board. 
I also tested it with the FEZ Hydra board and it works even though GHI Electronics explicitly mention that it 
may harm the Hydra, in my case it worked as well as the Cerberus. But don’t make responsible if you fry your Hydra board.

## Firmware update

To use the Cerberus with the ENC28 ethernet module you first need to flash a new firmware to the board. 
The development packages of GHI Electronics contain a tool called “FEZ Config” which is able to transfer the firmware. 
In the same packaged are also two firmwares for the Cerberus and the Hydra. One without Ethernet support and the 
other one includes it. I guess it’s obvious that you have to flash the one including the Ethernet support.

## Mandatory Connection

After that GHI Electronics states that it is mandatory to connect the ENC28 module at all time to the board 
if you want to avoid damaging it. I forgot it several times by now and so far nothing happened, I guess their 
motto is: Safety first.

On the Cerberus board you need to connect the Ethernet module to socket 6. For other boards please check 
the GHI Electronics website for further information.

## Open Source Mainboards

Before we can implement the ethernet connection I have to mention one exception of the open source mainboard 
from GHI electronics: Once you start up Visual Studio, create a new Gadgeteer project and drag the ethernet 
module into the Visual Designer you get an error message. Well don’t be frustrated and skip the step, you don’t 
need it, if you have flashed the Ethernet firmware to the board, the ENC28 module is basically hardwired to the 
micro controller board. Just use it!

## Implementation

The following source code will initialize the ethernet module and is originally GHI Electronics and available on 
their Codeshare page. I just added some debug lines to output the acquired IP address and so on. GHI Electronics 
again state, that the code will only work on the Cerberus and not the Hydra. Well what can I say, I tested it and 
it just works.

{% highlight csharp %}

private string InitNetwork()
{
    Debug.Print("Initializing network...");
    string ipAddress = string.Empty;
    NetworkInterface[] interfaces = NetworkInterface.GetAllNetworkInterfaces();
    if (interfaces != null &amp;&amp; interfaces.Length &gt; 0)
    {
        NetworkInterface networkInterface = interfaces[0];
        Boolean isDhcpWorked = false;
 
        // dynamic IP address
        if (networkInterface.IsDhcpEnabled == false) networkInterface.EnableDhcp();
        // Wait for DHCP (on LWIP devices)
        for (int i = 0; i &lt; 5; i++)
        {
            networkInterface = NetworkInterface.GetAllNetworkInterfaces()[0];
            if (networkInterface.IPAddress != "0.0.0.0")
            {
                isDhcpWorked = true;
                break;
            }
 
            Debug.Print("Waiting for an IP Address...");
            Thread.Sleep(1000);
        }
 
        if (Microsoft.SPOT.Hardware.SystemInfo.SystemID.SKU != 3)
        {
            if (isDhcpWorked == false)
            {
                // static IP address
                networkInterface.EnableStaticIP("192.168.0.100", "255.255.255.0", "192.168.1.1");
                networkInterface.EnableStaticDns(new[] { "8.8.8.8" });
                string h = "df";
                Debug.Print("DHCP not enabled.");
            }
        }
 
        ipAddress = networkInterface.IPAddress;
 
        Debug.Print("Network ready.");
        Debug.Print("  IP Address: " + networkInterface.IPAddress);
        Debug.Print("  Subnet Mask: " + networkInterface.SubnetMask);
        Debug.Print("  Default Getway: " + networkInterface.GatewayAddress);
        Debug.Print("  DNS Server: " + networkInterface.DnsAddresses[0]);
    }
    else
    {
        Debug.Print("No network device found.");
    }
 
    return ipAddress;
}

{% endhighlight %}

{% include image.html slug=page.slug image="output" %}
