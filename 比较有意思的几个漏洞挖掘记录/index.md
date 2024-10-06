# 比较有意思的几个漏洞挖掘记录


<!--more-->

> _转载自： [https://forum.butian.net/share/3692](https://forum.butian.net/share/3692)_

## sql 注入

某条数据，点击详情的数据包，单引号报错

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003rXNGz44bsvx.jpg)

再加一个正常

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002BarUQ0ybWXS.jpg)

本以为是一次平平无奇的 sql 注入，没想到绕了一天才绕过去，下面放几张测试失败的截图

首先就是 404，不知道规则是啥样的，下面语句应该是没问题的就会 404,1=1 让语句不通就会 500

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000H0iRX1RkzrQ.jpg)

试了下 orcale 的注入方法，又爆 403，这里'||55||'会返回空数据，'||1/0||'会爆 500，这里判断语句能想到的都试了，全 403，最奇怪的是只有语句正确才会 403，少写一个 D 就会 500，不知道这什么匹配逻辑，不过试了一些插入空白字符啥的也都不行

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001EyJVU4M7d9w.jpg)

这里我又跑了一遍字典，全 404、500、403，期间尝试结合分块传输、参数污染、垃圾数据、白名单、高并发均未绕过去

最终经过我的不断测试,插入下面 payload 回显特别慢，最终显示数据量太大，不过 in 这个关键字我理解的不是很透彻，有懂的师傅可以解答下

```sql
'OR+1+in+1+and+'a'+in+'a
```

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001dwmNm2rXlXN.jpg)

当 1 in 5 的时候整个结果为 false，返回为空

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004ZPgVY20eA1I.jpg)

直接注下 user 的长度

```sql
'OR+1+in+length(user)+and+'a'+in+'a
```

只有相等时会卡死，很明显为 7 位

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000048Po2b3Ql45D.jpg)

直接用 instr 函数注用户名

```sql
'OR+1+in+instr(user,'u')+and+'a'+in+'a
instr函数代表后面那个字符在前面字符串第一次出现的位置
例如:
instr('user','u')返回1
instr('user','us')返回1
instr('user','s')返回2
```

第一位为 S

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001CPCnX1aMs9v.jpg)

第二位为 H，其他同理

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004RCF7U0ZYhuT.jpg)

## 任意用户名密码重置

玩的某个游戏，手机号换了，申诉成功给我发了邮件，可以看到 id 和 token

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000022NIzr3Xknhj.jpg)

这里直接更换 id 访问，进行更改密码，显示错误

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000Nracm06DynJ.jpg)

简单测了测，id 随便改，token 为空

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001L2Gra0U5QK6.jpg)

直接修改密码成功

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004B32j60yX756.jpg)

这里因为不知道目标账号的 id，只能随机修改，因为手机号基本就跟 id 绑定，于是找到了申诉的功能点，这里输入手机号

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002ekgBI45PqUV.jpg)

可以看到返回了 id

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002chTo30nRcBj.jpg)

下一步就是要知道目标的手机号，经过我的不懈寻找，在游戏 app 的登录界面，有个忘记账号功能

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000014diLm1AT8Mj.jpg)

这里输入手机号或者游戏的 uid 就可以看到一些信息

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002GwmN40rErNQ.jpg)

这里游戏 uid 是公开的，资料就能看到，不过手机号只有前三位和后四位

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001BFWD22gVzfn.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000P4nBF3GimRu.jpg)

在官网找回密码处，这里输入手机号抓个包

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002nVUxc3lw5v1.jpg)

输入不对的手机号会提示错误，因为我们知道前三位还有后四位，爆破起来还是很快的

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001XG0k32y0x2i.jpg)

最后只得到几个真实存在的手机号，这时候就可以去游戏 app 登陆界面去对比，手机号正确的话，返回的 UID 是一样的，这里也可以抓包写个脚本去判断，因为真实存在手机号就几个，我就直接手动尝试的

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003U8hXT0WrH3b.jpg)

确定了目标手机号就知道了 id，就可以想修改谁的密码就可以修改谁的了

## 某站测试记录

目标站主域名有两个，a 和 b 代替 ，这里主要目标是 a，b 应该是以前用的，首先是爆破出来了两个 demo 站 demo.atest.com 和 demo.btest.com  
会提示 ip 无法访问，访问 demo.btest.com

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000009JGzK3pj5H2.jpg)

另外一个也一样

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003BR4LX0qPPPj.jpg)

这里直接插 xff 头绕过的

```
X-Forwarded-For: 127.0.0.1
X-Forwarded:127.0.0.1
Forwarded-For:127.0.0.1
Forwarded:127.0.0.1
X-Requested-With:127.0.0.1
X-Forwarded-Proto:127.0.0.1
X-Forwarded-Host:127.0.0.1
X-remote-lP:127.0.0.1
X-remote-addr:127.0.0.1
True-Client-lP: 127.0.0.1
X-Client-lP:127.0.0.1
Client-lP: 127.0.0.1
X-Real-IP:127.0.0.1
Ali-CDN-Real-IP:127.0.0.1
Cdn-Src-lp:127.0.0.1
Cdn-Real-lp:127.0.0.1
CF-Connecting-lP:127.0.0.1
X-Cluster-Client-lP:127.0.0.1
WL-Proxy-Client-lP:127.0.0.1
Proxy-Client-lP:127.0.0.1
Fastly-Client-lp: 127.0.0.1
True-Client-lp: 127.0.0.1
X-Originating-lP:127.0.0.1
X-Host: 127.0.0.1
X-Custom-lP-Authorization:127.0.0.1
```

这里是创建订单成功了，返回了一个地址，[https://cashier.xxxx.xxxx](https://cashier.xxxx.xxxx/)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003OKvKf04npVW.jpg)

访问之后

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001vSSks0T63Sb.jpg)

因为这是订单信息，所以我猜测前面子域名是后台的

构造[https://cashier.atest.com](https://cashier.atest.com/) 访问之后 401，添加 xff 头直接访问

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000pMc650B4Prl.jpg)

这里 a 网站应该也是一样的规则

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001ZfEfq0RU43V.jpg)

因为是测试后台，这里直接将 test 删除，访问[https://cashier.a.com](https://cashier.a.com/) 显示无法访问，修改 xff 头仍然失败

![](https://qqq.gtimg.cn/music/photo_new/T053XD00000315og20v7wv3.jpg)

只能从测试站入手了，首先是爆破出来了用户密码，但是却无法登录，不过返回了 token，这里前端看到了 webpack 的接口信息

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000Hrh3G1Q5V6Q.jpg)

在 JS 存在好多接口和接口配置包的构造并且还有 API 路径

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000pFIMZ070KsU.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004ZXWYi1vCfA4.jpg)

抓个登录接口的包看下格式拼接就好

有的接口有未授权，有的接口需要权限，但是爆破成功的数据包里面是有返回 token 的，于是带着这个 token 访问就可以了，但是均为测试站点的数据

![](https://qqq.gtimg.cn/music/photo_new/T053XD00000217WUA36HCUk.jpg)

于是猜测管理后台地址也是有这些接口的，直接更换请求的 host，成功获取到真实数据

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002h573Y0i3m9L.jpg)

