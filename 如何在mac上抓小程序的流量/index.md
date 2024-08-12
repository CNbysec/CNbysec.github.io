# 如何在mac上抓小程序的流量


<!--more-->

> *转载自： [https://xz.aliyun.com/t/8501](https://xz.aliyun.com/t/8501)*

## 如何在mac上抓小程序的流量

通过Proxifier工具代理微信小程序流量到Burp

### 安装Burpsuite证书到macOS系统中

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000031O3G92eYkbQ.png)

### 安装proxifier并添加Proxifier规则

> Your name or company name:  
> macwk.com  
> Your registration key:  
> 2DNRX-V3PNK-TEGYN-DR01D-9UGGT

```
brew install --cask proxifier
```

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002AYVbh2hAfxw.png)

### 添加代理和配置代理规则

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000031FC5M2J3OAy.png)

> 微信小程序路径 : /Applications/WeChat.app/Contents/MacOS/Mini Program.app

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001Dt1n33TI4dL.png)

> ⚠️ 先启动Proxifier，再启动Burpsuite，最后打开微信小程序,(最好关掉其他代理)

### 抓包成功

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003WPjtl4CwhR7.png)

### 存在其他代理(如clashX)时，Proxifier设置方法

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002gcN0O3WXpp3.png)

