# 微信小程序抓包及测试


<!--more-->

> *转载自： [https://forum.butian.net/share/2477](https://forum.butian.net/share/2477)*

网上大多数的小程序测试抓包都是用的安卓模拟器，这里使用的是BurpSuite+Proxifer+微信客户端的抓包方式

## 环境准备

Burp2023.9.2

Proxifier4.5

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002OITQ70HT4No.jpg)

安装就无脑next就好了，安装好后打开

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003KJA0H2LW1qI.jpg)

点击注册，名字随便写，随便复制一个注册码点击ok即可

Proxifier配置

打开proxifier，点击profile添加一个代理服务器

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003PGfhu1LVKqh.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003uNexE0hwj8n.jpg)

地址127.0.0.1，端口自定义，我这里是8888，协议选择https

继续添加一条代理规则

在我们用微信打开小程序时，进程里会多出一个WeChatAppEx

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004QSWRx4HheJo.jpg)

这个程序就是微信小程序的进程

添加规则

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002g58Z03LKpFG.jpg)

Applications就选择小程序进程应用（这里可以手动输入），Action就选择刚刚新建的代理服务器

Burp配置

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003UWF4h2dYDDv.jpg)

只要编辑代理监听器和proxifier里的代理服务器一样即可，监听127.0.0.1:8888

这时微信打开一个小程序，可以看到WeChatAppEx的流量先经过proxifier，再用过127.0.0.1:8888到burp  
![](https://qqq.gtimg.cn/music/photo_new/T053XD000003nmstC4b3Fqh.jpg)

现在就可以像平时测试web站点一样的方式在burp里对数据包进行测试

## 小程序反编译

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001jlAmH0nQuyq.jpg)

在微信的设置里面可以找到微信文件保存的位置

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000001hRvp2kfvn7.jpg)

目录下的Applet就是小程序缓存文件的保存地址

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001j93ex3yQMqt.jpg)

平时使用的小程序越多，对应的文件也就越多，如果找不到自己想要测试的小程序包，可以根据修改日期来找，或者直接简单粗暴，删除所有的缓存文件，再重新打开你想要测试的小程序

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000gEgdk18rZwN.jpg)

这时里面的就是我们要测试小程序对应的缓存文件夹

点开里面就是我们要解的包

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000048MAA42u2QKo.jpg)

这是一个加密的包，当用户在微信中搜索或扫描小程序二维码后，微信后台会将该小程序的相关信息打包成 .wxapkg 文件并下发到用户的设备中，这种文件格式实际上是一个压缩包，其中包含了小程序的所有代码、资源和配置文件等内容，以及一个特定的描述文件 app.json。

由于是加密的包，所以先来解密，下面是大佬的解密工具链接

链接：[https://pan.baidu.com/s/1BzfvBVwD4vLpakX9PAyrsg?pwd=qz3z](https://pan.baidu.com/s/1BzfvBVwD4vLpakX9PAyrsg?pwd=qz3z)

提取码：qz3z

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003SN0Z20WhpbD.jpg)

选中加密的包

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001CablF0iP1hl.jpg)

解密成功后在工具目录的wxpack目录下

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000UnRQA3JWVJI.jpg)

接下来进行反编译

首先安装nodejs，下载链接[https://nodejs.org/zh-cn/download/](https://nodejs.org/zh-cn/download/) ，安装就一直下一步就好了，安装好之后添加环境变量

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002nXlxL2NYol5.jpg)

加好环境变量后cmd输入命令会得到回显

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000AEY2p1n9gVp.jpg)

接下来使用反编译工具wxappUnpacker

原链接[https://github.com/system-cpu/wxappUnpacker](https://github.com/system-cpu/wxappUnpacker)

网盘链接：[https://pan.baidu.com/s/19O2KDqWn2Zyars8AREJ1LQ?pwd=22qj](https://pan.baidu.com/s/19O2KDqWn2Zyars8AREJ1LQ?pwd=22qj)

提取码：22qj

来到工具目录

### 安装

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003bEWSK2Mm3Rc.jpg)

安装依赖

```bash
npm install esprima
npm install css-tree
npm install cssbeautify
npm install vm2
npm install uglify-es
npm install js-beautify
```

逐条执行以上命令

接下来反编译

### 执行命令

node wuWxapkg.js 解密后小程序的路径

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000mk3kg3QwlHC.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002NA69i3hjPIW.jpg)

执行完后会在被反编译的包的目录下生成一个目录

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001xwmpK0V6XE1.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000027eNAd2NeAHj.jpg)

里面就是反编译过后得到的文件了

下载微信开发者工具

官网下载链接

[https://servicewechat.com/wxa-dev-logic/download\_redirect?type=win32\_x64&from=mpwiki&download\_version=1062308310&version\_type=1](https://servicewechat.com/wxa-dev-logic/download_redirect?type=win32_x64&from=mpwiki&download_version=1062308310&version_type=1)

安装好后打开

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003uIfhB4eDvLO.jpg)

点击加号

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000MNaFE21INnt.jpg)

目录选择反编译后的目录，后端服务选择不使用云服务，点击确定

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000JadtD3uieOn.jpg)

就可以查看小程序的js代码了

### 测试

点击发送验证码的功能

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002O509l2lPsjr.jpg)

是/api/shop/ipad/login/sms路径

在代码里面找到发送功能的代码

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000016iH4E4TxqpE.jpg)

发现只有/login/sms

现在基本确认了路径访问规则，将接口拼接到/api/shop/ipad之后，找其他接口拼接尝试有没有未授权

找一个首页的路径拼接

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001pfjVn0eM7mf.jpg)

直接发包返回404

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000039rRsk0yqBmz.jpg)

拼接/api/shop/ipad之后发包

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002RUNBa42DEfM.jpg)

可以确定路径是对了，但是不存在未授权，这一个路径不存在，并不完全代表所有接口都不存在，也许有那么几个接口漏掉了没做鉴权，就会造成未授权，信息泄露之类的

## 一不小心getshell

继续看刚刚发送验证码的接口，看看有没有短信轰炸之类的

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000011nOjL1WwCg0.jpg)

访问/login/sms接口，并且以post方式接收mobile参数

### 构造包

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004cH2E44NNIMh.jpg)

输入一个不存在的手机号，显示手机号码有误

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000023srkI0z5x8p.jpg)

输入一个真实的也提示有误，有可能只有系统存在的账户手机号才有效

看到参数习惯性打个单引号

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004DQ3eH0waFZu.jpg)

哦豁，再加个单引号

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000bxvmK4eR2ph.jpg)

哦豁+1  
看返回数据包可以判断出用的.net，个人觉得这个框架是很多注入的，尝试手注没有回显，sqlmap一把梭，https加上--force-ssl参数

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004YZkdX1mxD0v.jpg)

成功跑出SQL注入，而且是堆叠注入，尝试--os-shell

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000018qq1L0wHEW5.jpg)

直接下班
