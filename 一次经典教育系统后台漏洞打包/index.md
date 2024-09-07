# 一次经典教育系统后台漏洞打包


<!--more-->

> _转载自： [https://forum.butian.net/share/3693](https://forum.butian.net/share/3693)_

## 记:一次经典教育系统后台漏洞打包!

## 前言:

小编认为像什么什么大学比较显眼的 "统一认证登录"||"学生综合管理",基本上弱口令是不太行,别的漏洞的话好多也都被大佬们打完了或者利用上不太容易(菜鸟的内心崩塌)，对于自己渗透能力的有限，信息收集就尤为重要! 既然主站打不了，就打旁站吧！（基本的方式都是通用的） 这里先分享一下**小编自用的谷歌语法：谷歌语法基础的符号：** “xxx”: 将要搜索的关键字用引号括起来 (表示完全匹配，即关键词不能分开，顺序也不能变)

例如：腾讯课堂如果不加“ ”的话，就会针对腾讯和课堂进行拆分，既对腾讯进行搜索也对课堂进行搜索，所以加上“ ”的话就会对腾讯课堂进行绑定，只对腾讯课堂进行搜索

+：“xxx” +baidu.com

搜索 xxx 与 baidu.com 相关的内容

例如：腾讯课堂 +ke.qq.com，那么这里就会显示 ke.qq.com 相关的内容

\-：“xxx” -baidu.com

搜索结果里面除去 baidu.com 相关的内容

例如：腾讯课堂 -ke.qq.com，这里再搜索的时候，就会把这个网址屏蔽掉

谷歌语法的基础使用 在渗透测试的过程中，运用谷歌语法能快速地帮我们找到可能存在漏洞的页面

谷歌语法常用搜索参数： site： 指定域名，如：site:edu.cn 搜索教育网站

inurl： 用于搜索包含的 url 关键词的网页，如：inurl:uploads 文件上传，搜索关于公司有关的网址中含有 login 的网页，

intitle： 搜索网页标题中的关键字，如：

intitle:“index of /admin” robots.txt

intitle:“robots.txt”

intext： 搜索网页正文中的关键字，如：intext:登陆/注册/用户名/密码

filetype： 按指定文件类型即文件后缀名搜索，如：filetpye:php/asp/jsp

cache： 已经删除的缓存网页，推荐组合使用

**谷歌语法拓展** **查找后台** site:xx.com intext:管理|后台|登陆|用户名|密码|系统|帐号|admin|login|sys|managetem|password|username

site:xx.com inurl:login|admin|manage|member|admin_login|login_admin|system|login|user

**查找 sql 注入漏洞** inurl:.php?id=23 公司

inurl:.asp?id=11

**查找上传点：** site:xx.com inurl:file| uploadfile

**查找敏感信息泄露** intitle:“Index of /admin”

intitle:“Index of /root”

intitle:“Index of /” +password.txt

intitle:phpinfo()或者 inurl:phpinfo.php

**查找未授权访问**phpmyadmin inurl:.php? intext:CHARACTER_SETS,COLLATIONS, ?intitle:phpmyadmin

**这次案例就是**：site:xxx.edu.cn “管理登录”||“登录”||“用户登录” 由于一次意外经历，意外获得该学校的秘密规律（方式有且不限于用户手册/小程序），所以是一场有针对性的后台登录

## 某实践教学毕设管理平台

像这一种一眼二开的老旧学校管理系统，就感觉有戏，不出所料利用收集到的密码规律也是成功登陆了

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002lBSz93HGtv2.jpg)

### 信息泄露

进来直接就给了惊喜（**学生账号也能看到同学和老师**）个人感觉这种毕设学校都是这样整的

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000021e8Ox0nNje7.jpg)  
直接发现大量学号规律，已经算是信息泄露了，但是都进来了哪有那么容易走， 于是开始用自己三脚猫功夫--再加上又有学号规律，可以试试越权咯！

### 越权测试

翻了翻功能点发现有个修改密码，哎！好像这类一般有越权修改密码哦！开搞

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000vxZf82X8dIg.jpg)  
点击修改密码抓包：

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002szITk3Su3Hb.jpg)  
发现可以修改的参数都在 cookie 里面： ASP.NET_SessionId 这一看就是加密签名咯（能力有限留给逆向大佬） OA_User=id=54598 （感觉跟用户 id 有关系） unumber 和 ip 分别是用户名和 IP 地址（感觉也没法改） Powerid= 6 (这个个位数参数猜测是权限上面的）

##### （注意）

**这里面我在每一次点击功能点时会连续抓取 4~5 个包，为了达成越权目的必须确保每一个数据包都进行修改！！**

尝试修改 OA_User=id= 54597 （先减一位然后再减一位）

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002ghYh04dk5sh.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002ykNRs0oJibw.jpg)  
发现对应的用户名也是对应着改变，（只是不和 id 匹配）

哎！这不就是直接可以越权修改密码！水平越权有了！

#### 扩展：垂直越权

不过这些都是修改 OA_User=id= 发现都是便利的一些学生 id，就想下能不能 get 到**教师**或者**管理员**

记得还有个参数 Powerid= 6

便利学生的时候就发现有些 id 是遍历不出来的（这些可能就是管理员/教师）**其中就有一个 id 是 5.**

为了方便确定信息这次点击个人基本信息

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002U8V3g2n7Cvu.jpg)  
1.通过遍历结果尝试修改 OA_User=id=54590 powerid=5

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000024Svjr4K12Z3.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001v1zZ51J1eh6.jpg)  
发现和我猜测的一样 ‘5’ 就是教师权限！拿到老师权限同样也是可以直接越权修改老师密码!

2.老师权限都试出来了，就想着管理员！！！

##### 划重点

这里,通过遍历发现 40000-55000 都是可以便利的点,管理员这里面并没有出现!

所以说:一般这种系统**管理员权限特殊**会比较特殊，根据小编多年扣脚的经验 ，管理员 id=1，（这一点适用于大多数管理系统），同时权限做出的是数字越小权限越大，这里 powerid=1 放包注意和上面一样

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003zGAYN1ycXwP.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003Nl2Iz1BqrJF.jpg)

成功拿到管理员权限！泄露大量账号密码信息：

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001TdX773HxjdQ.jpg)

测试添加用户

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002MsEx31yDvk1.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003YicyK1X0Dyi.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD00000020ZMu1SddCi.jpg)

直接可以任意添加管理员和导师账户！**（声明：所有测试账户均已经删除，仅为测试所用）**

同样，进行功能点抓包修改可以越权修改管理员密码！

### XSS（经典绕 waf）

既然我能越权至教师账户，那就接着试一试 xss

在教师的功能点里面有一个学生信息列表，可以直接读取学生个人信息

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001WJExk1Z9awx.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002BLRej1r4lK0.jpg)

同时学生信息可以上传这些信息，那不是多好的储存型 xss 模板

话不多说开测：

#### 测试最基础的 payload

`<script>alert(1)</script>`

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000014AWSv17XAoQ.jpg)  
初步测试只有**专业特长**和**姓名**没有输入限制，（别的只能是纯数字）

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000020YKS333hc8s.jpg)

好好好，这一下算是踢到软柿子中的最硬的了--waf (吗喽痛苦)

不过都到这里了，怎么也要绕一下！

#### xss 绕 waf

绕过一般思路! **一、更改提交方式** 在默认配置下，为了节省资源，许多 WAF 只会对 GET 请求进行过滤拦截，而忽略了对 POST 请求、Cookie、HTTP Header 等其他提交方式的检测。因此，攻击者可以尝试更改有害语句的提交方式，如将 GET 请求修改为 POST 请求，或者通过 Cookie、HTTP Header 等方式提交恶意脚本，以绕过 WAF 的拦截。

**二、混淆伪装绕过** 混淆伪装是一种常见的绕过 WAF 的手段，攻击者通过编码、大小写混淆、双写、转义字符等方式对恶意脚本进行伪装，使其绕过 WAF 的关键词过滤规则。例如，将 JavaScript 代码中的关键字进行大小写混淆（如`<scriPT>`），或者使用 Unicode 编码、Base64 编码等方式对代码进行编码。

**三、标签和事件函数变换** XSS 攻击主要是通过触发 HTML 标签中的事件函数来执行恶意脚本。因此，WAF 会重点识别能够触发事件函数的 HTML 标签和事件函数字段。攻击者可以尝试使用其他可以执行 JavaScript 代码的 HTML 标签（如`<svg>, <button>, <img>`等）替换常用的`<script>`标签，或者使用其他事件函数（如 onerror, oninput, onmousedown 等）替换常用的 onclick 事件函数，以绕过 WAF 的拦截。

**四、利用 WAF 的缺陷和配置不当** 「增加 WAF 负担」：有些 WAF 在处理大量数据时可能会降低检测精度或放弃检测部分数据包。攻击者可以通过向 WAF 发送大量正常数据包并夹杂异常数据包的方式，增加 WAF 的负担，从而绕过 WAF 的检测。

「利用 WAF 配置不当」：WAF 的配置可能存在漏洞或不当之处，如只检测部分参数、忽略某些类型的请求等。攻击者可以通过分析 WAF 的配置规则，构造绕过 WAF 检测的请求。

「旁站绕过」：在某些情况下，网站管理员可能只对主站进行了 WAF 防护，而忽略了旁站或子域名的防护。攻击者可以尝试通过旁站或子域名绕过 WAF 的防护。

**五、使用自动化工具** 自动化工具如 XSStrike 等可以帮助攻击者自动测试 WAF 的防护效果，并生成绕过 WAF 的 payload。这些工具通常包含多种绕过 WAF 的技巧和策略，可以显著提高攻击的成功率。 XSStrike 开源地址：[https://github.com/s0md3v/XSStrike](https://github.com/s0md3v/XSStrike)  
**六、其他技巧**

- 「利用伪协议」：某些 HTML 属性支持伪协议（如 javascript:），攻击者可以利用这些属性执行恶意脚本。
- 「利用 CSS 跨站」：在某些情况下，攻击者可以利用 CSS 中的某些特性（如 expression()）执行 JavaScript 代码。
- 「利用全局变量和函数」：JavaScript 中的全局变量和函数（如 eval(), window.onload 等）可以在不直接引用脚本标签的情况下执行代码，攻击者可以尝试利用这些变量和函数绕过 WAF 的防护。

#### 这里进行一个一个尝试

#### **1.大小写绕过**

`<sCript>alert(1)</Script>`

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002lCzrr0iCCT1.jpg)

#### 2、双写绕过(不行)

`<sCri<script>alert(1)</script>SC<script>ripT>`

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003T4vux3I97Ki.jpg)

#### 3.img 标签

`<img src\\=15 onerror\\=(function(){alert(15)})()>`

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000019CJYT2MNXdN.jpg)

#### 4、onmouseover 事件

`` <a onmousemove\\="do something here">\`  ``当用户鼠标移动时即可运行代码

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004BrGdx2wX2Ks.jpg)

5、主动闭合标签实现注入代码

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004GvwoR4PHjXZ.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002ZoOAZ21hhhn.jpg)

#### 6.绕过 HTML 注释符

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002jCpmK48IqBV.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003Om67G04ySfK.jpg)

#### 7.利用换行符绕过

`<img/src\\=14 onerror\\=window.alert(14)>`

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000026eidt3p4ccn.jpg)

#### 崩溃,我是真的崩溃!!!，上字典开跑

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004etUAp42SukB.jpg)

#### 最后也是跑出来了一个！！！

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004cV06n3V702h.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003xyVEK4ABQwB.jpg)

发现**使用 `<svg>` 标签和 `onload` 事件**：

利用 `<svg>` 标签的 `onload` 事件触发 JavaScript 代码执行,使用 `unescape` 和 `eval` 结合的方式，对代码进行混淆和编码,将字符串 `'alert(1)'` 编码为 `'%61%6c%65%72%74%28%31%29'`，然后通过 `unescape` 将其还原，再使用 `eval` 执行还原后的代码

推测目标服务器:缺乏对动态代码执行的检测，或检测机制不足以处理复杂的动态执行逻辑。对常见的 `onclick`、`onmouseover` 等事件进行了更严格的过滤，但对 `onload` 事件的过滤不足。通过 `onload` 事件触发执行，绕过了可能针对其他事件（如 `onclick`、`onmouseover`）的过滤。可以尝试其他不常见但有效的事件（如 `onfocus`、`onerror`）进行绕过。服务器可能没有对 URI 编码（如 `%61%6c%65%72%74%28%31%29`）进行解码并检查。这表示过滤器可能缺乏对编码/解码操作的深度检测。

牛掰,还是网传的字典牛掰,自己还得练

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001KE9yE2gqtX7.jpg)

最终也是终于弹出来了

### 文件上传 XSS

在测试功能点的时候发现存在文件上传点,

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004XMn6M3QoFmJ.jpg)  
aspx 语言首先想尝试一句话木马

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003rEVVM2Kiy66.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000uLhwX4HTBjX.jpg)

直接又是不行,这里小编上传木马能力有限,抓包分析

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001CA2pO49aS9Y.jpg)  
发现他是接收 html 的

尝试用 html 弹出一个 xss

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001HM2C63VO1B9.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002I5bYE4T8z2C.jpg)  
老师界面观察也是成功的打上一下(水平较低)

整体拿下来观察是非常经典的一次后台打包,根据分析**该系统普遍存在于学校毕业设计**,整体的思路都是通用的,想类似的系统可以多尝试,类似是一种毕设通杀!!

(所有增添账号和上传文件均删除)

