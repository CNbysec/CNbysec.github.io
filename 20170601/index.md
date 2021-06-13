# Python部署推送


<!--more-->

```Python
# -*- coding: utf-8 -*-
import os
import chardet


def convert(filename, out_enc):
    try:
        with open(filename, 'rb') as f:
            content_bytes = f.read()

        source_encoding = chardet.detect(content_bytes).get('encoding')
        print(chardet.detect(content_bytes))

        with open(filename, 'r', encoding=source_encoding) as f:
            content_str = f.read()

        with open(filename, 'w', encoding=out_enc) as f:
            f.write(content_str)

        with open(filename, 'rb') as f:
            content_bb = f.read()

    except IOError as err:
        print("I/O error:{0}".format(err))


def explore(dir, suffix, out_enc):
    for root, dirs, files in os.walk(dir):
        for file in files:
            if os.path.splitext(file)[1] == suffix:
                print(file)
                path = os.path.join(root, file)
                convert(path, out_enc)


def main():
    # 推送到 Hugo 仓库
    print('-'*80)
    os.system('hugo')
    os.system('git add .')
    os.system('git commit -m \"main\"')
    os.system('git push')
    print('-'*80)
    # 批量修改文档编码
    explore("public", ".md", "utf-8-sig")
    # 推送到 CNbysec.github.io 仓库
    print('-'*80)
    os.chdir('public') 
    os.system('git add .')
    os.system('git commit -m \"main\"')
    os.system('git push')
    print('-'*80)
    # 本地部署
    os.chdir('../')
    os.system('hugo server')

if __name__ == "__main__":
    main()

```
