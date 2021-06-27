# Win10使用Windows照片查看打开图片


<!--more-->

> 请在【此电脑】最上方【查看】中勾选【文件扩展名】

## 使用reg文件添加

> 复制下面的代码把后缀改成 <code>.reg</code>

```reg
Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows Photo Viewer\Capabilities\FileAssociations]
".ico"="PhotoViewer.FileAssoc.Tiff"
".png"="PhotoViewer.FileAssoc.Tiff"
".gif"="PhotoViewer.FileAssoc.Tiff"
".jpg"="PhotoViewer.FileAssoc.Tiff"
".jpeg"="PhotoViewer.FileAssoc.Tiff"
".bmp"="PhotoViewer.FileAssoc.Tiff"
".ico"="PhotoViewer.FileAssoc.Tiff"
".svg"="PhotoViewer.FileAssoc.Tiff"
".webp"="PhotoViewer.FileAssoc.Tiff"
".tif"="PhotoViewer.FileAssoc.Tiff"
".tiff"="PhotoViewer.FileAssoc.Tiff"
```

## 使用bat添加

**这个方法需要管理员权限运行，比较推荐使用第一个方法**

> 复制下面的代码把后缀改成 <code>.bat</code>

```bat
@echo off&cd\&color 0a&cls
echo 如果显示【错误 拒绝访问】请右键选择【以管理员身份运行】
echo ------------------------------------------------------------
reg add "HKLM\SOFTWARE\Microsoft\Windows Photo Viewer\Capabilities\FileAssociations" /v ".ico" /t REG_SZ /d PhotoViewer.FileAssoc.Tiff /f
reg add "HKLM\SOFTWARE\Microsoft\Windows Photo Viewer\Capabilities\FileAssociations" /v ".png" /t REG_SZ /d PhotoViewer.FileAssoc.Tiff /f
reg add "HKLM\SOFTWARE\Microsoft\Windows Photo Viewer\Capabilities\FileAssociations" /v ".gif" /t REG_SZ /d PhotoViewer.FileAssoc.Tiff /f
reg add "HKLM\SOFTWARE\Microsoft\Windows Photo Viewer\Capabilities\FileAssociations" /v ".jpg" /t REG_SZ /d PhotoViewer.FileAssoc.Tiff /f
reg add "HKLM\SOFTWARE\Microsoft\Windows Photo Viewer\Capabilities\FileAssociations" /v ".jpeg" /t REG_SZ /d PhotoViewer.FileAssoc.Tiff /f
reg add "HKLM\SOFTWARE\Microsoft\Windows Photo Viewer\Capabilities\FileAssociations" /v ".bmp" /t REG_SZ /d PhotoViewer.FileAssoc.Tiff /f
reg add "HKLM\SOFTWARE\Microsoft\Windows Photo Viewer\Capabilities\FileAssociations" /v ".ico" /t REG_SZ /d PhotoViewer.FileAssoc.Tiff /f
reg add "HKLM\SOFTWARE\Microsoft\Windows Photo Viewer\Capabilities\FileAssociations" /v ".svg" /t REG_SZ /d PhotoViewer.FileAssoc.Tiff /f
reg add "HKLM\SOFTWARE\Microsoft\Windows Photo Viewer\Capabilities\FileAssociations" /v ".webp" /t REG_SZ /d PhotoViewer.FileAssoc.Tiff /f
reg add "HKLM\SOFTWARE\Microsoft\Windows Photo Viewer\Capabilities\FileAssociations" /v ".tif" /t REG_SZ /d PhotoViewer.FileAssoc.Tiff /f
reg add "HKLM\SOFTWARE\Microsoft\Windows Photo Viewer\Capabilities\FileAssociations" /v ".tiff" /t REG_SZ /d PhotoViewer.FileAssoc.Tiff /f
echo ------------------------------------------------------------
echo 右键选择【打开方式】然后选择【照片查看器】即可
echo;
pause
```


