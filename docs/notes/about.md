---
title: 关于
sidebar: false
time: 2020-03-25 13:12:30
comment: true
---

> 联系方式

<ul>
<li v-for="(item,i) in $themeConfig.noteConfig.contact.items">
<a :href="item.link" target="_blank">{{item.text}}</a> <OutboundLink />
</li>
</ul>


