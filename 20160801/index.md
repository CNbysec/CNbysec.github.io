# C# 通过URL获取图片并显示在PictureBox上的方法


<!--more-->

## 通过URL获取图片并显示在PictureBox上的方法

```CSharp
string url = string.Format(@"http://webservice.36wu.com/DimensionalCodeService.asmx/GetCodeImgByString?size={0}&content={1}", 5, 123456);
System.Net.WebRequest webreq = System.Net.WebRequest.Create(url);
System.Net.WebResponse webres = webreq.GetResponse();
using(System.IO.Stream stream = webres.GetResponseStream())
{
    pictureBox1.Image = Image.FromStream(stream);
}
```

