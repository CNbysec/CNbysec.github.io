# C# MD5加密


<!--more-->

## MD5加密

```CSharp
using System;
using System.Collections.Generic;
using System.Text;
using System.Security.Cryptography;

namespace md5
{
    class Program
    {
        static void Main(string[] args)
        {
             Console.WriteLine(UserMd5("8"));
             Console.WriteLine(GetMd5Str("8"));
         }
         
        // MD5 16位加密 加密后密码为大写
        public static string GetMd5Str(string ConvertString)
        {
             MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            string t2 = BitConverter.ToString(md5.ComputeHash(UTF8Encoding.Default.GetBytes(ConvertString)), 4, 8);
             t2 = t2.Replace("-", "");
            return t2;
         }

        // MD5 16位加密 加密后密码为小写
        public static string GetMd5Str(string ConvertString)
        {
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            string t2 = BitConverter.ToString(md5.ComputeHash(UTF8Encoding.Default.GetBytes(ConvertString)), 4, 8);
            t2 = t2.Replace("-", "");
            t2 = t2.ToLower();
             return t2;
         }


        // MD5　32位加密
       static  string UserMd5(string str)
        {
            string cl = str;
            string pwd = "";
             MD5 md5 = MD5.Create();//实例化一个md5对像
            // 加密后是一个字节类型的数组，这里要注意编码UTF8/Unicode等的选择　
            byte[] s = md5.ComputeHash(Encoding.UTF8.GetBytes(cl));
            // 通过使用循环，将字节类型的数组转换为字符串，此字符串是常规字符格式化所得
            for (int i = 0; i < s.Length; i++)
            {
                // 将得到的字符串使用十六进制类型格式。格式后的字符是小写的字母，如果使用大写（X）则格式后的字符是大写字符
                 pwd = pwd + s[i].ToString("X");
                
             }
            return pwd;
         }
     }
}


using System.Security.Cryptography;
using System.Text;

public static string StringToMD5Hash(string inputString)
        {
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            byte[] encryptedBytes = md5.ComputeHash(Encoding.ASCII.GetBytes(inputString));
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < encryptedBytes.Length; i++)
            {
                sb.AppendFormat("{0:x2}", encryptedBytes[i]);
            }
            return sb.ToString();
        }
```


