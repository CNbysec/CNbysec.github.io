# C# 使用Newtonsoft.Json解析json


<!--more-->

## 使用Newtonsoft.Json解析json

Visual Studio中搜索安装Newtonsoft.Json插件

```CSharp
// 解析对象
string jsonText = "{\"zone\":\"海淀\",\"zone_en\":\"haidian\"}";
JObject jo = (JObject)JsonConvert.DeserializeObject(jsonText);
string zone = jo["zone"].ToString();
string zone_en = jo["zone_en"].ToString();

// 解析数组
string jsonText = "[\"海淀\",\"北京\",\"上海\"}";
JObject jo = (JObject)JsonConvert.DeserializeObject(jsonText);
JArray rangQiuList = (JArray)jo;
```
