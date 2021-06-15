# C# 下载图片到本地


<!--more-->

## 下载图片到本地

```CSharp
public void saveimage()
{
    WebClient mywebclient = new WebClient();
    string url = "http://images.google.cn/intl/zh-CN_ALL/images/images_hp.gif";
    string newfilename = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() +  DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + ".jpg";
    string filepath = @"F:\" + newfilename;
    try
    {
        mywebclient.DownloadFile(url, filepath);
        //filename = newfilename;
    }
    catch (Exception ex)
    {
        MessageBox.Show(ex.ToString());
    }
}
```
