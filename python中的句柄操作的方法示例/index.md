# Python中的句柄操作的方法示例


<!--more-->

# 遍历windows下 所有句柄及窗口名称
```python
import win32gui
hwnd_title = dict()
def get_all_hwnd(hwnd,mouse):
    if win32gui.IsWindow(hwnd) and win32gui.IsWindowEnabled(hwnd) and win32gui.IsWindowVisible(hwnd):
        hwnd_title.update({hwnd:win32gui.GetWindowText(hwnd)})
win32gui.EnumWindows(get_all_hwnd, 0)
 
for h,t in hwnd_title.items():
    if t is not "":
        print(h, t)
```

# 通过窗口标题获取句柄
```python
import win32gui
 
hld = win32gui.FindWindow(None,u"Adobe Acrobat") #返回窗口标题为Adobe Acrobat的句柄 
```

# 通过父窗口句柄获取子句柄
```python
#parent为父窗口句柄id
def get_child_windows(parent):
    if not parent:
        return
    hwndChildList = []
    win32gui.EnumChildWindows(parent, lambda hwnd, param: param.append(hwnd), hwndChildList)
    return hwndChildList 
```

# 根据句柄获取句柄标题和类名
```python
import win32gui
#获取标题
title = win32gui.GetWindowText(jbid)  
#获取类名 
clsname = win32gui.GetClassName(jbid)  
```

# 根据句柄获取窗口位置
```python
import win32gui
left, top, right, bottom = win32gui.GetWindowRect(jbid)
#分别为左、上、右、下的窗口位置 
```

# 根据句柄进行点击操作
```python
import win32api,win32con
 
win32api.SetCursorPos([横坐标, 纵坐标])
#根据横纵坐标定位光标
win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP | win32con.MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0)
#给光标定位的位置进行单击操作（若想进行双击操作，可以延时几毫秒再点击一次）
win32api.mouse_event(win32con.MOUSEEVENTF_RIGHTUP | win32con.MOUSEEVENTF_RIGHTDOWN, 0, 0, 0, 0)
#给光标定位的位置进行右击操作 
```

# 根据句柄将窗口放在最前
```python
win32gui.SetForegroundWindow(jbid)
```



