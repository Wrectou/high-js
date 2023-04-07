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

##### 3、特殊解析 - composite合成

> 默认情况下，标准文档流中的内容都绘制在同一个图层上。一些特殊的属性会创建新的合成层，新的图层可以利用GPU来加速绘制且是单独渲染，我们可以讲布局元素绘制到多个图层来进行优化。
>
> 形成新图层的属性：3D transforms、video、canvas、iframe、opactiy动画转换时、position:fixed、will-change等
>
> 分层确实可以提高性能、但是它以内存管理为代价、因此不作为web性能优化策略过度使用。

##### 4、script元素和页面解析的关系 defer async

> 1. 页面渲染过程中遇见JavaScript会怎样？
>
>    - 不能继续构建DOM Tree；
>    - 下载然后执行JavsScript脚本；
>    - 脚本执行完毕后，继续解析HTML，构建DOM Tree。
>
> 2. 为何会这样做？
>
>    - JavaScript作用之一就是操作、修改DOM；
>    - 等待DOM Tree构建完成并且渲染后再执行JavaScript，会造成严重的回流和重绘，影响页面性能。
>
> 3. 带来新的问题，特别是现代化页面（SPA）开发：
>
>    - JavaScript往往比HTML页面重，处理时间更长；
>    - 造成页面解析阻塞，在JavaScript下载执行完之前，用户界面上啥也看不到，白屏。
>
> 4. async属性和defer属性：
>
>    相同点：脚本都由浏览器进行下载，且不会阻塞DOM Tree的构建；
>
>    不同点：
>
>    - defer属性能保证在DOMContentLoaded事件之前执行defer中的代码，async属性不能保证在DOMContentLoaded事件之前或之后执行；
>    - 多个带有defer属性的脚本可以保证正确的执行顺序，async属性不能保证执行顺序，它独立下载运行，不会等待；
>    - defer通常用于需要在文档解析后操作DOM的JavaScript代码，并且对多个script文件有顺序要求的，async通常用于独立的脚本，对其他脚本，甚至DOM没有依赖的。
