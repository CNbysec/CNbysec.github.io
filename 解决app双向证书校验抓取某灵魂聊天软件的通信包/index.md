# 解决APP双向证书校验，抓取某灵魂聊天软件的通信包


<!--more-->

> _转载自： [https://www.52pojie.cn/thread-1408337-1-1.html](https://www.52pojie.cn/thread-1408337-1-1.html)_

# 解决 APP 双向证书校验，抓取某灵魂聊天软件的通信包

部分 android APK 为了通信的安全，采用了服务器和客户端双向证书校验，会导致我们无法正常抓包。

双向认证，顾名思义，客户端和服务器端都需要验证对方的身份，在建立 Https 连接的过程中，握手的流程比单向认证多了几步。单向认证的过程，客户端从服务器端下载服务器端公钥证书进行验证，然后建立安全通信通道。双向通信流程，客户端除了需要从服务器端下载服务器的公钥证书进行验证外，还需要把客户端的公钥证书上传到服务器端给服务器端进行验证，等双方都认证通过了，才开始建立安全通信通道进行数据传输。而常规的 https 只是客户端校验服务端的证书验证服务器的身份。

因此双向证书认证在一定程度上能增大中间人攻击的难度和我们抓包分析的难度。  
例如最近大火的某灵魂软件，soul，直接 burp 或者 fidder 等是抓不到包的，因为用了 3 层保护，第一层是服务器 https 证书强验证，二是 ssl pining，三是服务器验证客户端身份（双向认证）。

安装了 JustTrustMe 等插件，我们使用 burpsuite、charles 等抓包工具也只能抓到上行包。但由于我们使用了抓包工具，通信包相当于是被抓包工具拦截，然后转发至服务器，此时服务器检测到通信包没有带上正常的客户端证书，也就是无法认证客户端身份，会响应异常。  
解决了服务器证书校验和 ssl pining 后，可以抓到上行包，但观察响应时，会发现服务器返回了 400 异常信息：
![](https://wx.y.gtimg.cn/music/photo_new/T053XD000039gEFv0AXpO4.jpg)

这个信息告诉我们，我们用了抓包工具以后发出去的包没有带上客户端证书，所以服务器端拒绝处理。想要正常抓包，就必须导入客户端证书，同时需要输入证书密码。  
这就说明 app 使用了双向证书校验，也就是说 app 客户端一定是夹带了一张证书的。最常用的就是 p12 证书了。所以我们可以直接用 apktool 等工具反编译 apk 或者直接解压缩。证书这类文件通常放在 assets 目录下面，我们在里面找 p12 后缀名的文件即可：  
![](https://wx.y.gtimg.cn/music/photo_new/T053XD00002qH3Wn0cfv79.jpg)

把这个文件复制出来保存到任意位置，第一步就完成了。但光有证书，不知道证书密码也没用。  
所以第二部：找证书密码。  
直接 dex2jar 或者 jadx 等工具逆向出 java 代码，搜索关键词“client.p12”，或者搜索 java.security.KeyStore.open()方法，基本能直接找到使用证书的地方。此处我们搜索“client.p12”:  
![](https://wx.y.gtimg.cn/music/photo_new/T053XD00000GUoQY4BkUhl.jpg)

如果是 jadx 可以右键查找使用的地方，跟进去：  
![](https://wx.y.gtimg.cn/music/photo_new/T053XD00003QsjoJ1ptP25.jpg)

上下文中就能找到加载证书的地方，找到 load 方法，这个 load 方法第一个参数是证书文件流，第二个参数即为证书的密码，所以我们只要知道这第二个参数传进来的值是什么就可以了。从代码可以看到第二个参数 c2 来源是 SoulNetworkSDK.c 方法，c 方法返回值即为我们需要的证书密码，这时候办法就多了，代码能力强的直接阅读逻辑能看出来，像我等比较懒的就喜欢在这儿下断点动态调试直接看参数和返回值。  
不过我最喜欢的方法是直接 hook，可以自己写 xposed 模块，也可以用我之前写的另一个基于 xposed 的 hook 工具：easyHook，直接填入包名类名方法名和对应参数类型，即可显示出参数和返回值，详情和下载地址见我的另一篇帖子:[https://www.52pojie.cn/thread-1408286-1-1.html](https://www.52pojie.cn/thread-1408286-1-1.html)  
![](https://wx.y.gtimg.cn/music/photo_new/T053XD00003NnPyY1kEPl5.jpg)

填写好这个灵魂软件的包名、以及对应的类名方法名和参数类型，点击保存，打开悬浮窗，运行灵魂软件，效果如下：  
![](https://wx.y.gtimg.cn/music/photo_new/T053XD00003eJ8ZE0wZnzZ.jpg)

可以看到，证书密码已经轻松获取到了，长按可以直接复制到剪切板。这时候把先前保存的证书文件导入 charles。  
点击 charles>proxy>ssl proxy settings>client certificates,创建一个，密码随便输入，自己记住。点击 add，然后添加我们需要抓包的网站地址和端口（https 端口默认为 443），点击右下角的 import p12,导入我们之前找到的 client.p12 文件，输入我们刚刚 hook 到的证书密码，即可开始正常抓包。  
![](https://wx.y.gtimg.cn/music/photo_new/T053XD00003ij5Yz30MKfA.jpg)  

再次运行灵魂软件，即可开始正常抓包： 
![](https://wx.y.gtimg.cn/music/photo_new/T053XD000015thfH4KSINp.jpg)

