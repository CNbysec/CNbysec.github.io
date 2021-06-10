# NPS内网穿透配置


<!--more-->

# NPS内网穿透配置NPS

## github项目地址

```url
https://github.com/cnlh/nps
```

## 原理

![](/OSS/image/20201101/1.png)

## 服务器端配置

+ 准备工作
  + 一台拥有公网IP的VPS
  + 安装nps软件包

```shell
wget https://github.com/cnlh/nps/releases/download/v0.23.1/linux_amd64_server.tar.gz
tar -zxvf linux_amd64_server.tar.gz
cd nps/
./nps start
```

+ 配置server端
  在安装完成，启动nps后，便可访问server_IP:8080来访问nps配置dashboard了
  要求登陆，默认的用户名：admin，密码：123
  ![](/OSS/image/20201101/2.png)

网页dashboard的用户名和密码可在nps/conf/nps.conf配置文件中的web模块中修改
![](/OSS/image/20201101/3.png)

登陆进入dashboard后,看到界面，默认客户端为0（这里我已经创建了一个）
默认的客户端链接端口为8024（该端口为客户端用于链接服务器的端口，来保持链接，原理与反向代理相似）
![](/OSS/image/20201101/4.png)

+ 新建客户端
  这里我们创建一个新的客户端，
  这里的客户端只是在server配置的客户端，之后使用客户端软件链接，所以要与客户端配置一致
  ![](/OSS/image/20201101/5.png)

创建好的客户端是这样的，status为offline，因为客户端还没链接
这里server会自动随机生成一个vkey=7oswclqe5knqu15x（之后配置客户端会使用）
![](/OSS/image/20201101/6.png)

---

## 客户端配置

**Windows**

+ 下载客户端
  [https://github.com/cnlh/nps/releases/download/v0.23.1/win_amd64_client.tar.gz](https://github.com/cnlh/nps/releases/download/v0.23.1/win_amd64_client.tar.gz)
  这里使用windows作为客户端
  下载解压后配置vps.conf，
  将其他配置删除，只保留如图所示的配置
+ 修改
  server_addr为VPS的公网ip和dashboard的默认客户端链接端口
  vkey为server网页上新建的客户端生成的vkey

```TXT
server_addr=server_IP:8024
conn_type=tcp
vkey=7oswclqe5knqu15x
auto_reconnection=true
max_conn=1000
flow_limit=1000
rate_limit=1000
basic_username=11
basic_password=3
web_username=user
web_password=123
crypt=true
compress=true
```

![](/OSS/image/20201101/7.png)

修改完配置文件后运行nsp.exe，显示成功链接
![](/OSS/image/20201101/8.png)

## CentOS

```shell
wget https://github.com/cnlh/nps/releases/download/v0.23.1/linux_amd64_client.tar.gz
tar -zxvf linux_amd64_client.tar.gz
cd npc/
./npc -server=66.42.81.9:8024 -vkey=7oswclqe5knqu15x -type=tcp
```

链接成功
**两者链接成功后server端中客户端status转为online**
![](/OSS/image/20201101/9.png)

## 使用测试

创建tcp tunnel
这里使用内网router配置网页做测试
![](/OSS/image/20201101/10.png)

点击tunnel创建tcp隧道
![](/OSS/image/20201101/11.png)

点击新增
这里我的router内网ip为192.168.1.1
![](/OSS/image/20201101/12.png)

创建完成
![](/OSS/image/20201101/13.png)

访问测试
访问server_ip:10001
成功访问到内网router配置网页
![](/OSS/image/20201101/14.png)

> 中文文档： https://github.com/ehang-io/nps/blob/master/README_zh.md


