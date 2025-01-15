# 免杀大佬加入黑灰产还打得过吗


<!--more-->

> _转载自： [https://forum.butian.net/share/3705](https://forum.butian.net/share/3705)_

## **一、前言**

大家好，我是来自顺丰安全成文实验室的一名老兵，代号“PX0”，我的任务是追踪威胁情报，深入分析最新黑灰产动向。近期，实验室捕获到一组“银狐”样本，经查，样本来源于伪装成主流会议软件的网站，网站通过提高搜索引擎的收录权重来诱骗用户下载该病毒软件。

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001j6XZo2eGJUT.jpg)

此前我也曾分析过“银狐”相关样本，但这回的新版本，免杀技术简直出神入化，主流的安全软件几乎拿它没辙。这让我心里直犯嘀咕：“难道真的有免杀界的高手‘叛变’，跑去给黑灰产当军师了？”不过别担心，接下来，就让我来带大家揭秘这位高手的免杀大招，再教大家几个怎么识别和防住它的高招！

## **二、本文关注点**

- 此银狐分支样本在出现阶段，主流沙箱、EDR 几乎无法检测，本文主要分享新增部分功能
- 攻击者更加注重杀软和防御能力对抗，引入了 bypass 检测、防病毒模拟器检测、RPC 构建持久化
- 样本的进化更倾向于多段的内存加载、运行时动态解密，后续可能会出现 rootkit 类型的完全隐蔽后门
- 根据样本的函数代码通用特征提取检测规则、检测思路分享

## **三、正文分析**

### 1、加载过程

在近期捕获的一批样本中，初始投递的加载器代码几乎一致，攻击者通过最少的 API 调用完成第一阶段的 shellcode 加载 (对通用杀毒软件来说，敏感 API 调用越少，风险相对越小)；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003zv8s73izDsn.jpg)

shellcode 加载完成后，通过内联 jmp rbx 跳转 0x1B0000 执行，这里其实是有一步 mov 的地址转移操作，作用是避免出现 jmp rax 的明显内存调用特征，在 8 月迭代样本也出现了其他的寄存器调用；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002XvDnz1DCXQB.jpg)

### 2、解密过程

进入 shellcode 内部，实际只有 call 一个有效指令，后续的所有字节都是加密状态；这类似 cobaltstrike 睡眠解密，此类函数适合作为检测特征，区别是此函数需在程序启动时检测；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000hnRyS0uCeCr.jpg)

解密函数即运行时的内部计算，进行了一系列循环右移、减法和取反操作，用于动态解密后续指令；

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000013jzvQ2RsQQR.jpg)

经对比可以看出，右侧部分指令被解密，被解密出来的部分实际是一个新的异或解密函数；

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000006cAkO2Mvrbn.jpg)

经过长期跟踪发现，此函数出现在银狐多个版本，为了更清楚地了解功能和检测，我们代码还原这个函数；

```
unsigned char key = 0x91;
```

从内存可以看到整个倒序解密的过程，运行完成后，整块 shellcode 代码被解密完成；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000u46p82giYwc.jpg)

### 3、环境检测、绕过

解密完成后首先进入 sub_99A5 函数，此函数集成一些 bypass 和环境检测能力，是对比以往样本的增强部分；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003pWHoj2s1TZ7.jpg)

首先是 bypass ETW 和 AMSI，实现方式完全相同；都是通过 patch 到对应函数开头一个 0x3C 字节即 ret 指令，完成扫描、日志输出的代码跳过；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004MlG7n1rfBRM.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002QQdZv0MZbGu.jpg)

### 4、模拟环境检测

微软防病毒为首次扫描的程序提供了特殊的二进制模拟器环境，会附带一些虚拟模块和预定返回值；接下来的几个 check 函数是关联性代码，整体功能是为了检测 Defender 模拟环境；

判断程序名，如果匹配 v5 数组中的:\\myapp.exe(模拟进程名称，不是实际运行的进程)则退出进程；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001AgRVU0i003M.jpg)

以下是对防病毒模拟器初始化功能的部分逆向代码(详细内容可以参考 2018 年 BlackHat)；

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000045jPP00T0gxM.jpg)

此函数使用两个未公开函数获取 ntdll 的导出表，并通过自定义 ror 算法计算 apiHash(ntdll 运行时模拟函数)，如果命中任意 3 个 Mpclient 函数 hash 则返回错误码 0xC0000462，再通过上层函数判断退出进程；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000NnKsd1Nuagg.jpg)

分别调用 Windows 内核函数 NtIsProcessInJob 和 NtCompressKey 传入无效句柄，判断是否会返回虚拟模块的预定值，返回预期值则退出进程；![](https://qqq.gtimg.cn/music/photo_new/T053XD00000458EwJ14iZYr.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001wzzUo3RwW5l.jpg)

### 5、防御绕过

传入无效标识符，尝试动态加载 COM 类对象，判断返回值 CLASS_E_CLASSNOTABAILABLE 是否符合预期；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002d8T873UW9nP.jpg)

在堆分配一块较大的内存空间，尝试是否可以成功，通过这种方式验证系统环境；

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000008xQcM169FsF.jpg)

调用 VirtualAllocExNuma 函数申请物理内存，此函数的运行环境要求存在多个物理 CPU；判断 SxIn.dll 模块是否被当前进程加载(360 沙箱的分析 dll) ；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001VWD6p344YZJ.jpg)

获取 SYSTEM_INFO 结构体，该结构体包含系统的硬件信息 ，判断处理器数量；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001Xmx7h1xAVMJ.jpg)

获取当前主机名，通过主机名字符创建互斥体对象，判断是否存在；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002sFGOk4fqZJd.jpg)

获取令牌信息，判断进程是否能提升权限，尝试 runas 以管理员身份启动，进入死循环(用户未通过会无限弹窗)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002yQdCe0tnMuA.jpg)

判断 c:\\\\xxxx.ini 文件是否存在，此文件默认由 Gh0st 后门创建；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003J7T413FP2HI.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003x9ZOl4EeI2D.jpg)

通过 GetTickCount64 函数来测量 Sleep 调用前后的时间差，判断环境是否加速，\_\_rdtsc()函数同理；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000003oUe9u09tcJg.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001gIDA11hQR8H.jpg)

### 6、防御削弱

通过扫描进程列表、服务进程、检索窗口类综合判断 360 杀软是否存在，综合来看攻击者更倾向于个人电脑；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000004LvbrF4FG5Uk.jpg)

通过 API 发送线程消息、控制信号尝试关闭 360 杀软，若失败跳转到后续代码下载 BYOVD 驱动模块结束杀软；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001tEE8q17znu6.jpg)

检测 WindowsDefender 防病毒相关进程服务是否存在;

执行 powershell 命令添加 C:\\ProgramData 和 C:\\User\\Public 目录到扫描排除项(后门存放路径)，

在 8 月的版本中会新增 Program Files (x86)目录；

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000037VnfP37DKy5.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000021fqFH2QmPQt.jpg)

攻击者整体使用凯撒密码对字符串解密，此算法比较简单，使用固定 key 进行逐字节移位；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002S7LaS1mH84r.jpg)

此处解密完成后得到存储桶地址；根据地址表下载一组后门文件，下载完成后根据偏移标识填入随机值，使得下载文件没有固定 hash(在以往的样本中，银狐会通过多种方式实现此功能)；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002JOsnv13etSq.jpg)

下载后的文件会随机存储在 C:\\Users\\Public 目录，并在下层创建随机字符目录；在某些版本，会另外下载一组后门隐藏在 C:\\ProgramData 目录中；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001E14BM2ffTCo.jpg)

下载 BYOVD 驱动模块，当进程权限不足时跳过此部分；payload 下载完成后以内存 dll 形式解压，并获取导出函数指针，再使用 RPC 管道构建计划任务配置并调用 NdrClientCall3 函数创建，此任务用于维持 BYOVD 模块；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000000l1w0L4WAsz3.jpg)

此驱动漏洞属于 EDR Killer 类型，可以通过传入特定的控制码 0x22E044 和进程 pid 在内核强制结束对应的进程；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001KRY3s1EwGdg.jpg)

驱动内部会根据传入控制码触发调用，通过 IOCTL(IO control codes)命令执行结束进程(支持 Win11)；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001fOXbs2oLlIW.jpg)

### 7、后门远控

后门程序使用一组白加黑配合两个加密的 payload 文件， 这是银狐的惯用手法；dll 使用 VMProtect 保护，运行后使用 RC4 算法对 payload 进行解密，完成后加载 log.src 文件，再次解密得到内存 dll(VMProtect 保护)；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001bfd6f1WXc8W.jpg)

获取内存 dll 的导出函数 CLRCreateInstance，此函数内部会为后门程序创建持久化任务、禁用 UAC 等功能；

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000027YBYL0s6ngj.jpg)

最后会加载 vcxproj 后缀文件解密，完成后得到 Gh0st 变种后门，上线前会请求 ip 地址表，查看是否更新；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000001cxZYs14R9FP.jpg)

Gh0st 包含很多功能模块，具体功能此处不详细介绍了，后门还包含一些固定的 cmd 命令，适合作为检测补充；

![](https://qqq.gtimg.cn/music/photo_new/T053XD000002jF5wp0CE4gs.jpg)

## **四、检测思路分享**

1.  **创建 yara 规则**

    可以通过程序中的加解密函数代码创建 yara 规则，代码结构最好连续且固定；

2.  **TTPs 检测特征**

    通过攻击者样本或实际应急过程中发现的 TTPs 作为检测特征；

3.  **IOC 检测**

    在威胁情报痛苦金字塔的下三层中，域名相对更有效，也可根据情况选择 hash 检测；

> B736A809E7A0F1603C97D43BBC7D2EA8A9CD080B A672825339ADBB5EEEF8176D161266D4E4A4A625 E49938CB6C4CE0D73DB2B4A32018B1FF71A2D7F0 9CAA4EC93CE1CD40BD5975645A110A4325310A3B D7F41D457C8358AF840B06914D1BC969EF7939D0 48B2090FDCEA7D7C0EB1544EBCDAF911796A7F67
>
> omss.oss-cn-hangzhou.aliyuncs.com
>
> upitem.oss-cn-hangzhou.aliyuncs.com
>
> 1o2.oss-cn-beijing.aliyuncs.com
>
> 25o.oss-cn-beijing.aliyuncs.com
>
> 98o.oss-cn-beijing.aliyuncs.com
>
> vauwjw.net
>
> cinskw.net
>
> hucgiu.net

（针对样本的具体 yara、TTPs 规则等，后续将会同步到顺丰安全应急响应中心预推出的**成文实验室知识星球**，敬请期待！）

