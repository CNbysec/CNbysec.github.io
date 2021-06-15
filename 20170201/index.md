# python读取yaml文件


<!--more-->

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

