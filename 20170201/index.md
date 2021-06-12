# python系统操作


<!--more-->

## 输入cmd命令
```Python
import os

def putCmd(cmd):
    f = os.popen(cmd)
    shuchu = f.read()
    f.close()
    print(shuchu)
    return shuchu
```

## 读取yaml文件
```Python
import yaml

def getYaml(path):
    proPath = os.path.dirname(os.path.realpath(__file__))
    yamlPath = os.path.join(proPath, path)
    f = open(yamlPath, "r", encoding="utf-8")
    data = yaml.full_load(f)
    f.close()
    return data
```

