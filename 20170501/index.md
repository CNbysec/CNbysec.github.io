# Python实现自动推本地github博客到远程仓库


<!--more-->

## 实现自动推本地github博客到远程仓库

```Python
#!/usr/bin/env python
# -*- coding:utf-8 -*-
# 本模块的功能:<检测文件夹变化>
from watchdog.observers import Observer
from watchdog.events import *
import time
import os


def push(change):
    print('-'*76)
    os.system('git add .')
    os.system('git commit -m\"auto'+change+'\"')
    os.system('git push -u origin master')
    print('-'*76)


class FileEventHandler(FileSystemEventHandler):
    # 初始化魔术方法
    def __init__(self):
        FileSystemEventHandler.__init__(self)

    # 文件或文件夹移动
    def on_moved(self, event):
        if event.is_directory:
            print("directory moved from {0} to {1}".format(event.src_path, event.dest_path))
        else:
            print("file moved from {0} to {1}".format(event.src_path, event.dest_path))
            # 这里我们只判断文件修改,如需加入文件夹修改,只需在上面的if条件中调用push函数即可
            push("文件移动: {0} to {1}".format(event.src_path, event.dest_path))

    # 创建文件或文件夹
    def on_created(self, event):
        if event.is_directory:
            print("directory created:{0}".format(event.src_path))
        else:
            print("file created:{0}".format(event.src_path))
            push("创建文件:{0}".format(event.src_path))

    # 删除文件或文件夹
    def on_deleted(self, event):
        if event.is_directory:
            print("directory deleted:{0}".format(event.src_path))
        else:
            print("file deleted:{0}".format(event.src_path))
            push("删除文件:{0}".format(event.src_path))

    # 移动文件或文件夹
    def on_modified(self, event):
        if event.is_directory:
            print("directory modified:{0}".format(event.src_path))
        else:
            print("file modified:{0}".format(event.src_path))
            push("文件修改:{0}".format(event.src_path))


if __name__ == "__main__":
    # 实例化Observer对象
    observer = Observer()
    event_handler = FileEventHandler()
    # 设置监听目录
    dis_dir = "./_posts/"
    observer.schedule(event_handler, dis_dir, True)
    observer.start()
    try:
        while True:
            # 设置监听频率(间隔周期时间)
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
```
