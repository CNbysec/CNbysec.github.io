# C# 复制、粘贴文本信息到剪贴板


<!--more-->

## 复制、粘贴文本信息到剪贴板

```CSharp
// 复制：
private void button1_Click(object sender, System.EventArgs e) {
　　if(textBox1.SelectedText != ”")
　　Clipboard.SetDataObject(textBox1.SelectedText);
}

// 粘贴：
private void button2_Click(object sender, System.EventArgs e) {
　　IDataObject iData = Clipboard.GetDataObject();

　　if(iData.GetDataPresent(DataFormats.Text)) {
　　textBox2.Text = (String)iData.GetData(DataFormats.Text); 
　　}
}

主要通过调用Clipborad的API完成。
```

