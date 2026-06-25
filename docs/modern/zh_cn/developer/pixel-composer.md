---
title: Pixel Composer 基础入门
order: 2
---

[Pixel Composer](https://pixel-composer.com) 是一款用于制作2D和3D美术素材的工具，本整合包使用它制作了各种动画纹理，包括新Logo！ 由于网上文档资料有限，我特此编写本文分享相关知识。

<h1 align="center">基础入门</h1>
<p align="center">让我们来解析各个界面元素</p>
<p align="center">
  <img width="1440" height="720" alt="full" src="https://github.com/user-attachments/assets/14cbcb75-e44b-4e5b-80ef-9c8ee8ed6472" />
</p>

<h2 align="center">A) 预览窗口</h2>
<p align="center"> 
预览窗口用于显示当前选中的节点效果。 双击节点，或右键点击节点选择"发送到预览"，即可查看该节点的预览效果。 使用"画布"工具时，预览窗口也是您的绘制区域。
</p>

<p align="center">
  <img width="420" height="740" alt="preview" src="https://github.com/user-attachments/assets/a52b6048-b9d3-4757-be48-24b7b98211ab" />
</p>

**1\) 平铺显示**

> 需要注意的是，开启平铺选项可以预览纹理的平铺效果。

<h2 align="center">B) 工作区</h2>
<p align="center"> 
工作区是您将各个节点连接起来以生成图像的地方。 在空白处右键点击即可添加所需节点。 虽然节点类型繁多，但我们将重点介绍2D图像相关的基础节点。
</p>

<p align="center">
  <img width="1440" height="190" alt="basics" src="https://github.com/user-attachments/assets/50d08602-4ef3-4f03-97f8-ae4d2c7c08ba" />
</p>

**1\) Noise 噪波**

> 噪波图案是制作程序化纹理的得力工具。 部分噪波可无缝平铺，部分则不能；有些可设置为循环动画，有些则无法实现。 多尝试不同噪波类型以找到理想效果。

**2\) Transform 变换**

> 变换节点支持基础变换操作，如平移、缩放、旋转等。

**3\) Colorize 色彩化**

> 色彩化节点用于颜色调整，您可以使用渐变或调色板为节点重新着色。

**4\) Composite 合成**

> 合成节点的工作原理类似Photoshop等美术软件中的图层功能。

**5\) Color Adjust 颜色调整**

> 颜色调整节点支持各类基础图像编辑功能，如调整不透明度、色相、饱和度、对比度等。

**6\) Render Spritesheet 渲染精灵图**

> 渲染精灵图节点将时间轴中的所有帧排列为单张图像。 您可以在节点面板中控制帧的排列顺序。

**7\) Export 导出**

> 导出节点将输入节点转换为指定文件格式并保存至本地。

<h2 align="center">C) 节点面板</h2>
<p align="center">节点面板是您调整各节点参数的主要工作区域。</p>

<p align="center">
<img width="480" height="872" alt="tools" src="https://github.com/user-attachments/assets/678684fd-d345-4cba-8f50-a9e37a78955d" />
</p>

**1\) Animation 动画**

> 沙漏状按钮用于在时间轴中启用当前设置的动画功能。

**2\) Visibility 可见性**

> 眼睛状按钮可控制当前设置是否在预览中显示

**3\) Mapping 映射**

> 骰子状按钮将切换当前设置的映射功能，允许您通过节点调整其数值。

<h2 align="center">D) 时间轴</h2>
<p align="center"> 
时间轴通过关键帧控制动画效果。 按空格键可播放时间轴。 部分节点（如"渲染精灵图"）需要时间轴播放才能正常工作。
</p>

<p align="center">
<img width="1440" height="220" alt="timeline" src="https://github.com/user-attachments/assets/0de1a039-c9bf-4f56-9350-61c872a7f972" />
</p>

**1\) Settings 设置**

> 重要提示：时间轴长度和帧率需在右下角的设置菜单中调整。 注意帧率设置仅影响预览效果。 导出帧率需在导出节点面板中单独设置。

> ### TODO:
>
> 将图片文件替换为链接形式。