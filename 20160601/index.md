# Python批量安装依赖


<!--more-->

## 新建 requirements.txt

```txt
beautifulsoup4==4.8.2
certifi==2019.11.28
cffi==1.14.0
chardet==3.0.4
fire==0.2.1
gevent==1.4.0
greenlet==0.4.15
idna==2.8
lxml==4.5.0
Pillow==7.1.1
pycparser==2.20
requests==2.22.0
six==1.14.0
soupsieve==2.0
termcolor==1.1.0
tqdm==4.34.0
urllib3==1.25.3
```

## 安装命令

```bash
pip3 install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/
```

## 其它pypi源

```txt
#阿里云
http://mirrors.aliyun.com/pypi/simple/

#中国科学技术大学
http://pypi.mirrors.ustc.edu.cn/simple/

#清华大学
https://pypi.tuna.tsinghua.edu.cn/simple/
```


