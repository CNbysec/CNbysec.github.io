# 安装BurpSuite


<!--more-->

## 下载
*   [BurpSuite](https://portswigger.net/burp/releases#professional)
*   [注册启动汉化](https://github.com/Leon406/BurpSuiteCN-Release/releases)

## 安装
1. 安装完成后先启动一次burp，然后关闭，否则会报错损坏
2. 在应用程序中找到BurpSuite右键显示包内容
3. 依次打开文件夹 > Contents/Resources/app，把启动器放入其中。
4. 返回到Contents目录，编辑vmoptions.txt，末尾追加内容

```txt
--add-opens=java.base/java.lang=ALL-UNNAMED
--add-opens=java.base/jdk.internal.org.objectweb.asm=ALL-UNNAMED
--add-opens=java.base/jdk.internal.org.objectweb.asm.tree=ALL-UNNAMED
--add-opens=java.base/jdk.internal.org.objectweb.asm.Opcodes=ALL-UNNAMED
-javaagent:burpsuitloader-all.jar
-noverify
```

