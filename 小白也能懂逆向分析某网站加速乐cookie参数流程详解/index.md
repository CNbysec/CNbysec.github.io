# 小白也能懂逆向分析某网站加速乐Cookie参数流程详解


<!--more-->

> *转载自： [https://juejin.cn/post/7386485874300977178](https://juejin.cn/post/7386485874300977178)*

## 前言

加速乐作为一种常见的反爬虫技术，在网络上已有大量详尽深入的教程可供参考。然而，对于那些初次接触的人来说，直接面对它可能仍会感到困惑。

## 声明

> 本文仅用于学习交流，学习探讨逆向知识，欢迎私信共享学习心得。如有侵权，联系博主删除。请勿商用，否则后果自负。

## 什么是加速乐？

![](https://qqq.gtimg.cn/music/photo_new/T053XD000010CdJ93CHwXA.jpg)

加速乐采用了一系列的高级反爬虫技术，包括OB混淆、动态加密算法和多层Cookie获取，以确保整体校验的严密性。关键校验字段位于Cookie中的`__jsl_clearance_s`。其**验证过程通常涉及三次关键的请求**：

1.  **首次请求**：当用户首次尝试访问目标网站时，服务器会返回一个特殊的521状态码，其响应数据通过AAEncode技术进行混淆处理，以初步筛选访问者。
    
2.  **二次请求**：紧接着的第二次请求中，如果服务器继续检测到可疑行为，它会再次返回521状态码，但这次响应数据将采用更为复杂的OB混淆，进一步验证访问者的身份。
    
3.  **三次请求**：只有在前两次请求成功通过验证后，第三次请求才能成功访问网站，此时服务器将返回正常的状态码200，并提供用户所需的内容。
    

![](https://qqq.gtimg.cn/music/photo_new/T053XD00001spKf70Onvsc.jpg)

通过这一连串精心设计的步骤，加速乐确保了只有合法的访问者能够顺利获取网站数据，从而有效抵御恶意爬虫的侵扰，我们要做的就是模拟这些操作，获取想要的数据。

## 今日网站

目标URL: `aHR0cHM6Ly93d3cuY252ZC5vcmcuY24vZmxhdy90eXBlbGlzdD90eXBlSWQ9Mjc=`

## 流程分析-浏览器

按照常规做法，我们首先进行网络抓包分析。

![](https://qqq.gtimg.cn/music/photo_new/T053XD00004JfmID1VsZLD.jpg)

### 第一次请求

-   `发送`：未携带 Cookie
-   `响应`：状态码`521`，Cookie 中的`__jsluid_s`值和`js`代码

![](https://qqq.gtimg.cn/music/photo_new/T053XD00000K7qZU3ItDc3.jpg)

### 第二次请求

-   `发送`：Cookie 携带`__jsluid_s`和`__jsl_clearance_s`值
-   `响应`：状态码`521`，新的`js`代码

![](https://qqq.gtimg.cn/music/photo_new/T053XD00002oaIvJ2FWXrj.jpg)

### 第三次请求

-   `发送`：Cookie 携带原始`__jsluid_s`值，新的`__jsl_clearance_s`值
-   `响应`：状态码`200`，正文内容

![](https://qqq.gtimg.cn/music/photo_new/T053XD00003CsbsE3mrA5a.jpg)

> 观察结果揭示了对同一页面共发起了三次`HTTP`请求：前两次请求均遭遇了`521`状态码的响应，而最后一次请求成功收到了`200`状态码。这种模式正是加速乐反爬虫机制的显著特征。

## 流程分析-抓包工具

浏览器上我们没能看到具体的响应，我们借助抓包工具试试，这里使用的`Fiddler`。

### 第一次请求

![](https://qqq.gtimg.cn/music/photo_new/T053XD00000bzZ1h0xViso.jpg)

### 第二次请求

![](https://qqq.gtimg.cn/music/photo_new/T053XD00001MlfbN033sPr.jpg)

### 第三次请求

![](https://qqq.gtimg.cn/music/photo_new/T053XD00000fEc7o2dk3Gg.jpg)

> 同样，看到了三次请求的过程，并且向我们展示了具体的响应。

## 逆向分析

### 获取第一个`__jsl_clearance_s`

通过`Fiddler`或使用`python`模拟请求，得到下面这样一段JS代码：

```javascript
document.cookie=('_')+('_')+('j')+('s')+('l')+('_')+('c')+('l')+('e')+('a')+('r')+('a')+('n')+('c')+('e')+('_')+('s')+('=')+(+!+[]+'')+(3+4+'')+(-~false+'')+(2+7+'')+(4+'')+(1+6+'')+(2+'')+((2<<1)+'')+((2)*[2]+'')+(([2]+0>>2)+'')+('.')+(-~1+'')+((2^1)+'')+((1+[2])/[2]+'')+('|')+('-')+((+true)+'')+('|')+('L')+('w')+('j')+(1+2+'')+('u')+('T')+('F')+('n')+(-~{}+'')+('j')+('j')+(~~''+'')+('E')+('t')+(~~false+'')+('g')+('I')+(-~1+'')+('J')+('g')+('i')+('K')+('m')+((1+[2])/[2]+'')+('N')+('f')+((1<<2)+'')+('%')+((1+[2]>>2)+'')+('D')+(';')+(' ')+('M')+('a')+('x')+('-')+('a')+('g')+('e')+('=')+(-~[2]+'')+(-~[5]+'')+((+false)+'')+(~~{}+'')+(';')+(' ')+('P')+('a')+('t')+('h')+('=')+('/')+(';')+(' ')+('S')+('a')+('m')+('e')+('S')+('i')+('t')+('e')+('=')+('N')+('o')+('n')+('e')+(';')+(' ')+('S')+('e')+('c')+('u')+('r')+('e');location.href=location.pathname+location.search
```

复制到浏览器执行下来看看:

![](https://qqq.gtimg.cn/music/photo_new/T053XD000025j1lt05AHCW.jpg)

得到了`__jsl_clearance_s=1719472445.236|-1|Lwj3uTFn1jj0Et0gI2JgiKm6Nf4%3D; Max-age=3600; Path=/; SameSite=None; Secure`。

而`__jsl_clearance_s`正是第二次请求需要带上的Cookie之一。

![](https://qqq.gtimg.cn/music/photo_new/T053XD00001H0vDS2nqE80.jpg)

> 真的老登。为了使代码难以阅读和分析，还进行了`AAEncode`加密混淆。

### 获取第二个`__jsl_clearance_s`

使用第一个请求后得到的 Cookies 继续发起第二段请求得到新的 JS 代码：

![](https://qqq.gtimg.cn/music/photo_new/T053XD00000Y8Qgg2tnsDM.jpg)

代码被压缩了，不是很好看，使用在线 JS 美化（`https://spidertools.cn/#/formatJS`）后：


> 其中有明显的特征，我们能判断出这是一个`OB混淆`加密：
> 
> 1.  一般由一个大数组或者含有大数组的函数、一个自执行函数、解密函数和加密后的函数四部分组成；
> 2.  函数名和变量名通常以`_0x`或者`0x`开头，后接`1~6`位数字或字母组合；
> 3.  自执行函数，进行移位操作，有明显的`push、shift`关键字；

使用（`decode_obfuscator`）反混淆工具还原代码后，整体的结构就清晰了很多。

`setTimeout`函数是异步执行的，它不会立即返回值，做一下处理，并让`go`函数返回`cookies`。

> `OB反混淆工具`有很多（你们常用哪些，欢迎评论区告诉我，让我`涨涨脑子`）:
> 
> -   `https://tool.yuanrenxue.cn/decode_obfuscator`
> -   `https://de4js.kshift.me/`、`https://www.dejs.vip/2obfuscator`
> -   浏览器插件`v_tools`等

然后，我们迫不及待的运行：

`node.exe .\final.js`

回应我们的就是`ReferenceError: window is not defined`等报错，依次补上：

```javascript
window = {} window.navigator={ 'userAgent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36' } document = global location = {}
```

再次运行得到：

```shell
(haige-py3.10) > node.exe .\final.js
1719472445.601|0|j3AZtLtZQTMBXOgbV%2FXe2COV%2BT0%3D
__jsl_clearance_s=1719472445.601|0|j3AZtLtZQTMBXOgbV%2FXe2COV%2BT0%3D;Max-age=3600; path = /; SameSite=None; Secure
```

> 拿去和抓包得到的cookie进行比较，结果一致。

![](https://qqq.gtimg.cn/music/photo_new/T053XD00001qPkWG1rHzdx.jpg)

在`Pycharm`调试时，我们注意到：

![](https://qqq.gtimg.cn/music/photo_new/T053XD00002JyrsN0yGVqr.jpg)

我们注意到：条件成立时`_0x1f3544`为`1719472445.601|0|j3AZtLtZQTMBXOgbV%2FXe2COV%2BT0%3D`，正好是`__jsl_clearance_s`的值。
___

尝试着全局搜索参数里的`sha1`：

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000307eR136NyIX.jpg)

发现只有参数里带了，所以不难推断：

![](https://qqq.gtimg.cn/music/photo_new/T053XD000014YDFA1a7xeM.jpg)

再找个在线网址验证下`sha1`也即这里的`hash`方法是否为魔改过的：

![](https://qqq.gtimg.cn/music/photo_new/T053XD000023kcxa2GGrHg.jpg)

至此，我们其实已经概率性拿到一些数据了（？？）。


**然鹅~~并不是每次都能得到我们要的数据！**

![](https://qqq.gtimg.cn/music/photo_new/T053XD00003NWZZM2MT00J.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD00000oz7tL0vfUO2.jpg)

> 通过尝试（抓包），发现加密函数共有`sha256`、`sha1`、`md5`三种情况。

因此，我们完全可以按照之前的步骤分别得到`sha256`、`sha1`、`md5`三种情况下的`js`代码，并根据第二次请求时返回的`js`中的`ha`调用对应的`js`得到最终的`__jsl_clearance_s`。

> 又因`sha256`、`sha1`、`md5`的实现并未被魔改，因此完全可以使用`Javascript`（`npm install crypto-js`）或`python`进行简化改写。

![](https://qqq.gtimg.cn/music/photo_new/T053XD00000JW4ge1uBApB.jpg)

## 其它调试方式

其它调试方式还有很多，比较推荐的有：

### `Hook Cookie`值：使用油猴断一下set cookie位置

___

```javascript
(function () { 'use strict'; var org = document.cookie.__lookupSetter__('cookie'); document.__defineSetter__('cookie', function (cookie) { if (cookie.indexOf('__jsl_clearance_s') != -1) { debugger; } org = cookie; }); document.__defineGetter__('cookie', function () { return org; }); })();
```

![](https://qqq.gtimg.cn/music/photo_new/T053XD00002H04We1otCEl.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD00003mTMq71j363h.jpg)

清除 cookie 重新刷新页面，页面被成功断住：

![](https://qqq.gtimg.cn/music/photo_new/T053XD00002NoBjd1DTy9w.jpg)

然后就可以尝试调试了，这里不做过多介绍。

![](https://qqq.gtimg.cn/music/photo_new/T053XD00003ngElC1lUMqt.jpg)

___

### 文件替换：利用 Fiddler 的`自动响应`。

将第二次请求获取的`js`代码保存下来，可以手动复制，也可以向下面这样：

![](https://qqq.gtimg.cn/music/photo_new/T053XD00001M1d5h2Orjxl.jpg)

对响应内容进行`js`美化（`https://spidertools.cn/#/formatJS`）

![](https://qqq.gtimg.cn/music/photo_new/T053XD00003XxAnC3DLpkP.jpg)

清除cookie刷新，也能进行调试了：

![](https://qqq.gtimg.cn/music/photo_new/T053XD00001toKXM3KoqTY.jpg)

___

### 文件替换：利用 Chrome 的文件替换

同上，将`js`代码美化后保存在本地，可能需要一些微调，例如：首尾`Script`标签前后会多出空格以及脚本最后可能多出`/`等。补上`debuuger;`即可进行替换调试：

![](https://qqq.gtimg.cn/music/photo_new/T053XD000043rZnD4ScgIS.jpg)

然后将文件内容替换为上面美化处理后的`js`代码，清除 cookies 并刷新页面即可调试。

![](https://qqq.gtimg.cn/music/photo_new/T053XD00003nF4tq1MvPjz.jpg)

## 结果验证

根据上面的分析，我们拿到了每次请求所需要的`cookie`，发起请求就是很简单的事了。

## 小结

遵循文章的指导逆向操作整个解密流程，您会发现这一过程相对简单。关键在于熟练掌握三次请求的顺序及其各自的特征，一旦熟悉这些要点，整个过程将无甚难度。

## 最后

如果你觉得文章还不错，请大家`点赞、关注、分享、在看`下，因为这将是我持续输出更多优质文章的最强动力！

欢迎随时与我联系，我期待与大家交流心得，共同学习，共同进步。
