### 浏览器运行原理-JS运行原理

------

##### 1、网页的渲染过程

> - HTML 解析器 --> DOM Tree
> - CSS 解析器 --> CSSOM Tree
> - 生成 Render Tree
> - 进行 layout 布局
> - 进行 paint 绘制
> - 显示网页
>
> 注意：
> 1. link元素不会阻塞DOM Tree的构建过程，但是会阻塞Render Tree的构建过程；
> 2. Render Tree和DOM Tree并不是一一对应的关系；（display为none的元素，不会出现在Render Tree中）
> 3. 第四步是在Render Tree上运行Layout布局以计算每个节点的几何体；
>    - Render Tree会表示显示哪些节点以及其他样式，但是不表示每个节点的尺寸、位置等信息；
>    - 布局是确定呈现树中所有节点的宽度、高度和位置信息；。
> 4. 第五步是将每个节点Paint绘制到屏幕上；
>    - 在绘制阶段，浏览器将布局阶段计算的每个frame转为屏幕上实际的像素点； 
>    - 包括将元素的可见部分进行绘制，比如文本、颜色、边框、阴影、替换元素（比如img）。

##### 2、回流和重绘

> 1. 回流 reflow（也称作重排）：
>
>    - 第一次确定节点元素的大小和位置，称为layout布局；
>
>    - 之后对节点的大小、位置修改重新计算称为回流。
>
> 2. 什么情况下会引起回流？
>
>    - DOM结构发生改变；（添加或移除节点）
>    - 改变了布局；（修改了width、height、padding、font-size等的值）
>    - 改变了窗口大小；（修改了窗口大小 resize ）
>    - 调用了 getComputedStyle 方法获取尺寸、位置信息。
>
> 3. 重绘 repaint ：
>
>    - 第一次渲染内容，称为paint绘制；
>    - 之后重新渲染称为重绘。
>
> 4. 什么情况下会引起重绘？
>
>    - 比如修改background-color、color、border-color等。
>
> **回流一定会引起重绘，所以回流是一件很消耗性能的事情，在开发中尽量避免发生回流：**
>
> - 修改样式时尽量一次性修改；（比如通过cssText修改，通过添加class修改）
> - 尽量避免频繁的操作DOM；（可以在DocumentFragment或者父元素中将DOM操作完成，再一次性的操作）
> - 尽量避免通过getComputedStyle获取尺寸、位置等信息；
> - 对某些元素使用position的absolute或者fixed。（还是会引起回流，开销相对较小，不对其他元素造成影响）
