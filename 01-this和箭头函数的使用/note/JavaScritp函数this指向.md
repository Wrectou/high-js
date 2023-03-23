### JavaScritp函数this指向
------

##### 1、this 的指向到底是什么？

> - 函数调用时，JavaScript会默认给this绑定一个值；
> - this的绑定和<font color="#F56C6C">定义(编写)的位置无关</font>；
> - this的绑定与<font color="#F56C6C">调用方式以及调用的位置有关</font>；
> - this是<font color="#F56C6C">在运行时被绑定的</font>。

##### 2、this 的绑定规则：

> - 默认绑定；
> - 隐式绑定；
> - 显式绑定；
> - new绑定。

##### 2.1、默认绑定：

> 独立的函数调用我们称之为默认绑定。
> ```javascript
> // 案例一
> function foo() {
> 	console.log("foo: ", this);
> }    
> foo();		// foo: Window
> 
> // 案例二
> function test1() {
>   	console.log("test1: ", this);
>   	test2();		// test2: Window
> }
> function test2() {
>   	console.log("test2: ", this);
>   	test3();		// test3: Window
> }
> function test3() {
>   	console.log("test3: ", this);
> }
> test1();		// test1: Window
> 
> // 案例三
> function foo(func) {
>   	func()
> }
> var obj = {
>    	name: "obj",
>    	bar: function() {
>      	console.log("bar: ", this);
>    	}
> }
> foo(obj.bar);		// bar: Window
> ```

##### 2.2、隐式绑定：

> 通过某个对象发起的函数调用我们称之为隐式绑定。
>
> ```javascript
> // 案例一
> function foo() {
> 	console.log("foo: ", this);
> }
> var obj = {
>   	name: "why",
>   	foo: foo
> }
> obj.foo();		// foo: obj {name: 'why', foo: ƒ}
> 
> // 案例二
> function foo() {
> 	console.log("foo: ", this);
> }
> var obj1 = {
>   	name: "obj1",
>   	foo: foo
> }
> var obj2 = {
>   	name: "obj2",
>   	obj1: obj1
> }
> obj2.obj1.foo();		// foo: obj1 {name: 'obj1', foo: ƒ}
> 
> // 案例三
> function foo() {
> 	console.log("foo: ", this);
> }
> var obj1 = {
> 	name: "obj1",
> 	foo: foo
> }
> var bar = obj1.foo;
> bar();		// foo: Window
> ```

##### 2.3、显式绑定：

> 通过某个对象发起的函数调用我们称之为隐式绑定。
>
> ```javascript
> // 案例一
> function foo() {
> 	console.log("foo: ", this);
> }
> var obj = {
> 	name: "why",
> 	foo: foo
> }
> obj.foo();		// foo: obj {name: 'why', foo: ƒ}
> ```













## 一. this的绑定规则

### 1.1. 绑定规则

* 默认绑定
* 隐式绑定
* 显式绑定
* new绑定



### 1.2. 显式绑定

* apply/call
* bind



### 1.3. 内置函数的规则

* 经验



### 1.4. 规则的优先级

* new
* bind
* apply/call
* 隐式绑定
* 默认绑定



### 1.5. 规则之外的情况

* undefined/null
* 间接函数引用(了解)





## 二. 箭头函数的使用

### 2.1. 箭头函数的写法

* 基本写法
* 优化写法
  * 只有一个参数时, 可以省略()
  * 只有一行代码时, 可以省略{}
  * 只要一行代码时, 表达式的返回值会作为箭头函数默认返回值, 所以可以省略return
  * 如果箭头函数默认返回的是对象, 在省略{}的时候, 对象必须使用()包裹 () => ({name: "why"})



### 2.2. 箭头函数中的this

* 箭头函数是没有绑定this
* this的查找规则:
  * 去上层作用域中查找this
  * 直到找到全局this



### 2.3. 箭头函数this应用

* 模拟网络请求
* 不好理解: 回调(好好理解一下)
  * 函数传来传去







