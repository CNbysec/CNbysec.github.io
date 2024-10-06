# 逆向分析某网站加速乐Cookie参数流程详解


<!--more-->

> *转载自： [https://juejin.cn/post/7386485874300977178](https://juejin.cn/post/7386485874300977178)*

## 前言

加速乐作为一种常见的反爬虫技术，在网络上已有大量详尽深入的教程可供参考。然而，对于那些初次接触的人来说，直接面对它可能仍会感到困惑。

## 声明

> 本文仅用于学习交流，学习探讨逆向知识，欢迎私信共享学习心得。如有侵权，联系博主删除。请勿商用，否则后果自负。

## 什么是加速乐？

![](https://qqq.gtimg.cn/music/photo_new/T053XD000010CdJ93CHwXA.jpg)

加速乐采用了一系列的高级反爬虫技术，包括OB混淆、动态加密算法和多层Cookie获取，以确保整体校验的严密性。关键校验字段位于Cookie中的`__jsl_clearance_s`。其**验证过程通常涉及三次关键的请求**：

1.  **首次请求**：当用户首次尝试访问目标网站时，服务器会返回一个特殊的521状态码，其响应数据通过AAEncode技术进行混淆处理，以初步筛选访问者。
    
2.  **二次请求**：紧接着的第二次请求中，如果服务器继续检测到可疑行为，它会再次返回521状态码，但这次响应数据将采用更为复杂的OB混淆，进一步验证访问者的身份。
    
3.  **三次请求**：只有在前两次请求成功通过验证后，第三次请求才能成功访问网站，此时服务器将返回正常的状态码200，并提供用户所需的内容。
    

![](https://qqq.gtimg.cn/music/photo_new/T053XD00001spKf70Onvsc.jpg)

通过这一连串精心设计的步骤，加速乐确保了只有合法的访问者能够顺利获取网站数据，从而有效抵御恶意爬虫的侵扰，我们要做的就是模拟这些操作，获取想要的数据。

## 今日网站

目标URL: `aHR0cHM6Ly93d3cuY252ZC5vcmcuY24vZmxhdy90eXBlbGlzdD90eXBlSWQ9Mjc=`

## 流程分析-浏览器

按照常规做法，我们首先进行网络抓包分析。

![](https://qqq.gtimg.cn/music/photo_new/T053XD00004JfmID1VsZLD.jpg)

### 第一次请求

-   `发送`：未携带 Cookie
-   `响应`：状态码`521`，Cookie 中的`__jsluid_s`值和`js`代码

![](https://qqq.gtimg.cn/music/photo_new/T053XD00000K7qZU3ItDc3.jpg)

### 第二次请求

-   `发送`：Cookie 携带`__jsluid_s`和`__jsl_clearance_s`值
-   `响应`：状态码`521`，新的`js`代码

![](https://qqq.gtimg.cn/music/photo_new/T053XD00002oaIvJ2FWXrj.jpg)

### 第三次请求

-   `发送`：Cookie 携带原始`__jsluid_s`值，新的`__jsl_clearance_s`值
-   `响应`：状态码`200`，正文内容

![](https://qqq.gtimg.cn/music/photo_new/T053XD00003CsbsE3mrA5a.jpg)

> 观察结果揭示了对同一页面共发起了三次`HTTP`请求：前两次请求均遭遇了`521`状态码的响应，而最后一次请求成功收到了`200`状态码。这种模式正是加速乐反爬虫机制的显著特征。

## 流程分析-抓包工具

浏览器上我们没能看到具体的响应，我们借助抓包工具试试，这里使用的`Fiddler`。

### 第一次请求

![](https://qqq.gtimg.cn/music/photo_new/T053XD00000bzZ1h0xViso.jpg)

### 第二次请求

![](https://qqq.gtimg.cn/music/photo_new/T053XD00001MlfbN033sPr.jpg)

### 第三次请求

![](https://qqq.gtimg.cn/music/photo_new/T053XD00000fEc7o2dk3Gg.jpg)

> 同样，看到了三次请求的过程，并且向我们展示了具体的响应。

## 逆向分析

### 获取第一个`__jsl_clearance_s`

通过`Fiddler`或使用`python`模拟请求，得到下面这样一段JS代码：

```javascript
<script>document.cookie=('_')+('_')+('j')+('s')+('l')+('_')+('c')+('l')+('e')+('a')+('r')+('a')+('n')+('c')+('e')+('_')+('s')+('=')+(+!+[]+'')+(3+4+'')+(-~false+'')+(2+7+'')+(4+'')+(1+6+'')+(2+'')+((2<<1)+'')+((2)*[2]+'')+(([2]+0>>2)+'')+('.')+(-~1+'')+((2^1)+'')+((1+[2])/[2]+'')+('|')+('-')+((+true)+'')+('|')+('L')+('w')+('j')+(1+2+'')+('u')+('T')+('F')+('n')+(-~{}+'')+('j')+('j')+(~~''+'')+('E')+('t')+(~~false+'')+('g')+('I')+(-~1+'')+('J')+('g')+('i')+('K')+('m')+((1+[2])/[2]+'')+('N')+('f')+((1<<2)+'')+('%')+((1+[2]>>2)+'')+('D')+(';')+(' ')+('M')+('a')+('x')+('-')+('a')+('g')+('e')+('=')+(-~[2]+'')+(-~[5]+'')+((+false)+'')+(~~{}+'')+(';')+(' ')+('P')+('a')+('t')+('h')+('=')+('/')+(';')+(' ')+('S')+('a')+('m')+('e')+('S')+('i')+('t')+('e')+('=')+('N')+('o')+('n')+('e')+(';')+(' ')+('S')+('e')+('c')+('u')+('r')+('e');location.href=location.pathname+location.search</script>
```

复制到浏览器执行下来看看:

![](https://qqq.gtimg.cn/music/photo_new/T053XD000025j1lt05AHCW.jpg)

得到了`__jsl_clearance_s=1719472445.236|-1|Lwj3uTFn1jj0Et0gI2JgiKm6Nf4%3D; Max-age=3600; Path=/; SameSite=None; Secure`。

而`__jsl_clearance_s`正是第二次请求需要带上的Cookie之一。

![](https://qqq.gtimg.cn/music/photo_new/T053XD00001H0vDS2nqE80.jpg)

> 真的老登。为了使代码难以阅读和分析，还进行了`AAEncode`加密混淆。

### 获取第二个`__jsl_clearance_s`

使用第一个请求后得到的 Cookies 继续发起第二段请求得到新的 JS 代码：

![](https://qqq.gtimg.cn/music/photo_new/T053XD00000Y8Qgg2tnsDM.jpg)

代码被压缩了，不是很好看，使用在线 JS 美化（`https://spidertools.cn/#/formatJS`）后：


```javascript
<script>
var _0x4f9d = ['HnJu', 'w4Jow5Ak', 'CCrDq8KX', 'KMOVZMOX', 'MCDDjzg=', 'w553w5PDpw==', 'CsOXbcOX', 'woXChMOAwq0=', 'JsOPXcO+', 'wplFw6JY', 'bX8pwpU=', 'w6fDjkzCmw==', 'woB0wrrDkg==', 'w6HCmMOiZA==', 'GRbCklw=', 'dw03Kw==', 'w47DqcO7Tg==', 'D8ORfwI=', 'GsOCSsOt', 'TjUePw==', 'wpXCnHRJ', 'w4xRw7bDrQ==', 'ScKdwqDDuQ==', 'M1hDwrQ=', 'woLCusOhwos=', 'eFZBw70=', 'w7XDocKsdA==', 'CDfDjkM=', 'w6czWcK8', 'X1gqwrc=', 'wr/DoDvDig==', 'flHDuAg=', 'HBbDjMKL', 'QFLCpcOi', 'I8OBccOM', 'w6Amw4nClQ==', 'PEHCoDg=', 'w5RYworDrg==', 'w4Z/wqHDnQ==', 'OifDgDc=', 'HWxlwpk=', 'aX7DnQU=', 'w73DtcOnwoQ=', 'YmHCncOD', 'WXw5wp0=', 'P1bCosKl', 'wpzCj8OrwrQ=', 'w4QGw6nDsQ==', 'a8KswrvDkw==', 'ACzDmH0=', 'wonDl8OtwrM=', 'JWVbwq0=', 'Z3YdwpQ=', 'CGjCgsKx', 'w5MaPMO3', 'w5sgLMOT', 'IlPCtX4=', 'w6rDl8OUUA==', 'w4TDksODWw==', 'wqLDuCLDlA==', 'w6LDksOOVg==', 'Vxcwwp0=', 'w5rCv8KcKw==', 'ccKSCsK7', 'am5Xw5c=', 'w78Jw6nDpQ==', 'KUPCqsKQ', 'w53CjcKHAA==', 'w7HCncK4NA==', 'wrnCt8OZwoQ=', 'wpMfwpXCjQ==', 'w5AIBsOT', 'w5fDs1jCjw==', 'w5RDw7Mz', 'wrwkwqbCqg==', 'w4V6wrXDhw==', 'GCrDvA==', 'wqfDkMOWw4U=', 'Gx3DksKo', 'w6c6bcKE', 'EwDDuwk=', 'ehvCh20=', 'w6tUw5TCkw==', 'w4tHw6/Dhg==', 'GMKZw7HDsg==', 'w5MCAMO3', 'w7hSw6nDgA==', 'w7TDlcOLwqI=', 'w602a8K6', 'w7p9w7wu', 'wrkuw6w4', 'w6tJw5PCmw==', 'fljDpBs=', 'w6DDq8KYSg==', 'LGHCv8Kd', 'enbCtXQ=', '6K2i5rGm6aia6K6c', 'w4gCAsO7', 'PsOrYgI=', 'cDIrNA==', 'w7PCghEU', 'wrsTw5XClQ==', 'wpQKw4Yq', 'DQDDiRI=', 'w67DtMOmwrU=', 'DmjCiMKk', 'XcKBwpnDow==', 'wqk0HMO0', 'w4Y7w6XDsw==', 'wrjDtCDDhA==', 'woDDoQvDgg==', 'wo06wrjCvA==', 'w5JewoHDiQ==', 'NkLCpcK6', 'wrLCuHpi', 'YHo6wpo=', 'w7vCosK+w7c=', 'w4NMw5sw', 'wpY1woXCiQ==', 'wqsMwoTCoA==', 'w5dMwpzDtQ==', 'w4J1w4vCqw==', 'w4HCoMOVVA==', 'w7zCo8Kww50=', 'wp/CmURc', 'w7dKw7IW', 'w7IbwqI=', 'wrDCjMOYwqs=', 'al3CicOl', 'w5LCosOcQg==', 'J8OIZMOR', 'w4HDssKjfQ==', 'w5ZJworDiA==', 'w4wBacKd', 'JBzDnBA=', 'wohaw6zDgg==', 'w6VAw7oT', 'w5zCpMKdw6c=', 'aBUWPg==', 'w5zDsMOfVQ==', 'w7dtwofDjQ==', 'wrvDphrDoA==', 'wqYnwqpC', 'OzzDnyw=', 'w7LCnsK7wr4=', 'w70pw77DiA==', 'wq98w5xQ', 'Ah3Cl1w=', 'wrZ4w73DgQ==', 'IsOjX8Ou', 'enFMw7o=', 'w53DpcKPYg==', 'w7J9wq3DlQ==', 'E8OMf8OC', 'aR4hwpY=', 'NTLDiTA=', 'BMOvbCA=', 'Z20pwoE=', 'wpZxw5BY', 'YFjDoSA=', 'w43DosOpfw==', 'w7xJw4c6', 'wrjCn1J4', 'wrPCs21R', 'w5dfw6fCmg==', 'bcKwwoXDjw==', 'B3FowpY=', 'WWdaw5I=', 'wq14w4Re', 'KFnCucKe', 'w6M4fcKm', 'dH9pw5A=', 'woLDjMOiw5g=', 'J0bCug==', 'E17CqMK8', 'w4FWw4fDhw==', 'FxDDhj0=', 'w4vDr8OgwqU=', 'w4JNwrjDoA==', 'wqgQAMOj', 'w6l3wqnDlw==', 'wowfRcOi', 'JTPChG4=', 'w5PDosOrwro=', 'wqIwBsO8', 'CSbDrEg=', 'enQh', 'O8KwLsOX', 'w4pTw4/Ckw==', 'wozDu8OYw78=', 'ASTCgG4=', 'w6sLO8Oz', 'w7vCrSwy', 'FVrCqMK9', 'w5R4w4TCtw==', 'IsOPacOw', 'w5HDh8O0WA==', 'woUbwp/Djw==', 'wpIcw5wZ', 'BcOybcOO', 'E8KVw4DDmA==', 'cBQpwr0=', 'wqzCh8OlwqU=', 'V2JMw7I=', 'w5Bjw643', 'w6ciw73Cjw==', 'LMOFcsOH', 'XMK2wpfDjw==', 'fEjDnj0=', 'AMOZQ8OI', 'MwHDgcKB', 'w6NzwpnDnA==', 'LzHDgcKW', 'I8OaSzE=', 'wqADw5DCpA==', 'wofDnsOjw70=', 'wqDCnFhW', 'w5rDrMONXA==', 'w4FQw5g8', 'w4tTw6LDog==', 'w6JEw4rDjg==', 'w4hcwo3DtQ==', 'QmbCpMO+', 'QxYQwqI=', 'cEdFw70=', 'AHHCgMKp', 'J8OPasOI', 'PQfDisKg', 'UsKwwpzDrg==', 'KGjCokI=', 'cMK3wpbCkQ==', 'wos+McOC', 'QWFPw60=', 'w7fDjV7CnQ==', 'w77Dk8KeSQ==', 'C8OQSMOh', 'w6PCtTkN', 'w6MWX8KP', 'EsOMZMOM', 'CBrDuz0=', 'w7vCk8K9w78=', 'K8OedsOl', 'w4jDssOQwpw=', 'wqrCgMOewoU=', 'woVRw4Vg', 'w6gJw4/Dow==', 'NgXDocKq', 'wqjCusODwro=']; (function(_0x19121c, _0x4f9dfd) {
    var _0x242e7e = function(_0x1234f2) {
        while (--_0x1234f2) {
            _0x19121c['push'](_0x19121c['shift']());
        }
    };
    _0x242e7e(++_0x4f9dfd);
} (_0x4f9d, 0xcd));
var _0x242e = function(_0x19121c, _0x4f9dfd) {
    _0x19121c = _0x19121c - 0x0;
    var _0x242e7e = _0x4f9d[_0x19121c];
    if (_0x242e['pWhajf'] === undefined) { (function() {
            var _0x374e37 = function() {
                var _0xc24bb1;
                try {
                    _0xc24bb1 = Function('return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');')();
                } catch(_0x35be13) {
                    _0xc24bb1 = window;
                }
                return _0xc24bb1;
            };
            var _0x2bf576 = _0x374e37();
            var _0x111317 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            _0x2bf576['atob'] || (_0x2bf576['atob'] = function(_0x5dde13) {
                var _0x5c7399 = String(_0x5dde13)['replace'](/=+$/, '');
                var _0x35f834 = '';
                for (var _0xe67248 = 0x0,
                _0x1996e0, _0x168349, _0xa49425 = 0x0; _0x168349 = _0x5c7399['charAt'](_0xa49425++);~_0x168349 && (_0x1996e0 = _0xe67248 % 0x4 ? _0x1996e0 * 0x40 + _0x168349: _0x168349, _0xe67248++%0x4) ? _0x35f834 += String['fromCharCode'](0xff & _0x1996e0 >> ( - 0x2 * _0xe67248 & 0x6)) : 0x0) {
                    _0x168349 = _0x111317['indexOf'](_0x168349);
                }
                return _0x35f834;
            });
        } ());
        var _0x14331d = function(_0x26a509, _0x5f3346) {
            var _0x158793 = [],
            _0x2049e9 = 0x0,
            _0x34a13f,
            _0xaa79eb = '',
            _0x47bb36 = '';
            _0x26a509 = atob(_0x26a509);
            for (var _0x3e208d = 0x0,
            _0x538c1c = _0x26a509['length']; _0x3e208d < _0x538c1c; _0x3e208d++) {
                _0x47bb36 += '%' + ('00' + _0x26a509['charCodeAt'](_0x3e208d)['toString'](0x10))['slice']( - 0x2);
            }
            _0x26a509 = decodeURIComponent(_0x47bb36);
            var _0x120653;
            for (_0x120653 = 0x0; _0x120653 < 0x100; _0x120653++) {
                _0x158793[_0x120653] = _0x120653;
            }
            for (_0x120653 = 0x0; _0x120653 < 0x100; _0x120653++) {
                _0x2049e9 = (_0x2049e9 + _0x158793[_0x120653] + _0x5f3346['charCodeAt'](_0x120653 % _0x5f3346['length'])) % 0x100;
                _0x34a13f = _0x158793[_0x120653];
                _0x158793[_0x120653] = _0x158793[_0x2049e9];
                _0x158793[_0x2049e9] = _0x34a13f;
            }
            _0x120653 = 0x0;
            _0x2049e9 = 0x0;
            for (var _0x1e954f = 0x0; _0x1e954f < _0x26a509['length']; _0x1e954f++) {
                _0x120653 = (_0x120653 + 0x1) % 0x100;
                _0x2049e9 = (_0x2049e9 + _0x158793[_0x120653]) % 0x100;
                _0x34a13f = _0x158793[_0x120653];
                _0x158793[_0x120653] = _0x158793[_0x2049e9];
                _0x158793[_0x2049e9] = _0x34a13f;
                _0xaa79eb += String['fromCharCode'](_0x26a509['charCodeAt'](_0x1e954f) ^ _0x158793[(_0x158793[_0x120653] + _0x158793[_0x2049e9]) % 0x100]);
            }
            return _0xaa79eb;
        };
        _0x242e['lzYmSp'] = _0x14331d;
        _0x242e['NOKXUN'] = {};
        _0x242e['pWhajf'] = !![];
    }
    var _0x1234f2 = _0x242e['NOKXUN'][_0x19121c];
    if (_0x1234f2 === undefined) {
        if (_0x242e['aAdNqk'] === undefined) {
            _0x242e['aAdNqk'] = !![];
        }
        _0x242e7e = _0x242e['lzYmSp'](_0x242e7e, _0x4f9dfd);
        _0x242e['NOKXUN'][_0x19121c] = _0x242e7e;
    } else {
        _0x242e7e = _0x1234f2;
    }
    return _0x242e7e;
};
function hash(_0x9060ec) {
    var _0x56d93e = {};
    _0x56d93e[_0x242e('0x88', '[dwE') + 'B'] = function(_0x56d31c, _0x4684c2) {
        return _0x56d31c ^ _0x4684c2;
    };
    _0x56d93e[_0x242e('0x98', 'KLsb') + 'K'] = function(_0x5d1cb4, _0x4fec97) {
        return _0x5d1cb4 + _0x4fec97;
    };
    _0x56d93e[_0x242e('0xc9', 'RdUn') + 'Q'] = function(_0x2830f5, _0x3115ee) {
        return _0x2830f5 & _0x3115ee;
    };
    _0x56d93e[_0x242e('0x1a', 'wJXr') + 'C'] = _0x242e('0x37', '7MeK') + _0x242e('0x6a', 'WiN!') + _0x242e('0x59', '44!c') + _0x242e('0x35', '2kzu');
    _0x56d93e[_0x242e('0x27', 'RdUn') + 'E'] = function(_0x1c9897, _0x45d164) {
        return _0x1c9897 >= _0x45d164;
    };
    _0x56d93e[_0x242e('0xb7', 'jz(8') + 'T'] = function(_0x421f06, _0xd55dd2) {
        return _0x421f06 & _0xd55dd2;
    };
    _0x56d93e[_0x242e('0x6e', 'DKxx') + 'u'] = function(_0x5f14e3, _0xaa1ce0) {
        return _0x5f14e3 >> _0xaa1ce0;
    };
    _0x56d93e[_0x242e('0x5f', '2kzu') + 'W'] = function(_0x1ee44a, _0x35783f) {
        return _0x1ee44a * _0x35783f;
    };
    _0x56d93e[_0x242e('0x34', 'RdUn') + 'a'] = function(_0x46b7f1, _0x4a20e5) {
        return _0x46b7f1 < _0x4a20e5;
    };
    _0x56d93e[_0x242e('0x73', '[qVg') + 'h'] = function(_0x14dcd2, _0x4d9d4d) {
        return _0x14dcd2 !== _0x4d9d4d;
    };
    _0x56d93e[_0x242e('0x7a', 'Yn#o') + 'd'] = _0x242e('0x65', '39wR') + 'o';
    _0x56d93e[_0x242e('0xca', 'rz@b') + 'g'] = _0x242e('0x2a', 'AddD') + 'K';
    _0x56d93e[_0x242e('0xcf', '!N%0') + 'j'] = function(_0x48605d, _0x1898d3) {
        return _0x48605d - _0x1898d3;
    };
    _0x56d93e[_0x242e('0xa4', '!N%0') + 'F'] = function(_0x4f09e6, _0x375fb6) {
        return _0x4f09e6 - _0x375fb6;
    };
    _0x56d93e[_0x242e('0xc6', 'eW8B') + 'o'] = function(_0x34eb93, _0x375f04) {
        return _0x34eb93 * _0x375f04;
    };
    _0x56d93e[_0x242e('0x36', '[qVg') + 'c'] = function(_0xc255e4, _0x218981) {
        return _0xc255e4 * _0x218981;
    };
    _0x56d93e[_0x242e('0xe8', 'H^(H') + 'q'] = function(_0x9d26e0, _0x2d6674) {
        return _0x9d26e0 | _0x2d6674;
    };
    _0x56d93e[_0x242e('0xd', 'hT&#') + 'E'] = function(_0x4cbd01, _0x9c0bce) {
        return _0x4cbd01 << _0x9c0bce;
    };
    _0x56d93e[_0x242e('0x75', ')XYN') + 'x'] = function(_0x3ca860, _0x5ee768) {
        return _0x3ca860 | _0x5ee768;
    };
    _0x56d93e[_0x242e('0x53', '1PiT') + 'G'] = function(_0x4b0507, _0x3f9adb) {
        return _0x4b0507 & _0x3f9adb;
    };
    _0x56d93e[_0x242e('0x16', 'Pp)R') + 'k'] = function(_0x3c8b1e, _0x4fbeaf) {
        return _0x3c8b1e & _0x4fbeaf;
    };
    _0x56d93e[_0x242e('0x72', 'j6$e') + 'l'] = function(_0x3ec1c7, _0x33dc54) {
        return _0x3ec1c7 ^ _0x33dc54;
    };
    _0x56d93e[_0x242e('0xab', 'qXw7') + 'j'] = function(_0x1089f8, _0x5c87d7) {
        return _0x1089f8 < _0x5c87d7;
    };
    _0x56d93e[_0x242e('0xcd', ']jDr') + 'C'] = _0x242e('0x4f', 'rz@b') + _0x242e('0xbb', 'AddD') + _0x242e('0xe0', 'j6$e') + '5';
    _0x56d93e[_0x242e('0xb3', 'hT&#') + 'd'] = function(_0x5d7b90, _0x5a425c) {
        return _0x5d7b90 + _0x5a425c;
    };
    _0x56d93e[_0x242e('0x95', 'VSWp') + 'P'] = function(_0x4ecbb1, _0x53410a) {
        return _0x4ecbb1 - _0x53410a;
    };
    _0x56d93e[_0x242e('0x71', ')XYN') + 'N'] = function(_0x52aafa, _0x29ddaa, _0x27522a) {
        return _0x52aafa(_0x29ddaa, _0x27522a);
    };
    _0x56d93e[_0x242e('0xda', 'PS*t') + 'k'] = function(_0x7809d0, _0x5470e7, _0x3312f0, _0x4a0ff2, _0x34e1b9) {
        return _0x7809d0(_0x5470e7, _0x3312f0, _0x4a0ff2, _0x34e1b9);
    };
    _0x56d93e[_0x242e('0x0', '7MeK') + 'l'] = function(_0x58f83b, _0x500050, _0x1a3df5) {
        return _0x58f83b(_0x500050, _0x1a3df5);
    };
    _0x56d93e[_0x242e('0xbc', '3QwA') + 'C'] = function(_0x237547, _0x4808d4) {
        return _0x237547(_0x4808d4);
    };
    _0x56d93e[_0x242e('0x31', 'aHP2') + 'K'] = function(_0x31c20b, _0x3f038b) {
        return _0x31c20b + _0x3f038b;
    };
    _0x56d93e[_0x242e('0xa8', 'hT&#') + 'm'] = function(_0x34b50e, _0x1f9c07) {
        return _0x34b50e + _0x1f9c07;
    };
    _0x56d93e[_0x242e('0xdb', 'eW8B') + 'a'] = function(_0xe4008c, _0x52ab0f) {
        return _0xe4008c + _0x52ab0f;
    };
    _0x56d93e[_0x242e('0x9', 'MDGM') + 'O'] = function(_0x1ac25e, _0x58fd99) {
        return _0x1ac25e(_0x58fd99);
    };
    _0x56d93e[_0x242e('0x25', '44!c') + 't'] = function(_0x18d6d6, _0xef41e4) {
        return _0x18d6d6(_0xef41e4);
    };
    var _0x5aa388 = _0x56d93e;
    function _0x4f2105(_0x548e11, _0xd6f7ee) {
        return _0x5aa388[_0x242e('0xd9', 'i!)c') + 'B'](_0x5aa388[_0x242e('0x61', 'j6$e') + 'K'](_0x548e11 & 0x7fffffff, _0x5aa388[_0x242e('0xc4', 'r^7h') + 'Q'](_0xd6f7ee, 0x7fffffff)), _0x548e11 & 0x80000000) ^ _0xd6f7ee & 0x80000000;
    }
    function _0x47bf39(_0x1f2dca) {
        var _0x3be7c6 = _0x5aa388[_0x242e('0x78', 'H^(H') + 'C'];
        var _0x403cd2 = '';
        for (var _0x49d9bb = 0x7; _0x5aa388[_0x242e('0x9d', ']jDr') + 'E'](_0x49d9bb, 0x0); _0x49d9bb--) {
            _0x403cd2 += _0x3be7c6[_0x242e('0x3f', ']jDr') + 'At'](_0x5aa388[_0x242e('0x8d', '411^') + 'T'](_0x1f2dca >> _0x49d9bb * 0x4, 0xf));
        }
        return _0x403cd2;
    }
    function _0x374691(_0x3431f4) {
        var _0x2277fb = _0x5aa388[_0x242e('0x24', 'WiN!') + 'K'](_0x5aa388[_0x242e('0x89', 'i!)c') + 'u'](_0x3431f4[_0x242e('0xf5', 'AddD') + 'th'] + 0x8, 0x6), 0x1),
        _0x4c0e2f = new Array(_0x5aa388[_0x242e('0x49', 'KLsb') + 'W'](_0x2277fb, 0x10));
        for (var _0x30af97 = 0x0; _0x5aa388[_0x242e('0x42', '1PiT') + 'a'](_0x30af97, _0x5aa388[_0x242e('0xcc', 'hT&#') + 'W'](_0x2277fb, 0x10)); _0x30af97++) {
            if (_0x5aa388[_0x242e('0x6c', '3QwA') + 'h'](_0x5aa388[_0x242e('0x6', 'jz(8') + 'd'], _0x5aa388[_0x242e('0x1', 'r^7h') + 'g'])) {
                _0x4c0e2f[_0x30af97] = 0x0;
            } else {
                return;
            }
        }
        for (_0x30af97 = 0x0; _0x30af97 < _0x3431f4[_0x242e('0xf5', 'AddD') + 'th']; _0x30af97++) {
            _0x4c0e2f[_0x30af97 >> 0x2] |= _0x3431f4[_0x242e('0x33', 'WiN!') + _0x242e('0x2', 'VSWp') + 'At'](_0x30af97) << _0x5aa388[_0x242e('0x8e', '43s2') + 'j'](0x18, (_0x30af97 & 0x3) * 0x8);
        }
        _0x4c0e2f[_0x5aa388[_0x242e('0x18', ')rVG') + 'u'](_0x30af97, 0x2)] |= 0x80 << _0x5aa388[_0x242e('0xee', 'aHP2') + 'F'](0x18, _0x5aa388[_0x242e('0xa7', ']jDr') + 'W'](_0x30af97 & 0x3, 0x8));
        _0x4c0e2f[_0x5aa388[_0x242e('0x83', 'Yn#o') + 'o'](_0x2277fb, 0x10) - 0x1] = _0x5aa388[_0x242e('0x91', 'nRBj') + 'c'](_0x3431f4[_0x242e('0x96', 'wJXr') + 'th'], 0x8);
        return _0x4c0e2f;
    }
    function _0x4b3f91(_0x5b9026, _0x3ad37a) {
        return _0x5aa388[_0x242e('0x8f', '55Fp') + 'q'](_0x5aa388[_0x242e('0xef', '39wR') + 'E'](_0x5b9026, _0x3ad37a), _0x5b9026 >>> 0x20 - _0x3ad37a);
    }
    function _0x1a51fe(_0x146005, _0x208eab, _0x37ebce, _0x2300eb) {
        if (_0x146005 < 0x14) return _0x5aa388[_0x242e('0xd6', 'PA1n') + 'x'](_0x5aa388[_0x242e('0x7f', 'D7Ie') + 'T'](_0x208eab, _0x37ebce), _0x5aa388[_0x242e('0xed', '!N%0') + 'T'](~_0x208eab, _0x2300eb));
        if (_0x5aa388[_0x242e('0xf3', 'D7Ie') + 'a'](_0x146005, 0x28)) return _0x5aa388[_0x242e('0x21', 'r^7h') + 'B'](_0x208eab ^ _0x37ebce, _0x2300eb);
        if (_0x5aa388[_0x242e('0xac', 'yL5p') + 'a'](_0x146005, 0x3c)) return _0x5aa388[_0x242e('0x29', 'Pp)R') + 'x'](_0x208eab & _0x37ebce | _0x5aa388[_0x242e('0x4a', 'rz@b') + 'G'](_0x208eab, _0x2300eb), _0x5aa388[_0x242e('0x17', 'VSWp') + 'k'](_0x37ebce, _0x2300eb));
        return _0x5aa388[_0x242e('0x99', 'KLsb') + 'B'](_0x5aa388[_0x242e('0xd4', 'i!)c') + 'l'](_0x208eab, _0x37ebce), _0x2300eb);
    }
    function _0x5657a6(_0x2b076a) {
        return _0x2b076a < 0x14 ? 0x5a827999: _0x2b076a < 0x28 ? 0x6ed9eba1: _0x5aa388[_0x242e('0x3b', '39wR') + 'j'](_0x2b076a, 0x3c) ? -0x70e44324: -0x359d3e2a;
    }
    var _0x433d77 = _0x374691(_0x9060ec);
    var _0x1520f3 = new Array(0x50);
    var _0x236556 = 0x67452301;
    var _0x126bca = -0x10325477;
    var _0x3ca08c = -0x67452302;
    var _0x1ad745 = 0x10325476;
    var _0x3d4ab1 = -0x3c2d1e10;
    for (var _0x52e4f0 = 0x0; _0x52e4f0 < _0x433d77[_0x242e('0xf5', 'AddD') + 'th']; _0x52e4f0 += 0x10) {
        var _0x5d6482 = _0x236556;
        var _0x1bdba3 = _0x126bca;
        var _0x256655 = _0x3ca08c;
        var _0xaf9465 = _0x1ad745;
        var _0x35abf5 = _0x3d4ab1;
        for (var _0x57665f = 0x0; _0x5aa388[_0x242e('0xa5', 'yL5p') + 'j'](_0x57665f, 0x50); _0x57665f++) {
            var _0x286672 = _0x5aa388[_0x242e('0xcd', ']jDr') + 'C'][_0x242e('0x9c', 'i!)c') + 't']('|');
            var _0x5a7dcc = 0x0;
            while ( !! []) {
                switch (_0x286672[_0x5a7dcc++]) {
                case '0':
                    _0x1ad745 = _0x3ca08c;
                    continue;
                case '1':
                    _0x3ca08c = _0x4b3f91(_0x126bca, 0x1e);
                    continue;
                case '2':
                    _0x3d4ab1 = _0x1ad745;
                    continue;
                case '3':
                    _0x126bca = _0x236556;
                    continue;
                case '4':
                    if (_0x5aa388[_0x242e('0x94', 'i!)c') + 'j'](_0x57665f, 0x10)) {
                        _0x1520f3[_0x57665f] = _0x433d77[_0x5aa388[_0x242e('0xf4', '0Q5u') + 'd'](_0x52e4f0, _0x57665f)];
                    } else {
                        _0x1520f3[_0x57665f] = _0x4b3f91(_0x5aa388[_0x242e('0xb8', 'KLsb') + 'l'](_0x5aa388[_0x242e('0xeb', '55Fp') + 'l'](_0x1520f3[_0x5aa388[_0x242e('0x43', 'AddD') + 'P'](_0x57665f, 0x3)], _0x1520f3[_0x57665f - 0x8]), _0x1520f3[_0x57665f - 0xe]) ^ _0x1520f3[_0x57665f - 0x10], 0x1);
                    }
                    continue;
                case '5':
                    _0x236556 = t;
                    continue;
                case '6':
                    t = _0x5aa388[_0x242e('0xc7', '411^') + 'N'](_0x4f2105, _0x4f2105(_0x4b3f91(_0x236556, 0x5), _0x5aa388[_0x242e('0xdd', 'jz(8') + 'k'](_0x1a51fe, _0x57665f, _0x126bca, _0x3ca08c, _0x1ad745)), _0x5aa388[_0x242e('0x0', '7MeK') + 'l'](_0x4f2105, _0x4f2105(_0x3d4ab1, _0x1520f3[_0x57665f]), _0x5aa388[_0x242e('0x6b', 'PA1n') + 'C'](_0x5657a6, _0x57665f)));
                    continue;
                }
                break;
            }
        }
        _0x236556 = _0x4f2105(_0x236556, _0x5d6482);
        _0x126bca = _0x5aa388[_0x242e('0x68', '0Q5u') + 'l'](_0x4f2105, _0x126bca, _0x1bdba3);
        _0x3ca08c = _0x5aa388[_0x242e('0x57', '2kzu') + 'l'](_0x4f2105, _0x3ca08c, _0x256655);
        _0x1ad745 = _0x4f2105(_0x1ad745, _0xaf9465);
        _0x3d4ab1 = _0x4f2105(_0x3d4ab1, _0x35abf5);
    }
    return _0x5aa388[_0x242e('0xa6', 'Tycz') + 'd'](_0x5aa388[_0x242e('0xde', 'wJXr') + 'K'](_0x5aa388[_0x242e('0x3c', '411^') + 'm'](_0x5aa388[_0x242e('0x64', '39wR') + 'a'](_0x47bf39(_0x236556), _0x47bf39(_0x126bca)), _0x5aa388[_0x242e('0x52', 'eW8B') + 'O'](_0x47bf39, _0x3ca08c)), _0x5aa388[_0x242e('0x13', 'PA1n') + 'O'](_0x47bf39, _0x1ad745)), _0x5aa388[_0x242e('0x25', '44!c') + 't'](_0x47bf39, _0x3d4ab1));
}
function go(_0x184054) {
    var _0x31f079 = {};
    _0x31f079[_0x242e('0x1d', '[dwE') + 'P'] = function(_0x452ac7, _0x2c31df) {
        return _0x452ac7 & _0x2c31df;
    };
    _0x31f079[_0x242e('0xae', '[dwE') + 'E'] = _0x242e('0xec', 'i!)c') + _0x242e('0xe5', '2kzu');
    _0x31f079[_0x242e('0x6f', 'DKxx') + 'X'] = _0x242e('0xbe', 'Gy!E') + 't';
    _0x31f079[_0x242e('0x2d', 'Pp)R') + 'X'] = function(_0x1e7715, _0x42f94d) {
        return _0x1e7715 != _0x42f94d;
    };
    _0x31f079[_0x242e('0x39', 'Gy!E') + 'p'] = function(_0x5237c4, _0x34490d) {
        return _0x5237c4 < _0x34490d;
    };
    _0x31f079[_0x242e('0xe2', '44!c') + 'c'] = function(_0x4de569, _0x5e1676) {
        return _0x4de569 + _0x5e1676;
    };
    _0x31f079[_0x242e('0x8', '411^') + 'B'] = function(_0x5c9ddf, _0x3be927) {
        return _0x5c9ddf == _0x3be927;
    };
    _0x31f079[_0x242e('0xa0', 'hT&#') + 'a'] = function(_0x2644c1, _0x2c9288) {
        return _0x2644c1(_0x2c9288);
    };
    _0x31f079[_0x242e('0x45', '[dwE') + 'H'] = function(_0x5c261e, _0x201d18) {
        return _0x5c261e - _0x201d18;
    };
    _0x31f079[_0x242e('0xe9', 'Gy!E') + 'P'] = function(_0xe00d2c, _0x12168d) {
        return _0xe00d2c >> _0x12168d;
    };
    _0x31f079[_0x242e('0x26', 'AddD') + 'W'] = function(_0x51377a, _0x231f39) {
        return _0x51377a << _0x231f39;
    };
    _0x31f079[_0x242e('0xf7', 'hT&#') + 'g'] = function(_0x42b60a, _0x253e51) {
        return _0x42b60a * _0x253e51;
    };
    _0x31f079[_0x242e('0xd5', 'Yn#o') + 'i'] = function(_0x31a3e5, _0x2453b2) {
        return _0x31a3e5 * _0x2453b2;
    };
    _0x31f079[_0x242e('0x1c', '[qVg') + 'w'] = function(_0x446dcd, _0x289ed3) {
        return _0x446dcd * _0x289ed3;
    };
    _0x31f079[_0x242e('0xe1', 'Gy!E') + 'D'] = function(_0x1e9d73, _0x21471f) {
        return _0x1e9d73 < _0x21471f;
    };
    _0x31f079[_0x242e('0xc2', '[dwE') + 'x'] = function(_0x304ebb, _0x13e93d) {
        return _0x304ebb + _0x13e93d;
    };
    _0x31f079[_0x242e('0x6d', 'i!)c') + 'j'] = function(_0x378d98, _0x30258d, _0xda91dd) {
        return _0x378d98(_0x30258d, _0xda91dd);
    };
    _0x31f079[_0x242e('0x84', 'hT&#') + 'K'] = function(_0x4145d0, _0x3bcedc) {
        return _0x4145d0 ^ _0x3bcedc;
    };
    _0x31f079[_0x242e('0x4b', 'Pp)R') + 'G'] = function(_0x3173fc, _0x2c1292, _0x527db0, _0xf67ba3, _0x1f1fd9) {
        return _0x3173fc(_0x2c1292, _0x527db0, _0xf67ba3, _0x1f1fd9);
    };
    _0x31f079[_0x242e('0x79', 'Pp)R') + 'q'] = function(_0x25b14e, _0x93a26d, _0xaa31ce) {
        return _0x25b14e(_0x93a26d, _0xaa31ce);
    };
    _0x31f079[_0x242e('0x85', 'nRBj') + 'X'] = _0x242e('0xc3', 'jz(8') + 'O';
    _0x31f079[_0x242e('0x44', 'PA1n') + 'L'] = function(_0x57cac9, _0x165c8b) {
        return _0x57cac9 + _0x165c8b;
    };
    _0x31f079[_0x242e('0xf', 'PS*t') + 'd'] = function(_0x1548f1, _0x29409c) {
        return _0x1548f1 + _0x29409c;
    };
    _0x31f079[_0x242e('0xbf', 'Ix8t') + 'e'] = _0x242e('0x8a', ')rVG') + _0x242e('0x5d', '44!c') + '=';
    _0x31f079[_0x242e('0x48', '2kzu') + 'O'] = _0x242e('0x7c', ')rVG') + _0x242e('0x92', 'SYI1') + _0x242e('0xa1', 'MDGM') + _0x242e('0x19', 'VSWp') + _0x242e('0xb9', 'J5v&') + _0x242e('0x2b', '1PiT');
    _0x31f079[_0x242e('0x28', '3QwA') + 'd'] = function(_0x138877) {
        return _0x138877();
    };
    _0x31f079[_0x242e('0x4c', 'qXw7') + 'o'] = function(_0x25fafc, _0x24a0eb) {
        return _0x25fafc > _0x24a0eb;
    };
    _0x31f079[_0x242e('0x22', 'eW8B') + 'o'] = function(_0x49f4b8, _0x249bd5) {
        return _0x49f4b8(_0x249bd5);
    };
    _0x31f079[_0x242e('0x90', 'MDGM') + 'R'] = _0x242e('0x54', 'rz@b') + 'W';
    _0x31f079[_0x242e('0x70', 'AddD') + 'e'] = function(_0x2d86b3, _0x3fd9f5, _0x2a10b1) {
        return _0x2d86b3(_0x3fd9f5, _0x2a10b1);
    };
    var _0x4fc376 = _0x31f079;
    function _0x1ec4b0() {
        var _0x5eddfd = {};
        _0x5eddfd[_0x242e('0xc0', 'r^7h') + 'B'] = function(_0x22bb38, _0x4f7790) {
            return _0x22bb38 < _0x4f7790;
        };
        _0x5eddfd[_0x242e('0x4', 'r^7h') + 'i'] = function(_0x25e576, _0x5b83ab) {
            return _0x25e576 | _0x5b83ab;
        };
        _0x5eddfd[_0x242e('0x2c', 'hT&#') + 'G'] = function(_0x3b5665, _0x21aca2) {
            return _0x4fc376[_0x242e('0x2f', 'eW8B') + 'P'](_0x3b5665, _0x21aca2);
        };
        _0x5eddfd[_0x242e('0x3', 'rz@b') + 'V'] = function(_0x2ba1d4, _0x3147c5) {
            return _0x2ba1d4 ^ _0x3147c5;
        };
        var _0x2b2de4 = _0x5eddfd;
        var _0x3646eb = window[_0x242e('0xbd', 'RdUn') + _0x242e('0x4d', 'r^7h') + 'r'][_0x242e('0x1f', '55Fp') + _0x242e('0x74', 'hT&#') + 't'],
        _0x5e1c0f = [_0x4fc376[_0x242e('0x9a', ')XYN') + 'E']];
        for (var _0x29f991 = 0x0; _0x29f991 < _0x5e1c0f[_0x242e('0xf5', 'AddD') + 'th']; _0x29f991++) {
            if (_0x4fc376[_0x242e('0x14', 'i!)c') + 'X'] === _0x242e('0xbe', 'Gy!E') + 't') {
                if (_0x4fc376[_0x242e('0x51', 'ZMon') + 'X'](_0x3646eb[_0x242e('0xc5', '0Q5u') + _0x242e('0x77', 'SYI1')](_0x5e1c0f[_0x29f991]), -0x1)) {
                    return !! [];
                }
            } else {
                if (_0x2b2de4[_0x242e('0x62', 'j6$e') + 'B'](_0x4e5f24, 0x14)) return _0x2b2de4[_0x242e('0xb1', 'SYI1') + 'i'](b & c, _0x2b2de4[_0x242e('0x3a', '43s2') + 'G'](~b, d));
                if (_0x4e5f24 < 0x28) return b ^ c ^ d;
                if (_0x4e5f24 < 0x3c) return b & c | b & d | _0x2b2de4[_0x242e('0xdf', 'ZMon') + 'G'](c, d);
                return _0x2b2de4[_0x242e('0x5b', 'VSWp') + 'V'](_0x2b2de4[_0x242e('0x66', 'KLsb') + 'V'](b, c), d);
            }
        }
        if (window[_0x242e('0x11', 'qXw7') + _0x242e('0xec', 'i!)c') + _0x242e('0xa9', 'J5v&')] || window[_0x242e('0x81', 'PS*t') + _0x242e('0x3e', '43s2')] || window[_0x242e('0xc1', 'PA1n') + _0x242e('0x10', 'jz(8')] || window[_0x242e('0xa', 'H^(H') + _0x242e('0xb2', 'Ix8t') + 'r'][_0x242e('0x9f', 'Tycz') + _0x242e('0xd0', 'VSWp') + 'r'] || window[_0x242e('0x80', 'j6$e') + _0x242e('0xe3', 'wJXr') + 'r'][_0x242e('0x7', 'Pp)R') + _0x242e('0xc8', '2kzu') + _0x242e('0x3d', 'WiN!') + _0x242e('0x2e', 'r^7h') + 'e'] || window[_0x242e('0x9e', '2kzu') + _0x242e('0x67', '39wR') + 'r'][_0x242e('0xc', '39wR') + _0x242e('0xf2', 'aHP2') + _0x242e('0x87', 'rz@b') + _0x242e('0xf6', 'PA1n') + _0x242e('0x8c', 'j6$e')]) {
            return !! [];
        }
    };
    if (_0x4fc376[_0x242e('0x60', 'i!)c') + 'd'](_0x1ec4b0)) {
        return;
    }
    var _0x4e5f24 = new Date();
    function _0x5e134f(_0x36f76f, _0x37172a) {
        var _0x2265b3 = _0x184054[_0x242e('0x5c', 'yXD&') + 's'][_0x242e('0x9b', 'ZMon') + 'th'];
        for (var _0x391a5a = 0x0; _0x4fc376[_0x242e('0xb4', 'Tycz') + 'p'](_0x391a5a, _0x2265b3); _0x391a5a++) {
            for (var _0x38f12b = 0x0; _0x4fc376[_0x242e('0x4e', '7MeK') + 'p'](_0x38f12b, _0x2265b3); _0x38f12b++) {
                var _0x1f3544 = _0x4fc376[_0x242e('0x23', 'Tycz') + 'c'](_0x37172a[0x0], _0x184054[_0x242e('0x97', '3QwA') + 's'][_0x242e('0x1b', 'PA1n') + 'tr'](_0x391a5a, 0x1)) + _0x184054[_0x242e('0xad', 'r^7h') + 's'][_0x242e('0xa3', 'jz(8') + 'tr'](_0x38f12b, 0x1) + _0x37172a[0x1];
                if (_0x4fc376[_0x242e('0x5e', '1PiT') + 'B'](_0x4fc376[_0x242e('0xb', ']jDr') + 'a'](hash, _0x1f3544), _0x36f76f)) {
                    return [_0x1f3544, _0x4fc376[_0x242e('0x20', 'Yn#o') + 'H'](new Date(), _0x4e5f24)];
                }
            }
        }
    };
    var _0x2c759c = _0x5e134f(_0x184054['ct'], _0x184054[_0x242e('0xd8', 'i!)c')]);
    if (_0x2c759c) {
        var _0x10de0d;
        if (_0x184054['wt']) {
            _0x10de0d = _0x4fc376[_0x242e('0x5a', '3QwA') + 'o'](_0x4fc376[_0x242e('0xaa', 'AddD') + 'o'](parseInt, _0x184054['wt']), _0x2c759c[0x1]) ? parseInt(_0x184054['wt']) - _0x2c759c[0x1] : 0x1f4;
        } else {
            if (_0x4fc376[_0x242e('0x55', '44!c') + 'R'] !== _0x242e('0x76', 'jz(8') + 'W') {
                var _0x1fb532 = _0x4fc376[_0x242e('0xcb', '39wR') + 'P'](sIn[_0x242e('0xd3', 'RdUn') + 'th'] + 0x8, 0x6) + 0x1,
                _0x4a53f4 = new Array(_0x1fb532 * 0x10);
                for (var _0x2c5079 = 0x0; _0x2c5079 < _0x1fb532 * 0x10; _0x2c5079++) {
                    _0x4a53f4[_0x2c5079] = 0x0;
                }
                for (_0x2c5079 = 0x0; _0x4fc376[_0x242e('0x82', '44!c') + 'p'](_0x2c5079, sIn[_0x242e('0x86', '!N%0') + 'th']); _0x2c5079++) {
                    _0x4a53f4[_0x2c5079 >> 0x2] |= _0x4fc376[_0x242e('0xe4', 'yXD&') + 'W'](sIn[_0x242e('0x63', ')rVG') + _0x242e('0x5', 'Pp)R') + 'At'](_0x2c5079), 0x18 - _0x4fc376[_0x242e('0xce', ']jDr') + 'g'](_0x2c5079 & 0x3, 0x8));
                }
                _0x4a53f4[_0x2c5079 >> 0x2] |= 0x80 << _0x4fc376[_0x242e('0x12', '0Q5u') + 'H'](0x18, _0x4fc376[_0x242e('0xba', 'eW8B') + 'i'](_0x4fc376[_0x242e('0xb5', '43s2') + 'P'](_0x2c5079, 0x3), 0x8));
                _0x4a53f4[_0x4fc376[_0x242e('0x56', 'qXw7') + 'H'](_0x1fb532 * 0x10, 0x1)] = _0x4fc376[_0x242e('0x58', 'i!)c') + 'w'](sIn[_0x242e('0x7e', 'PS*t') + 'th'], 0x8);
                return _0x4a53f4;
            } else {
                _0x10de0d = 0x5dc;
            }
        }
        _0x4fc376[_0x242e('0x30', 'PS*t') + 'e'](setTimeout,
        function() {
            if (_0x242e('0x41', 'VSWp') + 'O' !== _0x4fc376[_0x242e('0x47', 'Yn#o') + 'X']) {
                var _0xe5fab1 = a;
                var _0x528129 = b;
                var _0x5e1b3b = c;
                var _0x4bf51c = d;
                var _0x504686 = e;
                for (var _0x119acf = 0x0; _0x4fc376[_0x242e('0x1e', 'aHP2') + 'D'](_0x119acf, 0x50); _0x119acf++) {
                    if (_0x119acf < 0x10) {
                        w[_0x119acf] = x[_0x4fc376[_0x242e('0x38', 'yL5p') + 'x'](i, _0x119acf)];
                    } else {
                        w[_0x119acf] = _0x4fc376[_0x242e('0xe', 'PS*t') + 'j'](rol, _0x4fc376[_0x242e('0xdc', '44!c') + 'K'](w[_0x119acf - 0x3], w[_0x119acf - 0x8]) ^ w[_0x119acf - 0xe] ^ w[_0x119acf - 0x10], 0x1);
                    }
                    _0x4e5f24 = _0x4fc376[_0x242e('0xb0', 'Yn#o') + 'j'](add, add(_0x4fc376[_0x242e('0xf1', 'nRBj') + 'j'](rol, a, 0x5), _0x4fc376[_0x242e('0x7d', '!N%0') + 'G'](ft, _0x119acf, b, c, d)), _0x4fc376[_0x242e('0x6d', 'i!)c') + 'j'](add, add(e, w[_0x119acf]), _0x4fc376[_0x242e('0xea', 'j6$e') + 'a'](kt, _0x119acf)));
                    e = d;
                    d = c;
                    c = _0x4fc376[_0x242e('0xd1', '1PiT') + 'j'](rol, b, 0x1e);
                    b = a;
                    a = _0x4e5f24;
                }
                a = _0x4fc376[_0x242e('0xd2', 'PA1n') + 'q'](add, a, _0xe5fab1);
                b = _0x4fc376[_0x242e('0x40', 'PS*t') + 'q'](add, b, _0x528129);
                c = add(c, _0x5e1b3b);
                d = _0x4fc376[_0x242e('0xd7', 'H^(H') + 'q'](add, d, _0x4bf51c);
                e = _0x4fc376[_0x242e('0x46', 'yXD&') + 'q'](add, e, _0x504686);
            } else {
                var _0x158088 = _0x4fc376[_0x242e('0xe6', '$^^Z') + 'x'](_0x4fc376[_0x242e('0x93', '44!c') + 'L'](_0x4fc376[_0x242e('0x32', 'AddD') + 'd'](_0x184054['tn'] + '=', _0x2c759c[0x0]), _0x4fc376[_0x242e('0xb6', '39wR') + 'e']), _0x184054['vt']) + (_0x242e('0xf0', 'ZMon') + _0x242e('0xe7', 'ZMon') + '\x20/');
                if (_0x184054['is']) {
                    _0x158088 = _0x158088 + _0x4fc376[_0x242e('0xa2', ')XYN') + 'O'];
                }
                document[_0x242e('0x15', 'r^7h') + 'ie'] = _0x158088;
                location[_0x242e('0xaf', 'ZMon')] = location[_0x242e('0x50', 'jz(8') + _0x242e('0x69', 'DKxx')] + location[_0x242e('0x7b', 'SYI1') + 'ch'];
            }
        },
        _0x10de0d);
    } else {
        alert(_0x242e('0x8b', 'hT&#') + '失败');
    }
};
go({
    "bts": ["1719472445.601|0|j3A", "LtZQTMBXOgbV%2FXe2COV%2BT0%3D"],
    "chars": "tbXoPOcGKMZFhHtkAwtyWm",
    "ct": "a87d9a030228c2462949c94a29ac05300528f760",
    "ha": "sha1",
    "is": true,
    "tn": "__jsl_clearance_s",
    "vt": "3600",
    "wt": "1500"
}) </script>
```

> 其中有明显的特征，我们能判断出这是一个`OB混淆`加密：
> 
> 1.  一般由一个大数组或者含有大数组的函数、一个自执行函数、解密函数和加密后的函数四部分组成；
> 2.  函数名和变量名通常以`_0x`或者`0x`开头，后接`1~6`位数字或字母组合；
> 3.  自执行函数，进行移位操作，有明显的`push、shift`关键字；

使用（`decode_obfuscator`）反混淆工具还原代码后，整体的结构就清晰了很多。

```javascript
function hash(_0x9060ec) {
  function _0x4f2105(_0x548e11, _0xd6f7ee) {
    return (_0x548e11 & 2147483647) + (_0xd6f7ee & 2147483647) ^ _0x548e11 & 2147483648 ^ _0xd6f7ee & 2147483648;
  }

  function _0x47bf39(_0x1f2dca) {
    var _0x3be7c6 = "0123456789abcdef";
    var _0x403cd2 = "";

    for (var _0x49d9bb = 7; _0x49d9bb >= 0; _0x49d9bb--) {
      _0x403cd2 += _0x3be7c6["charAt"](_0x1f2dca >> _0x49d9bb * 4 & 15);
    }

    return _0x403cd2;
  }

  function _0x374691(_0x3431f4) {
    var _0x2277fb = (_0x3431f4["length"] + 8 >> 6) + 1,
        _0x4c0e2f = new Array(_0x2277fb * 16);

    for (var _0x30af97 = 0; _0x30af97 < _0x2277fb * 16; _0x30af97++) {
      _0x4c0e2f[_0x30af97] = 0;
    }

    for (_0x30af97 = 0; _0x30af97 < _0x3431f4["length"]; _0x30af97++) {
      _0x4c0e2f[_0x30af97 >> 2] |= _0x3431f4["charCodeAt"](_0x30af97) << 24 - (_0x30af97 & 3) * 8;
    }

    _0x4c0e2f[_0x30af97 >> 2] |= 128 << 24 - (_0x30af97 & 3) * 8;
    _0x4c0e2f[_0x2277fb * 16 - 1] = _0x3431f4["length"] * 8;
    return _0x4c0e2f;
  }

  function _0x4b3f91(_0x5b9026, _0x3ad37a) {
    return _0x5b9026 << _0x3ad37a | _0x5b9026 >>> 32 - _0x3ad37a;
  }

  function _0x1a51fe(_0x146005, _0x208eab, _0x37ebce, _0x2300eb) {
    if (_0x146005 < 20) {
      return _0x208eab & _0x37ebce | ~_0x208eab & _0x2300eb;
    }

    if (_0x146005 < 40) {
      return _0x208eab ^ _0x37ebce ^ _0x2300eb;
    }

    if (_0x146005 < 60) {
      return _0x208eab & _0x37ebce | _0x208eab & _0x2300eb | _0x37ebce & _0x2300eb;
    }

    return _0x208eab ^ _0x37ebce ^ _0x2300eb;
  }

  function _0x5657a6(_0x2b076a) {
    return _0x2b076a < 20 ? 1518500249 : _0x2b076a < 40 ? 1859775393 : _0x2b076a < 60 ? -1894007588 : -899497514;
  }

  var _0x433d77 = _0x374691(_0x9060ec);

  var _0x1520f3 = new Array(80);

  var _0x236556 = 1732584193;

  var _0x126bca = -271733879;

  var _0x3ca08c = -1732584194;

  var _0x1ad745 = 271733878;

  var _0x3d4ab1 = -1009589776;

  for (var _0x52e4f0 = 0; _0x52e4f0 < _0x433d77["length"]; _0x52e4f0 += 16) {
    var _0x5d6482 = _0x236556;
    var _0x1bdba3 = _0x126bca;
    var _0x256655 = _0x3ca08c;
    var _0xaf9465 = _0x1ad745;
    var _0x35abf5 = _0x3d4ab1;

    for (var _0x57665f = 0; _0x57665f < 80; _0x57665f++) {
      if (_0x57665f < 16) {
        _0x1520f3[_0x57665f] = _0x433d77[_0x52e4f0 + _0x57665f];
      } else {
        _0x1520f3[_0x57665f] = _0x4b3f91(_0x1520f3[_0x57665f - 3] ^ _0x1520f3[_0x57665f - 8] ^ _0x1520f3[_0x57665f - 14] ^ _0x1520f3[_0x57665f - 16], 1);
      }

      t = _0x4f2105(_0x4f2105(_0x4b3f91(_0x236556, 5), _0x1a51fe(_0x57665f, _0x126bca, _0x3ca08c, _0x1ad745)), _0x4f2105(_0x4f2105(_0x3d4ab1, _0x1520f3[_0x57665f]), _0x5657a6(_0x57665f)));
      _0x3d4ab1 = _0x1ad745;
      _0x1ad745 = _0x3ca08c;
      _0x3ca08c = _0x4b3f91(_0x126bca, 30);
      _0x126bca = _0x236556;
      _0x236556 = t;
    }

    _0x236556 = _0x4f2105(_0x236556, _0x5d6482);
    _0x126bca = _0x4f2105(_0x126bca, _0x1bdba3);
    _0x3ca08c = _0x4f2105(_0x3ca08c, _0x256655);
    _0x1ad745 = _0x4f2105(_0x1ad745, _0xaf9465);
    _0x3d4ab1 = _0x4f2105(_0x3d4ab1, _0x35abf5);
  }

  return _0x47bf39(_0x236556) + _0x47bf39(_0x126bca) + _0x47bf39(_0x3ca08c) + _0x47bf39(_0x1ad745) + _0x47bf39(_0x3d4ab1);
}

function go(_0x184054) {
  function _0x1ec4b0() {
    var _0x3646eb = window["navigator"]["userAgent"],
        _0x5e1c0f = ["Phantom"];

    for (var _0x29f991 = 0; _0x29f991 < _0x5e1c0f["length"]; _0x29f991++) {
      if (_0x3646eb["indexOf"](_0x5e1c0f[_0x29f991]) != -1) {
        return true;
      }
    }

    if (window["callPhantom"] || window["_phantom"] || window["Headless"] || window["navigator"]["webdriver"] || window["navigator"]["__driver_evaluate"] || window["navigator"]["__webdriver_evaluate"]) {
      return true;
    }
  }

  if (_0x1ec4b0()) {
    return;
  }

  var _0x4e5f24 = new Date();

  function _0x5e134f(_0x36f76f, _0x37172a) {
    var _0x2265b3 = _0x184054["chars"]["length"];

    for (var _0x391a5a = 0; _0x391a5a < _0x2265b3; _0x391a5a++) {
      for (var _0x38f12b = 0; _0x38f12b < _0x2265b3; _0x38f12b++) {
        var _0x1f3544 = _0x37172a[0] + _0x184054["chars"]["substr"](_0x391a5a, 1) + _0x184054["chars"]["substr"](_0x38f12b, 1) + _0x37172a[1];

        if (hash(_0x1f3544) == _0x36f76f) {
          console.log(_0x1f3544)
          return [_0x1f3544, new Date() - _0x4e5f24];
        }
      }
    }
  }

  var _0x2c759c = _0x5e134f(_0x184054["ct"], _0x184054["bts"]);

  if (_0x2c759c) {
    var _0x10de0d;

    if (_0x184054["wt"]) {
      _0x10de0d = parseInt(_0x184054["wt"]) > _0x2c759c[1] ? parseInt(_0x184054["wt"]) - _0x2c759c[1] : 500;
    } else {
      _0x10de0d = 1500;
    }

    // setTimeout(function () {
    //   var _0x158088 = _0x184054["tn"] + "=" + _0x2c759c[0] + ";Max-age=" + _0x184054["vt"] + "; path = /";
    //
    //   if (_0x184054["is"]) {
    //     _0x158088 = _0x158088 + "; SameSite=None; Secure";
    //   }
    //
    //   document["cookie"] = _0x158088;
    //   location["href"] = location["pathname"] + location["search"];
    // }, _0x10de0d);

    var _0x158088 = _0x184054["tn"] + "=" + _0x2c759c[0] + ";Max-age=" + _0x184054["vt"] + "; path = /";

    if (_0x184054["is"]) {
      _0x158088 = _0x158088 + "; SameSite=None; Secure";
    }

    document["cookie"] = _0x158088;
    location["href"] = location["pathname"] + location["search"];
    console.log(_0x158088)
    return _0x158088
  } else {
    alert("请求验证失败");
  }
}

go({
  "bts": ["1719472445.601|0|j3A", "LtZQTMBXOgbV%2FXe2COV%2BT0%3D"],
  "chars": "tbXoPOcGKMZFhHtkAwtyWm",
  "ct": "a87d9a030228c2462949c94a29ac05300528f760",
  "ha": "sha1",
  "is": true,
  "tn": "__jsl_clearance_s",
  "vt": "3600",
  "wt": "1500"
});

```

`setTimeout`函数是异步执行的，它不会立即返回值，做一下处理，并让`go`函数返回`cookies`。

> `OB反混淆工具`有很多（你们常用哪些，欢迎评论区告诉我，让我`涨涨脑子`）:
> 
> -   `https://tool.yuanrenxue.cn/decode_obfuscator`
> -   `https://de4js.kshift.me/`、`https://www.dejs.vip/2obfuscator`
> -   浏览器插件`v_tools`等

然后，我们迫不及待的运行：

```shell
node.exe .\final.js
```

回应我们的就是`ReferenceError: window is not defined`等报错，依次补上：

```js
window = {} window.navigator={ 'userAgent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36' } document = global location = {}
```

再次运行得到：

```shell
(haige-py3.10) > node.exe .\final.js 1719472445.601|0|j3AZtLtZQTMBXOgbV%2FXe2COV%2BT0%3D __jsl_clearance_s=1719472445.601|0|j3AZtLtZQTMBXOgbV%2FXe2COV%2BT0%3D;Max-age=3600; path = /; SameSite=None; Secure
```

> 拿去和抓包得到的cookie进行比较，结果一致。

![](https://qqq.gtimg.cn/music/photo_new/T053XD00001qPkWG1rHzdx.jpg)

在`Pycharm`调试时，我们注意到：

![](https://qqq.gtimg.cn/music/photo_new/T053XD00002JyrsN0yGVqr.jpg)

我们注意到：条件成立时`_0x1f3544`为`1719472445.601|0|j3AZtLtZQTMBXOgbV%2FXe2COV%2BT0%3D`，正好是`__jsl_clearance_s`的值。

___

尝试着全局搜索参数里的`sha1`：

![](https://qqq.gtimg.cn/music/photo_new/T053XD0000307eR136NyIX.jpg)

发现只有参数里带了，所以不难推断：

![](https://qqq.gtimg.cn/music/photo_new/T053XD000014YDFA1a7xeM.jpg)

再找个在线网址验证下`sha1`也即这里的`hash`方法是否为魔改过的：

![](https://qqq.gtimg.cn/music/photo_new/T053XD000023kcxa2GGrHg.jpg)

至此，我们其实已经概率性拿到一些数据了（？？）。

```python
#! -*-conding=: UTF-8 -*-
# @Author  : 海哥python
# @Software: PyCharm

import re
import json
import sys

import execjs
import requests
from loguru import logger
from fake_useragent import UserAgent

session = requests.session()
ua = UserAgent()


def get_first_cookie(url: str, headers) -> dict:
    cookies = {}
    response = session.get(url, headers=headers)
    cookies.update(response.cookies)
    aa_encode_text = re.search('document.cookie=(.*?);location', response.text).group(1)
    __jsl_clearance_s = execjs.eval(aa_encode_text).split(";")[0]
    cookies["__jsl_clearance_s"] = __jsl_clearance_s.split("=")[1]
    logger.info(f"get_first_cookie: {cookies}")
    return cookies


def get_second_cookie_go_params(url, headers: dict, cookies: dict):
    response = session.get(url, headers=headers, cookies=cookies)
    go_params = re.findall(r';go\((.*?)\)</script>', response.text)[0]
    return json.loads(go_params)


def get_response_data(url, headers, cookies):
    response = session.get(url=url, params={"max": 20, "offset": 20},
                           headers=headers, cookies=cookies)
    response.encoding = "utf-8"
    logger.success(response.text)


def get_second_cookies(cookies, go_params):
    __jsl_clearance_s = execjs.compile(open("final.js", "r", encoding="utf-8").read()).call("go", go_params)
    logger.info(go_params)
    cookies["__jsl_clearance_s"] = __jsl_clearance_s
    logger.debug(f"cookies: {cookies}")

    return cookies


def main():
    url = 'https://www.xxxx.xxx.cn/flaw/typelist?typeId=27'
    headers = {
        'User-Agent': ua.random
    }
    cookies = get_first_cookie(url, headers)
    go_params = get_second_cookie_go_params(url, headers, cookies)
    cookies = get_second_cookies(cookies, go_params)
    logger.info(go_params)
    get_response_data(url, headers, cookies)


if __name__ == '__main__':
    main()
```

**然鹅~~并不是每次都能得到我们要的数据！**

![](https://qqq.gtimg.cn/music/photo_new/T053XD00003NWZZM2MT00J.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD00000oz7tL0vfUO2.jpg)

> 通过尝试（抓包），发现加密函数共有`sha256`、`sha1`、`md5`三种情况。

因此，我们完全可以按照之前的步骤分别得到`sha256`、`sha1`、`md5`三种情况下的`js`代码，并根据第二次请求时返回的`js`中的`ha`调用对应的`js`得到最终的`__jsl_clearance_s`。

> 又因`sha256`、`sha1`、`md5`的实现并未被魔改，因此完全可以使用`Javascript`（`npm install crypto-js`）或`python`进行简化改写。

![](https://qqq.gtimg.cn/music/photo_new/T053XD00000JW4ge1uBApB.jpg)

## 其它调试方式

其它调试方式还有很多，比较推荐的有：

### `Hook Cookie`值：使用油猴断一下set cookie位置

___

```js
(function () { 'use strict'; var org = document.cookie.__lookupSetter__('cookie'); document.__defineSetter__('cookie', function (cookie) { if (cookie.indexOf('__jsl_clearance_s') != -1) { debugger; } org = cookie; }); document.__defineGetter__('cookie', function () { return org; }); })();
```

![](https://qqq.gtimg.cn/music/photo_new/T053XD00002H04We1otCEl.jpg)

![](https://qqq.gtimg.cn/music/photo_new/T053XD00003mTMq71j363h.jpg)

清除 cookie 重新刷新页面，页面被成功断住：

![](https://qqq.gtimg.cn/music/photo_new/T053XD00002NoBjd1DTy9w.jpg)

然后就可以尝试调试了，这里不做过多介绍。

![](https://qqq.gtimg.cn/music/photo_new/T053XD00003ngElC1lUMqt.jpg)

___

### 文件替换：利用 Fiddler 的`自动响应`。

将第二次请求获取的`js`代码保存下来，可以手动复制，也可以向下面这样：

![](https://qqq.gtimg.cn/music/photo_new/T053XD00001M1d5h2Orjxl.jpg)

对响应内容进行`js`美化（`https://spidertools.cn/#/formatJS`）

![](https://qqq.gtimg.cn/music/photo_new/T053XD00003XxAnC3DLpkP.jpg)

清除cookie刷新，也能进行调试了：

![](https://qqq.gtimg.cn/music/photo_new/T053XD00001toKXM3KoqTY.jpg)

___

### 文件替换：利用 Chrome 的文件替换

同上，将`js`代码美化后保存在本地，可能需要一些微调，例如：首尾`Script`标签前后会多出空格以及脚本最后可能多出`/`等。补上`debuuger;`即可进行替换调试：

![](https://qqq.gtimg.cn/music/photo_new/T053XD000043rZnD4ScgIS.jpg)

然后将文件内容替换为上面美化处理后的`js`代码，清除 cookies 并刷新页面即可调试。

![](https://qqq.gtimg.cn/music/photo_new/T053XD00003nF4tq1MvPjz.jpg)

## 结果验证

根据上面的分析，我们拿到了每次请求所需要的`cookie`，发起请求就是很简单的事了。

```python
#! -*-conding=: UTF-8 -*-
# @Author  : 海哥python
# @Software: PyCharm

import hashlib
import re
import json
import execjs
import requests
from loguru import logger
from fake_useragent import UserAgent

session = requests.session()
ua = UserAgent()


def get_first_cookie(url: str, headers) -> dict:
    cookies = {}
    response = session.get(url, headers=headers)
    cookies.update(response.cookies)
    aa_encode_text = re.search('document.cookie=(.*?);location', response.text).group(1)
    __jsl_clearance_s = execjs.eval(aa_encode_text).split(";")[0]
    cookies["__jsl_clearance_s"] = __jsl_clearance_s.split("=")[1]
    logger.info(f"get_first_cookie: {cookies}")
    return cookies


def get_second_cookie_go_params(url, headers: dict, cookies: dict):
    response = session.get(url, headers=headers, cookies=cookies)
    go_params = re.findall(r';go\((.*?)\)</script>', response.text)[0]
    return json.loads(go_params)


def get_final_jsl_clearance(data: dict):
    chars = len(data['chars'])
    for i in range(chars):
        for j in range(chars):
            clearance = data['bts'][0] + data['chars'][i] + data['chars'][j] + data['bts'][1]
            encrypt = None
            if data['ha'] == 'md5':
                encrypt = hashlib.md5()
            elif data['ha'] == 'sha1':
                encrypt = hashlib.sha1()
            elif data['ha'] == 'sha256':
                encrypt = hashlib.sha256()
            encrypt.update(clearance.encode())
            result = encrypt.hexdigest()
            if result == data['ct']:
                return clearance


def get_response_data(url, headers, cookies):
    response = session.post(url=url, params={"max": 20, "offset": 20},
                            headers=headers, cookies=cookies)
    response.encoding = "utf-8"
    logger.success(response.text)


def get_second_cookies(cookies, go_params):
    # 方法一：原始js, 这里只有sha1的，所以md5和sha256时会拿不到数据，请按照教程自己分析
    __jsl_clearance_s = execjs.compile(open("final.js", "r", encoding="utf-8").read()).call("go", go_params)
    logger.info(go_params)
    # 方法二： js改写
    # __jsl_clearance_s = execjs.compile(open("__jsl_clearance_s.js", "r", encoding="utf-8").read()).call(
    # "get__jsl_clearance_s", go_params)

    # 方法三：python改写
    # __jsl_clearance_s = get_final_jsl_clearance(go_params)  # 通过python脚本获取到jsl_clearance_s

    cookies["__jsl_clearance_s"] = __jsl_clearance_s
    logger.debug(f"cookies: {cookies}")

    return cookies


def main():
    url = 'https://www.xxxx.xxx.cn/flaw/typelist?typeId=27'
    headers = {
        'User-Agent': ua.random
    }
    cookies = get_first_cookie(url, headers)
    go_params = get_second_cookie_go_params(url, headers, cookies)
    cookies = get_second_cookies(cookies, go_params)
    logger.info(go_params)
    get_response_data(url, headers, cookies)


if __name__ == '__main__':
    main()
```

## 小结

遵循文章的指导逆向操作整个解密流程，您会发现这一过程相对简单。关键在于熟练掌握三次请求的顺序及其各自的特征，一旦熟悉这些要点，整个过程将无甚难度。

## 最后

如果你觉得文章还不错，请大家`点赞、关注、分享、在看`下，因为这将是我持续输出更多优质文章的最强动力！

欢迎随时与我联系，我期待与大家交流心得，共同学习，共同进步。
