### JavaScript对象的增强知识

------

##### 1、对属性操作的控制

> 在前面我们的属性都是直接定义在对象上，或者添加到对象内部的。这样一来我们就不能对这个属性进行一些限制，比如这个属性是否是可以通过delete删除，这个属性是否在for-in遍历的时候被遍历出来呢?
>
> ```javascript
>var obj = {
>   name: "zhangsan",
>   age: 26,
>   height: 1.7
> }
> ```
> 
>如果我们想要对一个属性进行比较精准的操作控制，那么我们就可以使用属性描述符：
> 
>- 通过属性描述符可以精准的添加或修改对象的属性；
> - 属性描述符需要使用```Object.defineProperty()```来对属性进行添加或者修改;



##### 2、Object.defineProperty

> ```Object.defineProperty()```方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
>
> ```javascript
> Object.defineProperty(obj, prop, descriptor)
> // obj要定义属性的对象; 
> // prop要定义或修改的属性的名称或Symbol;
> // descriptor要定义或修改的属性描述符对象。
> // 返回值：被传递给函数的对象。
> ```



##### 3、属性描述符分类

> 属性描述符的类型有两种：
>
> - 数据属性(Data Properties)描述符(Descriptor)；
> - 存取属性(Accessor访问器 Properties)描述符(Descriptor);
>
> |            | configurable | enumerable | value  | writable | get    | set    |
> | ---------- | ------------ | ---------- | ------ | -------- | ------ | ------ |
> | 数据描述符 | 可以         | 可以       | 可以   | 可以     | 不可以 | 不可以 |
> | 存取描述符 | 可以         | 可以       | 不可以 | 不可以   | 可以   | 可以   |



4、
