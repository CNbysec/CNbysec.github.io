# 如何在mac上抓小程序的流量


<!--more-->

> *转载自： [https://xz.aliyun.com/t/8501](https://xz.aliyun.com/t/8501)*

## 如何在mac上抓小程序的流量

通过Proxifier工具代理微信小程序流量到Burp

### 安装Burpsuite证书到macOS系统中

![](https://www.bysec.cn/OSS/img/如何在mac上抓小程序的流量/1.png)

### 安装proxifier并添加Proxifier规则

> Your name or company name:  
> macwk.com  
> Your registration key:  
> 2DNRX-V3PNK-TEGYN-DR01D-9UGGT

```
brew install --cask proxifier
```

![](https://www.bysec.cn/OSS/img/如何在mac上抓小程序的流量/2.png)

### 添加代理和配置代理规则

![](https://www.bysec.cn/OSS/img/如何在mac上抓小程序的流量/3.png)

> 微信小程序路径 : /Applications/WeChat.app/Contents/MacOS/Mini Program.app

![](https://www.bysec.cn/OSS/img/如何在mac上抓小程序的流量/4.png)

> ⚠️ 先启动Proxifier，再启动Burpsuite，最后打开微信小程序,(最好关掉其他代理)

### 抓包成功

![](https://www.bysec.cn/OSS/img/如何在mac上抓小程序的流量/5.png)

### 存在其他代理(如clashX)时，Proxifier设置方法

![](https://www.bysec.cn/OSS/img/如何在mac上抓小程序的流量/6.png)

