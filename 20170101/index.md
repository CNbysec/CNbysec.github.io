# python图片切片


<!--more-->

## 图片切片
```Python
from PIL import Image

def cutImg(path, x, y, w, h):
    im = Image.open(path)
    img_size = im.size
    region = im.crop((x, y, x + w, y + h))
    region.save('cutImg.png')
    return format(img_size)
```

## 获取图片位置上的rgb颜色
```Python
from PIL import Image

def getPix(Path, pixelX, pixelY):
    img_src = Image.open(Path)
    img_src = img_src.convert('RGB')
    str_strlist = img_src.load()
    data = str_strlist[int(pixelX), int(pixelY)]
    img_src.close()
    print(data)
    return data
```

