# 给表弟的Web安全入门建议


<!--more-->

> *转载自： [https://sosly.me/index.php/2017/07/17/studywebsec/](https://sosly.me/index.php/2017/07/17/studywebsec/)*

表弟大一刚结束，学的是计算机相关的专业，上学期开始学安全相关的技术，我就给他买了一套云课堂的  [《Web安全工程师微专业》](https://links.jianshu.com/go?to=https%3A%2F%2Fmooc.study.163.com%2FsmartSpec%2Fdetail%2F1001227001.htm%3Fshare%3D1%26shareId%3D9305777) 课程，结果这货学到第一课的时候，因为错过章节考试时间直接没及格......好在后边几课都按部就班的学习了，然后应该是6月份开始试着在  [教育行业SRC](https://links.jianshu.com/go?to=https%3A%2F%2Fsrc.edu-info.edu.cn%2F) 挖掘漏洞，到现在也只是发现了几个XSS、敏感文件泄露之类的小漏洞，和他同期学习课程的一些同学已经挖了很多了排名很靠前，还有在企业SRC挖洞的，看看别人家的表弟...之前表弟要准备课程的期末考试之类的，现在放暑假了，我就建议说可以再好好学习那套课程，趁着暑假，多实践。然后就讨论到 **有没有适合入门阶段学习的Web安全书籍** 这个问题。

说到Web安全书籍，这几年其实是一种百家齐放的状态，不断有优秀的书籍出版，那这里就**尽可能少地整理几本我阅读过的Web安全入门书籍**作为推荐。

如果没学过相关课程的小伙伴，真的从0基础开始的话，还是需要先掌握一些基本的技能：

1. 学习  [网站构建初级教程\_W3C](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2Fweb%2Findex.asp) 以及  [HTTP协议基础-runoob](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.runoob.com%2Fhttp%2Fhttp-tutorial.html) 上了解Web前后端以及HTTP协议的一些基础介绍，花半天时间对相关技术有个概念性的了解就够了。

2. Windows下下载  [phpStudy](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.phpstudy.net%2F) 或者  [WAMP](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.wampserver.com%2F) ，在本地搭建Web服务器环境，然后自己搜索两篇文章学习下基本的操作方法。这个本地Web服务器也就相当于学习过程中的一个实验环境了。

3. 学习浏览器的开发者工具（通常快捷键F12调出），搜索一些教学文章，掌握Chrome或者Firefox浏览器开发者工具中的Network、Elements功能的常见用法，可以**查看HTTP数据包以及定位页面元素**。

0x01 给表弟的Web安全入门建议

适合初学者的Web安全书籍

 [《白帽子讲Web安全》](https://links.jianshu.com/go?to=https%3A%2F%2Funion-click.jd.com%2Fjdc%3Fe%3D0%26p%3DAyIHZR5aEQISA1AYUyUCEgJcGVMSBSJDCkMFSjJLQhBaUAscSkIBR0ROVw1VC0dFFQIXDlcTXBIdS0IJRmtqW1VPUUQGHGJsZR5uJhV%252Bc1U0R1pTDh43XRhcHAMTBFUTaxUDEwZVGVoRBRc3ZRtaJVB83%252BOtg7CzDtP%252FlI6dlSIPVhxdEwQRAVMrWxEDEwRcEl8WChMEXStcJXd0RQhTayUyIg%253D%253D%26t%3DW1dCFBBFC1pXUwkEAEAdQFkJBVsVBxsFXRxcCltXWwg%253D)

道哥出品，很多人的Web安全启蒙书。

 [《Web前端黑客技术揭秘》](https://links.jianshu.com/go?to=https%3A%2F%2Funion-click.jd.com%2Fjdc%3Fe%3D0%26p%3DAyIHZR5aEQISA1AYUyUCEgdcG1IXASJDCkMFSjJLQhBaUAscSkIBR0ROVw1VC0dFFQISDlUSWRYdS0IJRmt3BGRXFloyC2dLcVRsPBN4W1sHX1JlDh43XRhcHAMTBFUTaxUDEwZVGVoRBRc3ZRtaJVB83%252BOtg7CzDtP%252FlI6dlSIPVhxdEwQRAVMrWxEDEwRcHVMWABsFUCtcJXd0RQhTayUyIg%253D%253D%26t%3DW1dCFBBFC1pXUwkEAEAdQFkJBVsVAhsHXBlYCltXWwg%253D)

前端黑客技术，余弦的作品。

对于读书，我觉得**读书的目的是：学以致用**。应该把**注意力放在如何应用读到的知识，提高自己的技术，而不是学了多少内容。**

一年哪怕只学习了一本书，也要让这本书的内容结结实实地提升自己的技能，而不是只为了多一点谈资或者阅读清单上多一个数目

。这也是我这里只推荐了两本书的原因，因为我觉得这两本书，能够认真学习完，并且**实践**书中的案例和技能，已经很难得了，同时相比于简单翻一遍，要多花费很多的时间和精力。

工具与实战

那学习Web安全呢，同时还要掌握一些工具：**浏览器开发者工具与浏览器插件（如HackBar、ProxySwitcher）、抓包工具如Burpsuite、漏洞扫描和验证工具如御剑、sqlmap、AWVS**，工具可以在  [Freebuf](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.freebuf.com%2F)上自行搜索下载，教程可以参考 [Web安全-i春秋](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.ichunqiu.com%2FnewRelease%2FdarrPath%2F105)系列教程中对应这几款工具的章节学习。

好的工具可以帮助我们提高测试效率，扩展测试思路。除了工具的使用，通过搭建本地实战环境练习手工技巧，也是很好的进阶之路，这里建议可以搭建  [DVWA](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.dvwa.co.uk%2F)漏洞测试环境，然后参考  [DVWA系列教程\_Freebuf](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.freebuf.com%2F%3Fs%3DDVWA)进行学习。

学习的同时也可以在在 [教育行业SRC](https://links.jianshu.com/go?to=https%3A%2F%2Fsrc.edu-info.edu.cn%2F)等漏洞平台上挖掘漏洞，赢得认可，也是一种动力，但挖掘漏洞的时候一定要注意规范和界限，可以参考 [自律方能自由，《网络安全法》实施后的白帽子行为参考](https://links.jianshu.com/go?to=https%3A%2F%2Fsosly.me%2Findex.php%2F2017%2F06%2F02%2Fwangluoanquanfa%2F)，挖掘漏洞的同时也要注意保护自己。

适合初学者的社区和资讯站点

 [网站安全\_i春秋社区](https://links.jianshu.com/go?to=https%3A%2F%2Fbbs.ichunqiu.com%2Fforum-59-1.html)

i春秋社区聚集了很多的人气，有好多学生，也很活跃，入门和进阶的文章都有，可以多多交流。

 [Freebuf](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.freebuf.com%2F)

很多科普和梳理性的文章，也经常会有时下的热点讨论。

大学在校生可以关注的一些比赛

 [全国大学生信息安全竞赛](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.ciscn.cn%2F)

这个和**全国大学生电子设计竞赛信息安全技术专题邀请赛**一样，都是做一个安全软硬件系统来解决一些安全问题，通常有项目文档提交、源代码提交、现场演示答辩等几个步骤，分为初赛复赛，**全国大学生信息安全竞赛**为每年一次，**全国大学生电子设计竞赛信息安全技术专题邀请赛**通常两年一次，这两个比赛获奖对于大学生都有竞赛加分，在锻炼自己的同时，对评奖学金和保研也有帮助。

 [全国大学生信息安全竞赛创新实践能力线上赛（CTF形式）](https://links.jianshu.com/go?to=https%3A%2F%2F2017ncstisc.ichunqiu.com%2F)

这个是和i春秋合作的线上赛，和线下赛目前看来还没什么关联，CTF性质的。每年的CTF比赛很多，大家可以关注i春秋等一些站点的资讯就行了，大学生组队参加CTF比赛的挺多，也是很好的锻炼方式。

挖洞、博客与团队

既然是入门了，建议就可以随着学习的深入，**在一些SRC平台上挖掘漏洞，如果你不太喜欢走这个路线，也可以整理自己的学习过程，写一些技术博客进行分享**，俗话说来“**你挖洞来我拍砖**”，都可以，而且一些平台如Freebuf、先知社区都有付费文章奖励计划，这两种都可以在学习技术的同时获取到一些物质上的奖励，如果你慢慢有了一些编程能力（Python、Web前后端等），除了让自己的安全技术自动化之外，还可以再Github等平台分享一些开源项目。相关的SRC站点我随后再说。

关于写博客，如果自己搭建站点的话，可以考虑**使用hexo+github搭建免费个人博客**，或者租用一台VPS部署Wordpress博客程序。其实我觉得，初学的话，可以不在站点搭建上浪费时间，在一些比较优质的博客平台上注册一个帐号即可，也可以有自己的个性域名。如oschina、博客园、 [简书](https://www.jianshu.com/)。写博客本身就是对自己知识技能的巩固和梳理，不要怕写不好，博客就当是给自己看的。

有一个点要提示一下，既然想走安全这条路，那么给自己想一个个性的ID（昵称），提交漏洞或者注册博客时都用这个，好好维护，当做自己的个人品牌认真经营，随着你的贡献和分享越来越多，你的ID会被越来越多的人了解和认可。

积累的过程中，如果恰好遇到几个志同道合的小伙伴，那就组个小团队吧，平时技术切磋交流，或者组团挖洞，打CTF等都是极好的。也可以主动去搜寻，或者申请加入一些公开招新的安全团队。**一个人有时候可以走的更快，但一个团队往往可以走的更远**。

一些进阶的书籍和资源推荐

这部分内容按需选择即可，等你入门了之后，有了一定的技术和经验，你已经足够去规划自己的发展了。

 [《HTTP权威指南》](https://links.jianshu.com/go?to=https%3A%2F%2Funion-click.jd.com%2Fjdc%3Fe%3D0%26p%3DAyIHZR5aEQISA1AYUyUCEgZRHF8RBSJDCkMFSjJLQhBaUAscSkIBR0ROVw1VC0dFFQITA1IfXxIdS0IJRmtHAWhBL1spfWBSABd9OGlSTmUGYT1TDh43XRhcHAMTBFUTaxUDEwZVGVoRBRc3ZRtaJVB83%252BOtg7CzDtP%252FlI6dlSIPVhxdEwQRAVMrWxEDEwRcHVMSABoEUStcJXd0RQhTayUyIg%253D%253D%26t%3DW1dCFBBFC1pXUwkEAEAdQFkJBVsVAxYAUR9cCltXWwg%253D)

平时可以当做词典来翻阅。

 [《黑客攻防技术宝典 Web实战篇》](https://links.jianshu.com/go?to=https%3A%2F%2Funion-click.jd.com%2Fjdc%3Fe%3D0%26p%3DAyIHZR5aEQISA1AYUyUCEgZWGloWASJDCkMFSjJLQhBaUAscSkIBR0ROVw1VC0dFFQITBFQaWBYdS0IJRmtMCnt%252FI3pbUGJLAAx%252BIXJEYkEQEj5DDh43XRhcHAMTBFUTaxUDEwZVGVoRBRc3ZRtaJVB83%252BOtg7CzDtP%252FlI6dlSIPVhxdEwQRAVMrWxEDEwRcEloUAhoHVCtcJXd0RQhTayUyIg%253D%253D%26t%3DW1dCFBBFC1pXUwkEAEAdQFkJBVsVAxEGVBhYCltXWwg%253D)

深入剖析Web安全技术。

 [《黑客秘笈 渗透测试实用指南》](https://links.jianshu.com/go?to=https%3A%2F%2Fu.jd.com%2FXQQNOf)

可以在虚拟机VMware中，下载运行kali Linux的VM版本进行学习和实践。

编程技术相关的书籍和教程， [W3C](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.w3school.com.cn%2F)、 [菜鸟教程runoob](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.runoob.com%2F) 和 [现代魔法学院](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.nowamagic.net%2Facademy%2F)已经能解决很多问题了，然后语言相关的官方文档都可以当做词典来查，如果想找本书系统学习的话，这里推荐下Python、PHP和Web前端的书。

 [《Python核心编程》](https://links.jianshu.com/go?to=https%3A%2F%2Funion-click.jd.com%2Fjdc%3Fe%3D0%26p%3DAyIHZR5aEQISA1AYUyUCEg9XHFgXCyJDCkMFSjJLQhBaUAscSkIBR0ROVw1VC0dFFQIaBVIYWRwdS0IJRmttRmFzKRldUWdEVxQdD2hhYmAmS0FDDh43XRhcHAMTBFUTaxUDEwZVGVoRBRc3ZRtaJVB83%252BOtg7CzDtP%252FlI6dlSIPVhxdEwQRAVMrWxEDEwVQGVsRAxUPVytcJXd0RQhTayUyIg%253D%253D%26t%3DW1dCFBBFC1pXUwkEAEAdQFkJBVsVChAAVhlSCltXWwg%253D)

 [《PHP和MySQL Web开发》](https://links.jianshu.com/go?to=https%3A%2F%2Fu.jd.com%2FIOPdyM)

 [《Head First HTML与CSS》](https://links.jianshu.com/go?to=https%3A%2F%2Funion-click.jd.com%2Fjdc%3Fe%3D0%26p%3DAyIHZR5aEQISA1AYUyUCEgVXGF8UBSJDCkMFSjJLQhBaUAscSkIBR0ROVw1VC0dFFQIQBVYfWhIdS0IJRmtMe1NuJV8%252FUGFQQx1YX0xkaVwwWztlDh43XRhcHAMTBFUTaxUDEwZVGVoRBRc3ZRtaJVB83%252BOtg7CzDtP%252FlI6dlSIPVhxdEwQRAVMrWxEDEwVQGVgTAxABUCtcJXd0RQhTayUyIg%253D%253D%26t%3DW1dCFBBFC1pXUwkEAEAdQFkJBVsVABAEURpcCltXWwg%253D)

 [《JavaScript高级程序设计》](https://links.jianshu.com/go?to=https%3A%2F%2Funion-click.jd.com%2Fjdc%3Fe%3D0%26p%3DAyIHZR5aEQISA1AYUyUCEw9RG1oXBCJDCkMFSjJLQhBaUAscSkIBR0ROVw1VC0dFFQMaA1UaWRMdS0IJRmtFAmQGJlMuVmIUdSVLPE19SVgqWTplDh43XRhcHAMTBFUTaxUDEwZVGVoRBRc3ZRtaJVB83%252BOtg7CzDtP%252FlI6dlSIPVhxdEwQRAVMrWxEDEwVQGVkUBxUPUCtcJXd0RQhTayUyIg%253D%253D%26t%3DW1dCFBBFC1pXUwkEAEAdQFkJBVsUChYHVBldCltXWwg%253D)

站点可以浏览下  [安全圈info](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.anquanquan.info%2F) 与  [SecWiki](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.sec-wiki.com%2F) ，前者是一个持续更新的安全圈站点导航，总能找到你想要的网站，之前说的SRC站点这里都有，后者是一个安全资讯的收录分享平台，有什么安全问题可以搜索一些历史文章看看。

0x02 聊聊“学习”与“实践”

入门与进阶

**对于初学者来说，找一个靠谱的教程或者老师，帮助自己快速入门是非常有必要的。入门之后，虽然高手的点拨也很重要，但更多的功课其实是需要你自己来做的**。这也是为什么优秀的入门教程很多，但是优质的进阶版本教程却不多。

有一句话叫“**付费就是占便宜**”，对于新手来说，入门阶段花一点钱买一套优质的课程，让有经验的内行带着自己学习，往往是最优的选择。还有一句话叫“免费的就是最贵的”，免费的教学资源，质量参差不齐难以保证，不用花钱，但耗费的是你筛选的精力和时间。自己根据条件取舍，现在已经逐渐进入了一种知识付费的时代，这就是我给表弟买了一套云课堂的 [《Web安全工程师微专业》](https://links.jianshu.com/go?to=https%3A%2F%2Fmooc.study.163.com%2FsmartSpec%2Fdetail%2F1001227001.htm%3Fshare%3D1%26shareId%3D9305777)课程作为入门学习的原因，一套优质的网课，相比于昂贵的线下班性价比很不错。

等准备好了再“实践”？

李笑来老师有一个观点，学习任何一个学科的时候，都有一个概念很重要：

**最少必要知识**

**MAKE** : **M**inimal **A**ctionable **K**nowledge and **E**xperience

就是说，当我们在学习某项技能的时候，就要用最快的时间摸索清楚**最少必要知识 （MAKE）** 都有哪些？ 然后迅速地掌握它们，这样就实现了“**快速入门**”，然后就可以开始**动手实践**，然后在实践中印证理论、加深理解，同时继续扩展学习。

**同样的时间，一个用来等待，另一个用来践行，两者的差距可能是天壤之别。你要知道没有任何考试是在你准备充分了才开始的**。

有些人喜欢等待，等到合适的时机出现的时候，再采取行动。另一些人则喜欢边做边想，有不足的地方就改进，有新的问题就解决。

一段时间过去之后，后者可能已经前进了很长一段路程，而前者多半还在等待一个“恰当的时机”。

**我原来就有这个问题，老想着先体系化学完某门技术...结果就是坚持不实践，过了很久还是啥都不会，反而之前看的那些知识因为没实践过也都忘了**。

**用和学，用比学重要。用时比学时重要**。“用时”是一个很好的概念。

很多人说自己“学”了那么多年英语，但现在依然说不出，听不懂。其实他们就是在用“学时”代替“用时”来计算自己的付出的。

我们总说有效学习，其实衡量有效学习最好的方式就是：计算使用的时间。在安全技术学习上，就是：**实践的时间**。

从“想到”、“学到” 到 “做到”

“用”比“学”重要；“做”比“想”重要；边做边想，比单纯想想不知道好多少倍。只有做到了才是掌握了。“人至‘践’则无敌”。

只要你开始做，高估或低估的困难就不仅仅是一个估计，而是一个摆在面前需要解决的现实问题。你对于它的理解不会再飘忽不定，而会变得非常具体。

**很多人在做得不好的时候，总是喜欢退缩回原来的舒适区，认为是由于自己的基础还不好所以才这么不顺利，而忘记了这些践行过程中的困难，才是真正帮他们打牢基础的过程**。

0x03 结语

很多人梦想找到一个牛逼的师父，几天速成然后笑傲江湖。可是每一个真正练就一身武艺的人都是靠冬练三九夏练三伏这么过来的，他们靠着一种忘我的热情持续投入进去磨练，数年如一日，最终自己也不知道怎么就发现具备了无坚不摧的实力。 同样，就算是要开好挖掘机，或着当一个好厨师，也要在自己的技能树上，一步一步地积累技能点，把过路点都点满了，才能点出大招。

我们从小到大往往会听到长辈们的建议：“戒骄戒躁”。虽然“戒骄”放在前面，但“戒骄”其实是有了一定成绩之后的事情。对大多数人来说，首先要“戒躁”，才有机会“戒骄”。

一个人能获得的最可贵的能力，都和掌握一门语言一样，你所付出的努力不是能够获得即时回馈的，甚至在很长的一段时间内没有任何收获，直到积累到了一定的阶段后，忽然爆发出惊人的力量，连你自己都不清楚这一切是如何发生的。比如锻炼身体，读书写作。当你经历了足够的量变终于引起质变时拥有的技能，大部分人是终身难以企及的，不是因为他们太笨，恰恰相反，因为他们都太聪明了。选择一个正确的方向，对那些无法立即获得回报的事情，依然能付出十年如一日的专注和热情，最终的结果也许不足以让你独孤求败，但足以出类拔萃。

祝表弟早日成为表哥，然后带带我~
