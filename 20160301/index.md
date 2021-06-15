# C# 连SqlServer数据库


<!--more-->

## 环境

VS2010 + SqlServer 2008

首先，按照面向对象的程序设计思想，设计一个数据库操作工具类MyTool.cs，该类中封装了关于数据库连接和操作的方法，各个功能模块在需进行数据库操作时只需调用相应的函数

```CSharp
//引入的命名空间
using System.Data.SqlClient; //用于SQL Sever数据访问的命名空间
using System.Data;               //DataSet类的命名空间
using System.Windows.Forms;  //DataGridView控件类的命名空间


//执行指定的SQL命令语句(insert,delete,update等),并返回命令所影响的行数
public static int executeCommand(string sqlStr)
{
    SqlConnection sqlConnection1 = new SqlConnection("server=dell-PC;database=11071312HotelSys;uid=sa;pwd=xiaoyi9421");//创建数据库连接(字符串中是我个人的数据库信息)
    sqlConnection1.Open();      //打开数据库连接
    SqlCommand sqlCommand1 = new SqlCommand(sqlStr, sqlConnection1);  //执行SQL命令
    int Succnum = sqlCommand1.ExecuteNonQuery();
    return Succnum;
}

//查询(select)指定的数据记录（多行多列）,并填充到数据控件DataGridView中
public static void queryDataToGrid(string sqlStr, DataGridView dataGridView1)
{
    SqlConnection sqlConnection1 = new SqlConnection("server=dell-PC;database=11071312HotelSys;uid=sa;pwd=xiaoyi9421");//创建数据库连接
    SqlDataAdapter sqlDataAdapter1 = new SqlDataAdapter(sqlStr, sqlConnection1);//利用已创建好的sqlConnection1,创建数据适配器sqlDataAdapter1
    DataSet dataSet1 = new DataSet();  //创建数据集对象
    sqlDataAdapter1.Fill(dataSet1);    //执行查询,查询的结果存放在数据集里
    dataGridView1.DataSource = dataSet1.Tables[0]; //把数据集中的查询结果绑定到dataGridView1中
}

//查询(select)指定的数据（单个数据,假设为string类型）,并返回
public static string queryData(string sqlStr)
{
    SqlConnection sqlConnection1 = new SqlConnection("server=dell-PC;database=11071312HotelSys;uid=sa;pwd=xiaoyi9421");//创建数据库连接
    SqlDataAdapter sqlDataAdapter1 = new SqlDataAdapter(sqlStr, sqlConnection1);//利用已创建好的sqlConnection1,创建数据适配器sqlDataAdapter1
    DataSet dataSet1 = new DataSet();  //创建数据集对象
    sqlDataAdapter1.Fill(dataSet1);    //执行查询,查询的结果存放在数据集里
    return dataSet1.Tables[0].Rows[0]["列名"].ToString(); //把查询结果的第一行指定列下的数据以string类型返回
}
```

当在各个功能模块中需要进行数据库操作时，只需指定要执行的SQL语句，调用一下数据库工具类中的方法即可实现，下面给了一些基本的的SQL操作(单表)

```CSharp
//增
sqlStr = "insert into 表名( 列名1 , 列名2 )values( 插入值1 , 插入值2 )";
//执行指定的SQL命令语句,并返回命令所影响的行数
int Succnum = MyTool.executeCommand(sqlStr); 
if (Succnum > 0) MessageBox.Show("录入成功");

//删
sqlStr = "delete from 表名 where 删除条件";
int Succnum = MyTool.executeCommand(sqlStr); 
if (Succnum > 0) MessageBox.Show("删除成功");

//改
sqlStr = "update 表名 set 列名1 = 更新值1 , 列名2 = 更新值2";
int Succnum = MyTool.executeCommand(sqlStr); 
if (Succnum > 0) MessageBox.Show("更新成功");

//查一组数据
sqlStr = "select 列名1 , 列名2 from 表名 where 查询表达式";
MyTool.queryDataToGrid(sqlStr, dataGridView1);//填充到数据控件DataGridView中

//查单个数据
sqlStr = "select 列名 from 表名 where 查询表达式";
textBox1.Text = MyTool.queryData(sqlStr); //填充到文本框textBox1中
```


