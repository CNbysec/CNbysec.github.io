# Python注册热键


```python
#!/usr/bin/env python3
# _*_ coding: utf-8 _*_
import win32con
import ctypes
import ctypes.wintypes
from threading import Thread, Timer, activeCount, enumerate
from time import sleep
h_ids = [i for i in range(2)]  # 创建两个热键序列
h_keys = {i: False for i in h_ids}  # 初始化所有热键序列的标志符为False
h_dict = {}  # 初始化一个空的字典，记录id与func
 
 
class Hotkey(Thread):  # 创建一个Thread的扩展类
    user32 = ctypes.windll.user32  # 加载user32.dll
    # global h_ids, h_keys,h_dict
 
    def regiskey(self, hwnd=None, flagid=0, fnkey=win32con.MOD_ALT, vkey=win32con.VK_F9):  # 注册热键，默认一个alt+F9
        return self.user32.RegisterHotKey(hwnd, flagid, fnkey, vkey)
 
    def callback(self, id, func):
        h_dict[id] = func  # 这个id对应这个func，没有就是新增，有就是修改
 
        def inner():
            for key, value in h_dict.items():
                print(f'总的热键池:{h_ids},当前热键序号:{key}, 当前热键功能:{value}，当前热键状态:{h_keys[h_ids[key]]}')
            while True:
                for key, value in h_dict.items():
                    if h_keys[h_ids[key]]:
                        thread_it(value)  # 另外开线程执行value
                        h_keys[h_ids[key]] = False
        return inner
 
    def run(self):
        # print(self.user32)
        if not self.regiskey(None,h_ids[0],win32con.MOD_ALT,win32con.VK_F9):   # 注册快捷键alt+F9并判断是否成功，该热键用于执行一次需要执行的内容。
            print(f"热键注册失败！ id{h_ids[0]}")  # 返回一个错误信息
        if not self.regiskey(None,h_ids[1],0,win32con.VK_F10):   # 注册快捷键F10并判断是否成功，该热键用于结束程序，且最好这么结束，否则影响下一次注册热键。
            print(f"热键注册失败！ id{h_ids[1]}")
 
        # 以下为检测热键是否被按下，并在最后释放快捷键
        try:
            msg = ctypes.wintypes.MSG()
            while True:
                if self.user32.GetMessageA(ctypes.byref(msg), None, 0, 0) != 0:
                    if msg.message == win32con.WM_HOTKEY:
                        if msg.wParam in h_ids:
                            h_keys[msg.wParam] = True
                    self.user32.TranslateMessage(ctypes.byref(msg))
                    self.user32.DispatchMessageA(ctypes.byref(msg))
        finally:
            for i in h_ids:
                self.user32.UnregisterHotKey(None, i)
                # 必须得释放热键，否则下次就会注册失败，所以当程序异常退出，没有释放热键，
                # 那么下次很可能就没办法注册成功了，这时可以换一个热键测试
 
 
def thread_it(func, *args):
    t = Thread(target=func, args=args)
    t.setDaemon(True)
    t.start()
 
 
def settimeout(func, sec):
    def inner():
        func()
        Timer(sec, inner).start()
 
    thread_it(inner)
 
 
def setinterval(func, sec, tmrname, flag=True):
    global timer_dict
    timer_dict[tmrname] = flag
    print("已设置tqtimer启用状态为:{}".format(flag))
 
    def inner():
        global timer_dict
        if timer_dict[tmrname]:
            func()
            Timer(sec, inner).start()
 
    thread_it(inner)
 
 
def clearinterval(timername):
    global timer_dict
    timer_dict[timername] = False
    flag = timer_dict[timername]
    print("已设置tqtimer启用状态为:{}".format(flag))
 
 
def test_start():
    print("按下了开始键...the programe is running")
 
 
def test_stop():
    print("按下了停止键...the programe is stopped")
 
 
def run_ok():
    hotkey = Hotkey()
    hotkey.start()
    fn = hotkey.callback(0, test_start)
    fn = hotkey.callback(1, test_stop)
    thread_it(fn)
    sleep(0.5)
    count = activeCount()
    print(f"当前总线程数量:{count}")
    print('当前线程列表:', enumerate())
    print('热键注册初始化完毕，尝试按组合键alt+F9 或者单键F10看效果')
    while True:
        pass
 
 
if __name__ == '__main__':
    run_ok()
```
