---
layout:     post
published:  true
title:      Multi Language Translator
slug:       multi-lang-translator
date:       2017-05-31 12:00:00
summary:    Web application that can convert text into multiple languages at once.
categories: software
tags:
- Google
- Bing
- language
- translate
- asp
- microsoft
---

A few months ago a friend of mine who worked on a project to help refugees after arriving in Germany with their daily routines and of course their education, asked me for a favor. Obviously they had some issues communicating with the kids, which came from several different countries with at least as much different languages.

So translators were used, but all those services like Google or Bing only support the translation of one language to one other language. So if you want to translate to six languages, you have to repeat the process six times for every sentence you want to translate. Tedious work!

To make the whole thing easier I spend two evenings bodging together an ASP.NET website consuming a translation service. At that point I can just fire many parallel translation requests and show the results. Now you can translate into many languages at once.

{% include image.html slug=page.slug image="screenshot" %}

<del>If you want to take a look and try it out, the URL is http://translator.reisch.it</del>
<ins>Sorry but the web app is no longer available.</ins>

Of course with everything, there is a downside. Originally I wanted to use Google Translate because they support the most languages, but unfortunately you’ll need a business to be able to use the service. I asked google if they could make an exception for this matter, but with no luck.

Alternatively, I now use the Bing Translator with two million characters a month for free, but with the drawback of only supporting a few languages that are useful for the given situation.

I designed the translator with dependency injection and an abstract translation layer to be able to support multiple translators relatively easy – so Google if by any chance someone of you will read this and you are willing to help, I would really like to integrate your services into the translator to support more languages.
