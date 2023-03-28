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
> 	console.log("test1: ", this);
> 	test2();		// test2: Window
> }
> function test2() {
> 	console.log("test2: ", this);
> 	test3();		// test3: Window
> }
> function test3() {
> 	console.log("test3: ", this);
> }
> test1();		// test1: Window
> 
> // 案例三
> function foo(func) {
> 	func()
> }
> var obj = {
> 	name: "obj",
> 	bar: function() {
>   	console.log("bar: ", this);
> 	}
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
> 	name: "why",
> 	foo: foo
> }
> obj.foo();		// foo: obj {name: 'why', foo: ƒ}
> 
> // 案例二
> function foo() {
> 	console.log("foo: ", this);
> }
> var obj1 = {
> 	name: "obj1",
> 	foo: foo
> }
> var obj2 = {
> 	name: "obj2",
> 	obj1: obj1
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

> 如果我们不希望在对象内部包含这个函数的引用，同时又希望在这个对象上进行强制调用，就可以使用call、apply或bind方法，因为上面的过程，我们明确的绑定了this指向的对象，所以称之为显式绑定。
>
> 1. call和apply的对比：
>
>    - 第一个参数是相同的，都要求传入一个对象；（这个对象就是给this准备的，在调用这个函数时会将this绑定到这个传入的对象上）
>
>    - 后面的参数不同，apply为数组，call为参数列表。
>
>      ```funciton.apply(thisArg, [argsArray])```
>
>      ```funciton.call(thisArg, arg1, arg2, ...)```
>
> 2. bind：创建并返回一个新的绑定函数，在被调用时这个新函数的this被指定为bind的的第一个参数，其余参数列表将作为新函数的参数。
>
>    ```const bar = funciton.bind(thisArg, arg1, arg2, ...)```
>
> ```javascript
> // 案例一
> var obj = {
> 	name: "why"
> }
> function foo() {
>  	console.log("foo:", this)
> }
> obj.foo = foo
> // 执行函数, 并且函数中的this指向obj对象
> // obj.foo()		// foo: {name: "why", foo: ƒ}
> // 执行函数, 并且强制this就是obj对象
> foo.call(obj)		// foo: {name: "why", foo: ƒ}
> foo.call(123)		// foo: {Number: 123}
> foo.call("abc")		// foo: {String: "abc"}
> 
> // 案例二 call/apply
> function foo(name, age, height) {
>   console.log("foo:", this)
>   console.log("参数:", name, age, height)
> }
> // ()调用
> foo("why", 18, 1.88)		// foo: Window 参数："why", 18, 1.88
> var obj = { name: "obj" }
> // apply 第一个参数: 绑定this, 第二个参数: 传入额外的实参, 以数组的形式
> // foo.apply(obj, ["kobe", 30, 1.98])		// foo: {name:"obj"} 参数："kobe", 30, 1.98
> // foo.apply("apply", ["kobe", 30, 1.98])		// foo: {String:"apply"} 参数："kobe" ...
> // call 第一个参数: 绑定this, 参数列表: 后续的参数以多参数的形式传递, 会作为实参
> foo.call(obj, "zhangsan", 33, 1.9)		// foo: {name:"obj"} 参数："zhangsan", 33, 1.9
> foo.call("call", "james", 25, 2.05)		// foo: {String:"call"} 参数："james", 25, 2.05
> 
> // 案例三 bind
> function foo(name, age, height, address) {
>   console.log("foo:", this)
>   console.log("参数:", name, age, height, address)
> }
> var obj = { name: "why" }
> // 需求: 调用foo时, 总是绑定到obj对象身上(不希望obj对象身上有函数)
> // 1.bind函数的基本使用
> // var bar = foo.bind(obj)
> // bar() // this -> obj		// foo: {name:"why"} undefined undefined ...
> // 2.bind函数的其他参数(了解)
> var bar = foo.bind(obj, "kobe", 18, 1.88)
> bar("usa")		// foo: {name:"why"} 参数："kobe", 18, 1.88, "usa"
> ```

##### 2.4、new绑定：

> JavaScript中的函数可以当作构造函数来使用，也就是使用new关键字。
>
> new的步骤：
>
> 1. 创建一个新的空对象；
> 2. 继承父类原型上的方法（将空对象的```__proto__```属性指向构造函数的原型对象）；
> 3. 添加父类的属性到新的对象上并初始化. 保存方法的执行结果；
> 4. 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象。
>
> ```javascript
> function Foo() {
>   this.name = "why"
>   console.log("foo:", this)
> }
> new Foo()		// foo: {name: 'why'}
> ```

##### 3、内置函数调用规则：

> ```html
> <!DOCTYPE html>
> <html lang="en">
> <head>
>   <meta charset="UTF-8">
>   <meta http-equiv="X-UA-Compatible" content="IE=edge">
>   <meta name="viewport" content="width=device-width, initial-scale=1.0">
>   <title>08_内置函数的调用绑定</title>
> </head>
> <body>
>   <button>按钮</button>
>   <script>
>     // 内置函数(第三方库): 根据一些经验
>     // 1.定时器
>     // setTimeout(function() {
>     //   console.log("定时器函数:", this);    // Window
>     // }, 1000)
>     // setTimeout(() => {
>     //   console.log(this);    // Window
>     // }, 2000)
>     // 2.按钮的点击监听
>     // var btnEl = document.querySelector("button")
>     // btnEl.onclick = function() {
>     //   console.log("btn的点击:", this);    // <button>按钮</button>
>     // }
>     // btnEl.addEventListener("click", function() {
>     //   console.log("btn的点击:", this);    // <button>按钮</button>
>     // })
>     // var btnEl = document.getElementsByTagName("button")
>     // btnEl[0].onclick = () => {
>     //   console.log(this);    // Window
>     // }
>     // btnEl[0].addEventListener("click", () => {
>     //   console.log(this);    // Window
>     // })
>     // 3.forEach
>     // var names = ["abc", "cba", "nba"]
>     // names.forEach(function(item) {
>     //   console.log("forEach:", this);    // {String: "aaaa"}
>     // }, "aaaa")
>     var arr = [1,2,3]
>     arr.forEach(function(item) {
>       console.log(this);    // Window
>     })
>     arr.forEach(item => {
>       console.log(this);    // Window
>     })
>     arr.forEach(function(item) {
>       console.log(this);    // {name: "name"}
>     }, {name:'name'})
>     arr.forEach(item => {
>       console.log(this);    // Window
>     }, 111)
>   </script>
> </body>
> </html>
> ```

##### 4、this绑定规则优先级：

> new > bind > apply/call > 隐式绑定 > 默认绑定
>
> ```javascript
> function foo() {
>    console.log("foo:", this)
> }
> // 1.显式绑定的优先级高于隐式绑定
> // 1.1.测试一: apply高于默认绑定
> // var obj = { foo: foo }
> // obj.foo.apply("abc")    // {String: "abc"}
> // 1.2.测试二: bind高于默认绑定
> // var bar = foo.bind("aaa")
> // // bar()   // {String: "aaa"}
> // var obj = {
> //   name: "why",
> //   baz: bar
> // }
> // obj.baz()   // {String: "aaa"}
> 
> // 2.new绑定优先级高于隐式绑定
> // var obj = {
> //   name: "why",
> //   foo: function() {
> //     console.log("foo:", this)
> //     console.log("foo:", this === obj)
> //   }
> // }
> // new obj.foo()   // {} /n false
> 
> // 3.new绑定 vs 显式绑定
> // 3.1. new不可以和apply/call一起使用
> // function foo() {
> //   console.log("foo:", this)
> // }
> // new foo.apply('ds')   // foo.apply is not a constructor
> // new foo.call('ds')   // foo.call is not a constructor
> // 3.2. new优先级高于bind
> // function foo() {
> //   console.log("foo:", this)
> // }
> // var bindFn = foo.bind("aaa")
> // bindFn()    // {String: "aaa"}
> // new bindFn()    // {}
> 
> // 4.bind/apply优先级
> // bind优先级高于apply/call
> // function foo() {
> //   console.log("foo:", this)
> // }
> // var bindFn = foo.bind("aaa")
> // bindFn()    // {String: "aaa"}
> // bindFn.call("bbb")    // {String: "aaa"}
> ```

##### 5、规则之外的情况：

> - 显式绑定null/undefined，使用的规则是默认绑定；
> - 间接函数引用，使用的规则是默认绑定；
>
> ```javascript
> // 1.情况一: 显式绑定null/undefined, 那么使用的规则是默认绑定
> // function foo() {
> //   console.log("foo:", this)
> // }
> // foo.call(123)		// foo: {Number: 123}
> // foo.apply("abc")		// foo: {String: "abc"}
> // foo.apply(null)		// foo: Window
> // foo.apply(undefined)		// foo: Window
> 
> // 2.情况二: 间接函数引用
> var obj1 = {
> 	name: "obj1",
> 	foo: function() {
>   	console.log("foo:", this)
> 	}
> }
> var obj2 = {
> 	name: "obj2"
> };
> obj2.foo = obj1.foo;
> obj2.foo();		// foo: {name: "obj2", foo: f}
> (obj2.foo = obj1.foo)()		// Window
> ```

##### 6、箭头函数的使用：

> 箭头函数 (arrow function) 是ES6之后增加的一种新的编写函数的方法。
>
> - 没有this和arguments属性；
> - 不能作为构造函数来使用。
>
> ```javascript
> // 1.之前的方式
> function foo1() {}
> var foo2 = function(name, age) {
>   console.log("函数体代码", this, arguments, name, age)
> }
> // 2.箭头函数完整写法
> var foo3 = (name, age) => {
>   console.log("箭头函数的函数体", this, arguments, name, age)
> }
> // 3.箭头函数的练习
> // 3.1. forEach
> var names = ["abc", "cba", "nba"]
> names.forEach((item, index, arr) => {
>   console.log(item, index, arr)
> })
> // 3.2. setTimeout
> setTimeout(() => {
>   console.log("setTimeout")
> }, 3000)
> 
> // 箭头函数的简写
> var names = ["abc", "cba", "nba"]
> var nums = [20, 30, 11, 15, 111]
> // 1.优化一: 如果箭头函数只有一个参数, 那么()可以省略
> // names.forEach(item => {
> //   console.log(item)
> // })
> // 2.优化二: 如果函数体中只有一行执行代码, 那么{}可以省略
> // names.forEach(item => console.log(item))
> // 一行代码中不能带return关键字, 如果省略, 需要带return一起省略(下一条规则)
> // var newNums = nums.filter(item => {
> //   return item % 2 === 0
> // })
> // 3.优化三: 只有一行代码时, 这行代码的表达式结果会作为函数的返回值默认返回的
> // var newNums = nums.filter(item => item % 2 === 0)
> // 4.优化四: 如果默认返回值是一个对象, 那么这个对象必须加()
> // var arrFn = () => ["abc", "cba"]
> // var arrFn = () => ({ name: "why" })
> // console.log(arrFn())
> 
> // 箭头函数实现nums的所有偶数平方的和
> var nums = [20, 30, 11, 15, 111]
> var result = nums.filter(item => item % 2 === 0)
> 								 .map(item => item * item)
> 								 .reduce((prevValue, item) => prevValue + item)
> console.log(result)
> ```

##### 7、箭头函数中的this:

> ```javascript
> // 1.普通函数中是有this的标识符
> // function foo() {
> //   console.log("foo", this)
> // }
> // foo()   // Window
> // foo.apply("aaa")    // {String: "aaa"}
> // 2.箭头函数中, 压根没有this
> // var bar = () => {
> //   console.log("bar:", this)
> // }
> // bar()   // Window
> // 通过apply调用时, 也是没有this
> // bar.apply("aaaa")   // Window
> // console.log("全局this:", this)
> // var message = "global message"
> // 3.this的查找规则
> // var obj = {
> //   name: "obj",
> //   foo: function() {
> //     var bar = () => {
> //       console.log("bar:", this)
> //     }
> //     return bar
> //   }
> // }
> // var fn = obj.foo()
> // fn.apply("bbb")   // Window
> ```

8、箭头函数中this的应用:

> ```javascript
> // 网络请求的工具函数
> function request(url, callbackFn) {
>   var results = ["abc", "cba", "nba"]
>   callbackFn(results)
> }
> // 实际操作的位置(业务)
> var obj = {
>   names: [],
>   network: function() {
>     // 1.早期的时候
>     // var _this = this
>     // request("/names", function(res) {
>     //   _this.names = [].concat(res)
>     // })
>     // 2.箭头函数写法
>     request("/names", res => {
>       this.names = [].concat(res)
>     })
>   }
> }
> obj.network()
> console.log(obj)
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







