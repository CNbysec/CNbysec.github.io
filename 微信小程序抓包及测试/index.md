# 微信小程序抓包及测试


<!--more-->

> *转载自： [https://forum.butian.net/share/2477](https://forum.butian.net/share/2477)*

网上大多数的小程序测试抓包都是用的安卓模拟器，这里使用的是BurpSuite+Proxifer+微信客户端的抓包方式

## 环境准备

Burp2023.9.2

Proxifier4.5

![图片1.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-4d2e55e1fec1c1cb3586004390da5f833c29e420.png)

安装就无脑next就好了，安装好后打开

![图片2.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-db4b774ccbc93572be2fe92a70333ddeb69faac9.png)

点击注册，名字随便写，随便复制一个注册码点击ok即可

Proxifier配置

打开proxifier，点击profile添加一个代理服务器

![图片3.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-98f4fbf43de3b082dc119cf9ec059a5b01a4612a.png)

![图片4.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-9096bd780cc36e2e816cc981d5f002a505fb974b.png)

地址127.0.0.1，端口自定义，我这里是8888，协议选择https

继续添加一条代理规则

在我们用微信打开小程序时，进程里会多出一个WeChatAppEx

![图片5.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-86b0a870351c40d04703f4e7520f04230c157947.png)

这个程序就是微信小程序的进程

添加规则

![图片7.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-68540540ceae9c54bb676907813a6524979ed581.png)

Applications就选择小程序进程应用（这里可以手动输入），Action就选择刚刚新建的代理服务器

Burp配置

![图片8.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-e1dc66577ec9705ec6bb7a5c284258bdee6a2f43.png)

只要编辑代理监听器和proxifier里的代理服务器一样即可，监听127.0.0.1:8888

这时微信打开一个小程序，可以看到WeChatAppEx的流量先经过proxifier，再用过127.0.0.1:8888到burp  
![图片9.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-b73b6b2d230d072ed04dfd1be3c866666a3eceee.png)

现在就可以像平时测试web站点一样的方式在burp里对数据包进行测试

## 小程序反编译

![图片10.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-349dcd9bd61e5c42664c7166219db042149fe515.png)

在微信的设置里面可以找到微信文件保存的位置

![图片11.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-37df8dbd152531f07af00a221de694621c4ce8ba.png)

目录下的Applet就是小程序缓存文件的保存地址

![图片12.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-490a935d7b05aa27a031ab6ea1f4571777b4607b.png)

平时使用的小程序越多，对应的文件也就越多，如果找不到自己想要测试的小程序包，可以根据修改日期来找，或者直接简单粗暴，删除所有的缓存文件，再重新打开你想要测试的小程序

![图片13.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-6be612003e6141ec96a3500413b4e1ea0ad08b24.png)

这时里面的就是我们要测试小程序对应的缓存文件夹

点开里面就是我们要解的包

![图片14.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-1aeb1bf29f642b4320fdb659fa56b89491c4c462.png)

这是一个加密的包，当用户在微信中搜索或扫描小程序二维码后，微信后台会将该小程序的相关信息打包成 .wxapkg 文件并下发到用户的设备中，这种文件格式实际上是一个压缩包，其中包含了小程序的所有代码、资源和配置文件等内容，以及一个特定的描述文件 app.json。

由于是加密的包，所以先来解密，下面是大佬的解密工具链接

链接：[https://pan.baidu.com/s/1BzfvBVwD4vLpakX9PAyrsg?pwd=qz3z](https://pan.baidu.com/s/1BzfvBVwD4vLpakX9PAyrsg?pwd=qz3z)

提取码：qz3z

![图片15.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-a9387f90f0446617863593bbad6cc276084dd480.png)

选中加密的包

![图片16.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-9ee25050a82e038433727e3a1632aaf2f87f2089.png)

解密成功后在工具目录的wxpack目录下

![图片17.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-6412df6f50df64d3ac541b43a606c00751787478.png)

接下来进行反编译

首先安装nodejs，下载链接[https://nodejs.org/zh-cn/download/](https://nodejs.org/zh-cn/download/) ，安装就一直下一步就好了，安装好之后添加环境变量

![图片18.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-8a4b87da4d361b9e00b334e9d05f564e2acf4e85.png)

加好环境变量后cmd输入命令会得到回显

![图片19.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-860a62f19c4893ed97f14bbde7fc732c0ec79090.png)

接下来使用反编译工具wxappUnpacker

原链接[https://github.com/system-cpu/wxappUnpacker](https://github.com/system-cpu/wxappUnpacker)

网盘链接：[https://pan.baidu.com/s/19O2KDqWn2Zyars8AREJ1LQ?pwd=22qj](https://pan.baidu.com/s/19O2KDqWn2Zyars8AREJ1LQ?pwd=22qj)

提取码：22qj

来到工具目录

安装

![图片20.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-3a3c0d2a33dae60a85f525ec3127d4e0a96c7b89.png)

安装依赖

```js
npm install esprima npm install css-tree npm install cssbeautify npm install vm2 npm install uglify-es npm install js-beautify 逐条执行以上命令
```

逐条执行以上命令

接下来反编译

执行命令

node wuWxapkg.js 解密后小程序的路径

![图片21.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-b7d0ab204a2f80c771b94551c736a983bf8201e3.png)

![图片22.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-0af832ad5ba899b3f681e45b8602552faec4e9af.png)

执行完后会在被反编译的包的目录下生成一个目录

![图片23.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-2a4e9e054d1c8857a5c642aeb3a11fa01d9ca54c.png)

![图片24.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-e51b317a5d1370a4703995ac1340f586c3506e47.png)

里面就是反编译过后得到的文件了

下载微信开发者工具

官网下载链接

[https://servicewechat.com/wxa-dev-logic/download\_redirect?type=win32\_x64&from=mpwiki&download\_version=1062308310&version\_type=1](https://servicewechat.com/wxa-dev-logic/download_redirect?type=win32_x64&from=mpwiki&download_version=1062308310&version_type=1)

安装好后打开

![图片25.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-0f9ef773b1b308a080b7a8a37234980c32976343.png)

点击加号

![图片26.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-ac2407b8f4015beaae078ddbeacdad16c5a7cb15.png)

目录选择反编译后的目录，后端服务选择不使用云服务，点击确定

![图片29.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-bf1573b20e0d570fb18653eb664f6400e36c8f4c.png)

就可以查看小程序的js代码了

测试

点击发送验证码的功能

![图片30.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-d430d1c3caa7362d50e5365286310c2fb6568469.png)

是/api/shop/ipad/login/sms路径

在代码里面找到发送功能的代码

![图片31.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-b6f2b86056cb7d8f3d5473db86cdc295c09062e2.png)

发现只有/login/sms

现在基本确认了路径访问规则，将接口拼接到/api/shop/ipad之后，找其他接口拼接尝试有没有未授权

找一个首页的路径拼接

![图片32.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-f20f4a48c23e12105a4ea8ceedb1294ea5b6c802.png)

直接发包返回404

![图片33.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-ef9bd48622617be187e188c7051c8d5db8775f59.png)

拼接/api/shop/ipad之后发包

![图片34.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-7d1ea317abb2a47b3e7ffc83a7503d40b5ff3c65.png)

可以确定路径是对了，但是不存在未授权，这一个路径不存在，并不完全代表所有接口都不存在，也许有那么几个接口漏掉了没做鉴权，就会造成未授权，信息泄露之类的

## 一不小心getshell

继续看刚刚发送验证码的接口，看看有没有短信轰炸之类的

![图片35.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-296f854c1c47736c116f9fc30fc2a4a7c36a81e4.png)

访问/login/sms接口，并且以post方式接收mobile参数

构造包

![图片36.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-e183fd21bd663084e938e8deaee9ca4760809aa8.png)

输入一个不存在的手机号，显示手机号码有误

![图片37.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-44fc2bba3a85a267d6fcbf00dfaeec8f2fee9cc0.png)

输入一个真实的也提示有误，有可能只有系统存在的账户手机号才有效

看到参数习惯性打个单引号

![图片38.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-822b5eeeef60b8ee854b02f465b218512bd771ac.png)

哦豁，再加个单引号

![图片39.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-13df49f5eb179f9cecdf0f768092c79b2eeccb9c.png)

哦豁+1  
看返回数据包可以判断出用的.net，个人觉得这个框架是很多注入的，尝试手注没有回显，sqlmap一把梭，https加上--force-ssl参数

![图片40.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-fd575a3ab46f2f4d087c3afd33016ac5454dfdb0.png)

成功跑出SQL注入，而且是堆叠注入，尝试--os-shell

![图片41.png](https://www.bysec.cn/OSS/img/微信小程序抓包及测试/attach-b89b572d63ee1722e98b471b55605837b50085c4.png)

直接下班
