# kali 修改为国内源


<!--more-->

## 打开配置文件
```bash
vim /etc/apt/sources.list
```

## kali源
```bash
#中科大
deb http://mirrors.ustc.edu.cn/kali kali-rolling main non-free contrib
deb-src http://mirrors.ustc.edu.cn/kali kali-rolling main non-free contrib
 
#阿里云
deb http://mirrors.aliyun.com/kali kali-rolling main non-free contrib
deb-src http://mirrors.aliyun.com/kali kali-rolling main non-free contrib
 
#清华大学
deb http://mirrors.tuna.tsinghua.edu.cn/kali kali-rolling main contrib non-free
deb-src https://mirrors.tuna.tsinghua.edu.cn/kali kali-rolling main contrib non-free
 
#浙大
deb http://mirrors.zju.edu.cn/kali kali-rolling main contrib non-free
deb-src http://mirrors.zju.edu.cn/kali kali-rolling main contrib non-free
 
#东软大学
deb http://mirrors.neusoft.edu.cn/kali kali-rolling/main non-free contrib
deb-src http://mirrors.neusoft.edu.cn/kali kali-rolling/main non-free contrib
 
#官方源
deb http://http.kali.org/kali kali-rolling main non-free contrib
deb-src http://http.kali.org/kali kali-rolling main non-free contrib
```

## debian源
```bash
# 中科大源
deb http://mirrors.ustc.edu.cn/debian buster main contrib non-free
deb http://mirrors.ustc.edu.cn/debian buster-updates main contrib non-free
deb http://mirrors.ustc.edu.cn/debian buster-backports main contrib non-free
deb http://mirrors.ustc.edu.cn/debian-security/ buster/updates main contrib non-free

#deb-src http://mirrors.ustc.edu.cn/debian buster main contrib non-free
#deb-src http://mirrors.ustc.edu.cn/debian buster-updates main contrib non-free
#deb-src http://mirrors.ustc.edu.cn/debian buster-backports main contrib non-free
#deb-src http://mirrors.ustc.edu.cn/debian-security/ buster/updates main contrib non-free

# 阿里云
deb http://mirrors.aliyun.com/debian/ buster main non-free contrib
deb http://mirrors.aliyun.com/debian/ buster-updates main non-free contrib
deb http://mirrors.aliyun.com/debian/ buster-backports main non-free contrib
deb http://mirrors.aliyun.com/debian-security buster/updates main

#deb-src http://mirrors.aliyun.com/debian/ buster main non-free contrib
#deb-src http://mirrors.aliyun.com/debian/ buster-updates main non-free contrib
#deb-src http://mirrors.aliyun.com/debian/ buster-backports main non-free contrib
#deb-src http://mirrors.aliyun.com/debian-security buster/updates main

# 网易源
deb http://mirrors.163.com/debian/ buster main non-free contrib
deb http://mirrors.163.com/debian/ buster-updates main non-free contrib
deb http://mirrors.163.com/debian/ buster-backports main non-free contrib
deb http://mirrors.163.com/debian-security/ buster/updates main non-free contrib

#deb-src http://mirrors.163.com/debian/ buster main non-free contrib
#deb-src http://mirrors.163.com/debian/ buster-updates main non-free contrib
#deb-src http://mirrors.163.com/debian/ buster-backports main non-free contrib
#deb-src http://mirrors.163.com/debian-security/ buster/updates main non-free contrib

# 官方源
deb http://deb.debian.org/debian buster main contrib non-free
deb http://deb.debian.org/debian buster-updates main contrib non-free
deb http://deb.debian.org/debian-security/ buster/updates main contrib non-free

#deb-src http://deb.debian.org/debian buster main contrib non-free
#deb-src http://deb.debian.org/debian buster-updates main contrib non-free
#deb-src http://deb.debian.org/debian-security/ buster/updates main contrib non-free
```

## 更新软件列表并更新软件
```bash
sudo apt update && sudo apt upgrade -y
```
