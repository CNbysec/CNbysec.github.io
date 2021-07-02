# Python通过selenium获取cookie


<!--more-->

## 实例
```python
from selenium import webdriver
import time
import json
 
 
options = webdriver.FirefoxOptions()
dr = webdriver.Firefox(options=options)
 
dr.get('https://cn.bing.com/search?q=objective%20lens%20of%20compound%20microscope&qs=ds&form=QBRE')
 
cookie_test = dr.get_cookies()
# 未整理的cookie
print(cookie_test)
 
cookie = [item["name"] + "=" + item["value"] for item in cookie_test]
cookiestr = '; '.join(item for item in cookie)
# 整理后的cookie
print(cookiestr)
```

## 未整理的cookie为
```json
[{'name': 'SRCHD', 'value': 'AF=QBRE', 'path': '/', 'domain': '.bing.com', 'expiry': 1624095919, 'secure': False, 'httpOnly': False}, {'name': 'SRCHUID', 'value': 'V=2&GUID=0AA209DFB56549E1AABE3300BE0C055D&dmnchg=1', 'path': '/', 'domain': '.bing.com', 'expiry': 1624095919, 'secure': False, 'httpOnly': False}, {'name': 'SRCHUSR', 'value': 'DOB=20190619', 'path': '/', 'domain': '.bing.com', 'expiry': 1624095919, 'secure': False, 'httpOnly': False}, {'name': '_EDGE_S', 'value': 'F=1&SID=1B8FEA8F99976FF11A3FE70F98B96ED0', 'path': '/', 'domain': '.bing.com', 'expiry': None, 'secure': False, 'httpOnly': True}, {'name': '_EDGE_V', 'value': '1', 'path': '/', 'domain': '.bing.com', 'expiry': 1594633519, 'secure': False, 'httpOnly': True}, {'name': 'MUID', 'value': '20D548F9F8E36E4532D24579F9CD6FDF', 'path': '/', 'domain': '.bing.com', 'expiry': 1594633519, 'secure': False, 'httpOnly': False}, {'name': 'MUIDB', 'value': '20D548F9F8E36E4532D24579F9CD6FDF', 'path': '/', 'domain': 'cn.bing.com', 'expiry': 1594633519, 'secure': False, 'httpOnly': True}, {'name': '_SS', 'value': 'SID=1B8FEA8F99976FF11A3FE70F98B96ED0&HV=1560937520', 'path': '/', 'domain': '.bing.com', 'expiry': None, 'secure': False, 'httpOnly': False}]
```

##  整理后的cookie为
```json
SRCHD=AF=QBRE; SRCHUID=V=2&GUID=0AA209DFB56549E1AABE3300BE0C055D&dmnchg=1; SRCHUSR=DOB=20190619; _EDGE_S=F=1&SID=1B8FEA8F99976FF11A3FE70F98B96ED0; _EDGE_V=1; MUID=20D548F9F8E36E4532D24579F9CD6FDF; MUIDB=20D548F9F8E36E4532D24579F9CD6FDF; _SS=SID=1B8FEA8F99976FF11A3FE70F98B96ED0&HV=1560937520
```


