# Hugo添加gitalk评论


<!--more-->

## 注册 GitHub Application

**首先要注册一下 GitHub Application**

[https://github.com/settings/applications/new](https://github.com/settings/applications/new)


```text
Application name 随便填
Homepage URL https://[name].github.io/
Authorization callback URL 有自己域名就写自己域名没就写 https://[name].github.io/
```
**写完后最下面 Update application 按钮点击提交**

![](/OSS/image/20200801/1.png)


## 获取 Client ID 和 Client secrets

**提交后当前页面找到 Generate a new client secret 点击生成 Client secrets**

**复制 Client ID 和 Client secrets 保存好**

![](/OSS/image/20200801/2.png)


## 填写配置信息

**我的的Hugo-LoveIt主题，别的主题也差不多看主要关键字填写信息就好**

```toml
[params.page.comment.gitalk]
enable = true # 开启
owner = "" # owner指的是你的GitHub名字
repo = "" # repo写你的项目名
clientId = "" # 上面复制的 clientId
clientSecret = "" # 上面复制的 clientSecret
```

## 填坑

1. 一开始是默认没有任何issues的，配置正确无报错的情况下，你要登录自己GitHub账号在那个页面刷新下才会生成新的issues，每个页面都需要这样，否则别人是评论不了的。

2. issues一般是默认开启，如果没反应可以去检查下是否开启。项目文件-Settings-Options-Features下的 Issues 勾选即可。
