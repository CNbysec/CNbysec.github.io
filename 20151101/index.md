# Win10创建快捷方式时去掉快捷方式后缀


<!--more-->

> 请在【此电脑】最上方【查看】中勾选【文件扩展名】

## 使用reg文件添加

> 复制下面的代码把后缀改成 <code>.reg</code>

```reg
Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer]
"link"=hex:00,00,00,00
```


