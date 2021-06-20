# python3实现AES加密


<!--more-->

> 转载自：[https://blog.csdn.net/chouzhou9701/article/details/89339625](https://blog.csdn.net/chouzhou9701/article/details/89339625)

# 前言
这几天研究了一下 python 实现 AES 加密，有很多坑

AES 加密的参数及其条件
这个 AES 加密的主要坑就在于这些条件， 首先 aes 加密有一下几个参数
1. 秘钥：加密的时候用秘钥，解密的时候需要同样的秘钥才能解出来
   
2. 明文：需要加密的参数
   
3. 模式：aes 加密常用的有 ECB 和 CBC 模式（我只用了这两个模式，还有其他模式）
   
4. iv 偏移量：这个参数在 ECB 模式下不需要，在 CBC 模式下需要

需要输入这些参数才能返回一个密文
下面是重点
下面说一下这几个参数的条件：
1. 秘钥：必须是16位字节或者24位字节或者32位字节（因为python3的字符串是unicode编码，需要 encode才可以转换成字节型数据）

2. 明文：字节长度需要是16位的倍数

下面我用python3简单的方法实现:

## 简单方法
```python
from Crypto.Cipher import AES
import base64
password = '1234567890123456' #秘钥
text = '1234567890123456' #需要加密的内容
model = AES.MODE_ECB #定义模式
aes = AES.new(password,model) #创建一个aes对象

en_text = aes.encrypt(text) #加密明文
print(en_text)
en_text = base64.encodebytes(en_text) #将返回的字节型数据转进行base64编码
print(en_text)
en_text = en_text.decode('utf8') #将字节型数据转换成python中的字符串类型
print(en_text.strip())
```

## 输出
```python
b'u|\xcd\x0c\xdc\\\x90\xea\xdb\xee\xec\xf68\xdd\x00\x00'
b'dXzNDNxckOrb7uz2ON0AAA==\n'
dXzNDNxckOrb7uz2ON0AAA==
```

这里有个问题就是密钥和加密的文本内容都必须是固定的16位（根据我前面说的参数要求）

所以下面优化的代码（将秘钥和需要加密的文本补成对应的位数）

## 优化的代码
```python
from Crypto.Cipher import AES
import base64

def add_to_16(par):
    par = par.encode() #先将字符串类型数据转换成字节型数据
    while len(par) % 16 != 0: #对字节型数据进行长度判断
        par += b'\x00' #如果字节型数据长度不是16倍整数就进行 补充
    return par

password = '123456' #秘钥
text = '1' #需要加密的内容
model = AES.MODE_ECB #定义模式
aes = AES.new(add_to_16(password),model) #创建一个aes对象

en_text = aes.encrypt(add_to_16(text)) #加密明文
print(en_text)
en_text = base64.encodebytes(en_text) #将返回的字节型数据转进行base64编码
print(en_text)
en_text = en_text.decode('utf8') #将字节型数据转换成python中的字符串类型
print(en_text.strip())
```

这里简单的说一下几个存在的问题

1. 其实上述代码我简单省略的进行补全到16位，而秘钥24位也是可以的，你可以自己写一个函数来进行秘钥的补全
   
2. 为什么进行补全之前先进行 .encode() ? 首先 encode() 不加参数默认是以 utf8 编码的，另外先进行 encode 的原因是因为怕加密的文本中存在汉字，而汉字的 utf8 编码的字节长度是3（gbk对汉字的编码字节长度是2），所以为了防止补全的位数不正确，这里必须先进行转换（我看到很多别的文章先补全后进行转换的，而且还是拿空格补全的。。。）
   
3. 不知道有没有发现，aes.encrypt() 在第一个程序中我传递的是字符串类型，第二个程序传递的是字节型数据，这个函数其实是既可以传递字符串数据类型也可以传递字节型数据的

上面的程序没有解密函数，所以我对整个加密解密进行了一个类的最终封装

## 最终封装
```python
from Crypto.Cipher import AES
import base64
class aescrypt():
    def __init__(self,key,model,iv,encode_):
        self.encode_ = encode_
        self.model =  {'ECB':AES.MODE_ECB,'CBC':AES.MODE_CBC}[model]
        self.key = self.add_16(key)
        if model == 'ECB':
            self.aes = AES.new(self.key,self.model) #创建一个aes对象
        elif model == 'CBC':
            self.aes = AES.new(self.key,self.model,iv) #创建一个aes对象

        #这里的密钥长度必须是16、24或32，目前16位的就够用了

    def add_16(self,par):
        par = par.encode(self.encode_)
        while len(par) % 16 != 0:
            par += b'\x00'
        return par

    def aesencrypt(self,text):
        text = self.add_16(text)
        self.encrypt_text = self.aes.encrypt(text)
        return base64.encodebytes(self.encrypt_text).decode().strip()

    def aesdecrypt(self,text):
        text = base64.decodebytes(text.encode(self.encode_))
        self.decrypt_text = self.aes.decrypt(text)
        return self.decrypt_text.decode(self.encode_).strip('\0')

if __name__ == '__main__':
    pr = aescrypt('12345','ECB','','gbk')
    en_text = pr.aesencrypt('好好学习')
    print('密文:',en_text)
    print('明文:',pr.aesdecrypt(en_text))
```

时隔多天, 我终于用上了以上的代码然后我发现我的代码是错误的,评论区也有指出

所以我又重新测试发现在ECB模式是没有问题的, 在使用CBC 模式的条件下, 不可以在类的构造函数里面构建 aes对象, 也就是说在CBC模式下 每一次加密和解密 都需要重新构建aes对象 self.aes = AES.new(self.key,self.model,iv), 否则加密和解密的结果就会不一致或者报错

另外就是关于 padding模式方面的问题
* ZeroPadding
* PKCS7Padding
* PKCS5Padding

这几种模式的区别, 我也不从算法方面探讨了, 因为我发现当你用什么补全的时候, 解密回来的字符串里是包含补全使用的字符串的所以代码中用'\x00' 补全是没有问题的, 你用什么补全都可以(这里我用的是python,至于别的语言是不是这样我就不知道了)

最后一个点就是 关于base64编码的问题了,我也不知道这个是不是由于padding 模式区别导致的, 因为有的密文采用的是base64编码, 有点密文采用的是 hexstr编码, 反正无论采用什么编码,在真正加密和解密的时候是绝对会转换成 bytes类型的

所以我最终只做一个只是针对 bytes 的AES加密解密类

## 加密解密类
```python
from Crypto.Cipher import AES
import base64

class Aescrypt():
    def __init__(self,key,model,iv):
        self.key = self.add_16(key)
        self.model = model
        self.iv = iv

    def add_16(self,par):
        if type(par) == str:
            par = par.encode()
        while len(par) % 16 != 0:
            par += b'\x00'
        return par

    def aesencrypt(self,text):
        text = self.add_16(text)
        if self.model == AES.MODE_CBC:
            self.aes = AES.new(self.key,self.model,self.iv) 
        elif self.model == AES.MODE_ECB:
            self.aes = AES.new(self.key,self.model) 
        self.encrypt_text = self.aes.encrypt(text)
        return self.encrypt_text

    def aesdecrypt(self,text):
        if self.model == AES.MODE_CBC:
            self.aes = AES.new(self.key,self.model,self.iv) 
        elif self.model == AES.MODE_ECB:
            self.aes = AES.new(self.key,self.model) 
        self.decrypt_text = self.aes.decrypt(text)
        self.decrypt_text = self.decrypt_text.strip(b"\x00")
        return self.decrypt_text


if __name__ == '__main__':
    passwd = "123456781234567"
    iv = '1234567812345678'

    aescryptor = Aescrypt(passwd,AES.MODE_CBC,iv) # CBC模式
    # aescryptor = Aescrypt(passwd,AES.MODE_ECB,"") # ECB模式
    text = "好好学习"
    en_text = aescryptor.aesencrypt(text)
    print("密文:",en_text)
    text = aescryptor.aesdecrypt(en_text)
    print("明文:",text)
```

上面这段代码 你输入的 所有参数都应该是字符串或者 字节型数据, 并且输出的都是 字节型数据

如果进行一些编码转换可以在类的外部进行完成, 这里我就不写了, 到这里我才真正的明白为什么 python自己不封装一下这个算法, 确实可能的情况太多了, 这样还是比较灵活的。(其实进一步封装也是可以的, 就是判断输入的是base64字符串,还是hexstr,或者bytes, 然后在自定义一下输出,不过我是懒得弄了)

另外附上 base64 编码解码 和 hexstr 编码解码

## 编码解码
```python
import base64
import binascii
data = "hello".encode()
data = base64.b64encode(data)
print("base64编码:",data)
data = base64.b64decode(data)
print("base64解码:",data)
data = binascii.b2a_hex(data)
print("hexstr编码:",data)
data = binascii.a2b_hex(data)
print("hexstr解码:",data)
```

如果你真的认真的读了我的这篇文章, 我相信你肯定解决了你的问题, 如果不是这样可以评论区提出
