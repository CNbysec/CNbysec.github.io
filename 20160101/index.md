# C# WINFORM 窗体


<!--more-->

```CSharp
Form1 的 Button 下
{
    Form2 f2 = new Form2();
    f2.ShowDialog(this);//
    this.Close();
}

Form2 的 load 下
{
    //只能隐藏不能关闭
    this.owner.hide();
}
```


