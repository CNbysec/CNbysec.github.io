# Excel解除工作表密码保护


<!--more-->

## 复制代码

```vb
Sub DeletePW()
ActiveSheet.Protect DrawingObjects:=True, Contents:=True, AllowFiltering:=True
ActiveSheet.Protect DrawingObjects:=False, Contents:=True, AllowFiltering:=True
ActiveSheet.Protect DrawingObjects:=True, Contents:=True, AllowFiltering:=True
ActiveSheet.Protect DrawingObjects:=False, Contents:=True, AllowFiltering:=True
ActiveSheet.Unprotect
End Sub
```

---

![](/OSS/image/20171001/1.gif)

</br>

![](/OSS/image/20171001/2.gif)
