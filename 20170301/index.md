# Tkinter多线程


<!--more-->

## tkinter多线程
```Python
# -*-coding:utf-8-*-
import threading
import tkinter
import tkinter.messagebox


def message():
    tkinter.messagebox.showinfo(message="弹出消息")

def sta():
    th = threading.Thread(target=main)
    th.setDaemon(True)
    th.start()


if __name__ == '__main__':
    root = tkinter.Tk()
    root.title("title")
    root.iconbitmap("favicon.ico")
    root.resizable(width=False, height=False)
    sw = root.winfo_screenwidth()
    sh = root.winfo_screenheight()
    x = (sw - 300) / 2
    y = (sh - 300) / 5
    root.geometry("%dx%d+%d+%d" % (200, 200, x, y))

    message = tkinter.Button(root, text="弹框消息", bg='white', fg='green', command=message)
    message.pack()
    message = message.place(x=65, y=150, width=60, height=40)

    sta = tkinter.Button(root, text="开 始", bg='white', fg='red', command=sta)
    sta.pack()
    sta = sta.place(x=120, y=100, width=60, height=40)

    root.mainloop()
```
