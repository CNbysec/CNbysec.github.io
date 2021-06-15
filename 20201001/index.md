# 使用好压打包成单个exe文件


<!--more-->

> 在线抠图：[https://www.remove.bg](https://www.remove.bg)

> png转ico：[https://www.easyicon.net/covert](https://www.easyicon.net/covert)

## 准备

* 准备个压缩软件，例如好压，WinRAR等等，根据文字举一反三即可
* 这是将要打包的主目录文件

![](/OSS/image/20201001/1.png)


![](/OSS/image/20201001/2.png)

exe在哪里就复制哪里的相对路径，以主文件目录为准，一定要相对路径，否则移动到别的地方会无法使用

```url
\Program\Thunder.exe
```

![](/OSS/image/20201001/3.png)

## 打包exe

1. 选择-压缩文件格式
2. 勾选-创建自解压格式
3. 点击-自解压选项
   ![](/OSS/image/20201001/4.png)
4. 选项卡选择-解压
5. 解压后运行-输入相对路径

```url
\Program\Thunder.exe
```

![](/OSS/image/20201001/5.png)

> 强调下，一定要相对路径否则移动到别处会无法使用

6. 选项卡选择-模式
7. 勾选-解包到临时文件夹
8. 选择-全部隐藏
   ![](/OSS/image/20201001/6.png)
9. 选项卡选择-更新
10. 解压并替换文件
11. 覆盖所有文件
    ![](/OSS/image/20201001/7.png)

12. 选项卡选择-图标
13. 浏览选择绝对路径的ico图标文件
    ![](/OSS/image/20201001/8.png)

## 完成

![](/OSS/image/20201001/9.png)

打包好后删除了主文件只保留exe文件后移动到别处也可以使用
![](/OSS/image/20201001/10.png)

