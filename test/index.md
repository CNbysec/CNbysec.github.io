# Test


<!--more-->

## Markdown 基本语法

这部分内容在 [Markdown 基本语法页面](../basic-markdown-syntax/) 中介绍.

## Markdown 扩展语法 {#extended-markdown-syntax}

**DoIt** 主题提供了一些扩展的语法便于你撰写文章.

### Emoji 支持

这部分内容在 [Emoji 支持页面](../emoji-support/) 中介绍.

### 数学公式

**DoIt** 基于 [$ \KaTeX $](https://katex.org/) 提供数学公式的支持.

在你的 [网站配置](../theme-documentation-basics#site-configuration) 中添加如下设置来启用数学公式支持：

```toml {title="hugo.toml"}
[markup]
  [markup.goldmark]
    [markup.goldmark.extensions]
      [markup.goldmark.extensions.passthrough]
        enable = true
        [markup.goldmark.extensions.passthrough.delimiters]
          block = [['\[', '\]']]
          inline = [['\(', '\)']]
[params]
  [page]
    [page.math]
      enable = true
      blockLeftDelimiter = '\['
      blockRightDelimiter = '\]'
      inlineLeftDelimiter = '\('
      inlineRightDelimiter = '\)'
      copyTex = true
      mhchem = true
```

{{< admonition tip >}}
这是一份 [$ \KaTeX $ 中支持的 $ \TeX $ 函数](https://katex.org/docs/supported.html) 列表。
{{< /admonition >}}

#### 公式块

默认的公式块分割符是 `\[ \]`：

```markdown {linenos=false}
\[ c = \pm\sqrt{a^2 + b^2} \]

\[ f(x)=\int_{-\infty}^{\infty} \hat{f}(\xi) e^{2 \pi i \xi x} d \xi \]
```

呈现的输出效果如下：

\[ c = \pm\sqrt{a^2 + b^2} \]

\[ f(x)=\int_{-\infty}^{\infty} \hat{f}(\xi) e^{2 \pi i \xi x} d \xi \]

#### 行内公式

默认的行内公式分割符是 `\( \)`：

```markdown
\( c = \pm\sqrt{a^2 + b^2} \) and \( f(x)=\int_{-\infty}^{\infty} \hat{f}(\xi) e^{2 \pi i \xi x} d \xi \)
```

呈现的输出效果如下:

\( c = \pm\sqrt{a^2 + b^2} \) and \( f(x)=\int_{-\infty}^{\infty} \hat{f}(\xi) e^{2 \pi i \xi x} d \xi \)

#### Copy-tex

**[Copy-tex](https://github.com/Khan/KaTeX/tree/master/contrib/copy-tex)** 是一个 **$ \KaTeX $** 的插件.

通过这个扩展, 在选择并复制 $ \KaTeX $ 渲染的公式时, 会将其 $ \LaTeX $ 源代码复制到剪贴板.

在你的 [网站配置](../theme-documentation-basics#site-configuration) 中的 `[params.math]` 下面设置属性 `copyTex = true` 来启用 Copy-tex.

选择并复制上一节中渲染的公式, 可以发现复制的内容为 LaTeX 源代码.

#### mhchem

**[mhchem](https://github.com/Khan/KaTeX/tree/master/contrib/mhchem)** 是一个 **$ \KaTeX $** 的插件.

通过这个扩展, 你可以在文章中轻松编写漂亮的化学方程式.

在你的 [网站配置](../theme-documentation-basics#site-configuration) 中的 `[params.math]` 下面设置属性 `mhchem = true` 来启用 mhchem.

```markdown
\[ \ce{CO2 + C -> 2 CO} \]

\[ \ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-} \]
```

呈现的输出效果如下:

\[ \ce{CO2 + C -> 2 CO} \]

\[ \ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-} \]

### 字符注音或者注释 {#ruby}

**DoIt** 主题支持一种 **字符注音或者注释** Markdown 扩展语法:

```markdown
[Hugo]{?^}(一个开源的静态网站生成工具)
```

呈现的输出效果如下:

[Hugo]^(一个开源的静态网站生成工具)

### 分数 {#fraction}

{{< version 0.2.0 >}}

**DoIt** 主题支持一种 **分数** Markdown 扩展语法:

```markdown
[浅色]{?/}[深色]

[99]{?/}[100]
```

呈现的输出效果如下:

[浅色]/[深色]

[90]/[100]

