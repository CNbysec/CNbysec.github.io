﻿# C# winform中DataGridView的数据实现导出excel


<!--more-->

## 引入

> 使用这个方法需要装有微软office

1. 引入程序集: Microsoft.Office.Interop.Excel.dll
2. 没有就网上下载一份然后引用即可

## 实现方法

```CSharp
private void ExportExcels(string fileName, DataGridView myDGV)
   {
       string saveFileName = "";
       SaveFileDialog saveDialog = new SaveFileDialog();
       saveDialog.DefaultExt = "xls";
       saveDialog.Filter = "Excel文件|*.xls";
       saveDialog.FileName = fileName;
       saveDialog.ShowDialog();
       saveFileName = saveDialog.FileName;
       if (saveFileName.IndexOf(":") < 0) return; //被点了取消
       Microsoft.Office.Interop.Excel.Application xlApp = new Microsoft.Office.Interop.Excel.Application();
       if (xlApp == null)
       {
           MessageBox.Show("无法创建Excel对象，可能您的机子未安装Excel");
           return;
       }
       Microsoft.Office.Interop.Excel.Workbooks workbooks = xlApp.Workbooks;
       Microsoft.Office.Interop.Excel.Workbook workbook = workbooks.Add(Microsoft.Office.Interop.Excel.XlWBATemplate.xlWBATWorksheet);
       Microsoft.Office.Interop.Excel.Worksheet worksheet = (Microsoft.Office.Interop.Excel.Worksheet)workbook.Worksheets[1];//取得sheet1
       //写入标题
       for (int i = 0; i < myDGV.ColumnCount; i++)
       {
           worksheet.Cells[1, i + 1] = myDGV.Columns[i].HeaderText;
       }
       //写入数值
       for (int r = 0; r < myDGV.Rows.Count; r++)
       {
           for (int i = 0; i < myDGV.ColumnCount; i++)
           {
               worksheet.Cells[r + 2, i + 1] = myDGV.Rows[r].Cells[i].Value;
           }
           System.Windows.Forms.Application.DoEvents();
       }
       worksheet.Columns.EntireColumn.AutoFit();//列宽自适应
       if (saveFileName != "")
       {
           try
           {
               workbook.Saved = true;
               workbook.SaveCopyAs(saveFileName);
           }
           catch (Exception ex)
           {
               MessageBox.Show("导出文件时出错,文件可能正被打开！\n" + ex.Message);
           }
       }
       xlApp.Quit();
       GC.Collect(); //强行销毁
       MessageBox.Show("文件： " + fileName + ".xls 保存成功", "信息提示", MessageBoxButtons.OK, MessageBoxIcon.Information);
   }
```

## 点击按钮调用

```CSharp
private void button1_Click(object sender, EventArgs e)
{
    string a = "D:" + "\\KKHMD.xls";
    ExportExcels(a, dataGridView1);
}
```

