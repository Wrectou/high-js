### JavaScript函数的增强知识

------

##### 1、函数对象的属性

> JavaScript中函数也是一个对象，那么函数也就拥有属性和方法。
>
> - name属性：函数的名字可以通过name属性来获得；
>
> 	```javascript
> 	function foo() { }
> 	console.log(foo.name)		// foo
> 	var bar = function() { }
> 	console.log(bar.name)		// bar
> 	```
>
> - length属性：用于返回<font color="#F56C6C">函数形参</font>的个数；
>
>   - 默认参数不计入参数的个数;
>   - rest参数不计入参数的个数;
>
>   ```javascript
>   function foo(a, b, c) { }
>   var bar = function(m, n, ...args) { }
>   function test(a, b = 2, ...args) { }
>   test(111, 222, 333)
>   console.log(foo.length)		// 3
>   console.log(bar.length)		// 2
>   console.log(test.length)		// 1
>   ```
>



##### 2、认识arguments

> arguments返回的是调用<font color="#F56C6C">函数实参</font>的类数组（array-like）对象。
>
> - 类数组意味着它不是一个数组类型，而是一个对象类型。
>   - 拥有数组的一些特征，比如length属性、可以通过index索引访问；
>   - 没有数组的方法，比如filter、map等。
>
> ```javascript
> function foo(a, b = 2, ...args) {
> 	console.log(arguments)
>   //	Arguments(5) [1, 2, 3, 3, 4, callee: (...), Symbol(Symbol.iterator): ƒ]
> 	console.log(typeof arguments, arguments instanceof Object)
>   //	"object" true
> 	console.log(arguments.length)
>   // 5
>   console.log(arguments[0])
>   // 1
>   console.log(arguments[4])
>   // 5
> }
> foo(1, 2, 3, 4, 5)
> ```



##### 3、arguments转换成Array

> 在开发中，我们经常需要将arguments转换成Array，以便使用数组的一些特性。
>
> 1. 方式一：遍历arguments，添加到一个新数组中；
>
> 2. 方式二：调用数组slice函数的call/apply方法；（了解）
>
> 3. 方式三：ES6中的两个方法。（ Array.form(arguments)、[...arguments] ）
>
> ```javascript
> function foo(a, b = 2, ...args) {
>   // 方式一
>   var argsArr1 = []
>   for (let i = 0; i < arguments.length; i++) {
>     argsArr1.push(arguments[i])
>   }
>   console.log("argsArr1: ", argsArr1)		// argsArr1: [1, 2, 3, 4, 5]
>   // 方式二
>   var argsArr2 = [].slice.call(arguments)
>   // var argsArr2 = Array.prototype.slice.apply(arguments)
>   console.log("argsArr2: ", argsArr2)		// argsArr2: [1, 2, 3, 4, 5]
>   // 方式三
>   var argsArr3 = [...arguments]
>   // var argsArr3 = Array.from(arguments)
>   console.log("argsArr3: ", argsArr3)		// argsArr3: [1, 2, 3, 4, 5]
> }
> foo(1, 2, 3, 4, 5)
> ```
>



##### 4、箭头函数不绑定arguments

> 箭头函数没有this，也是不绑定arguments的。所以在<font color="#F56C6C">箭头函数中使用arguments是会去上层作用域查找</font>的。
>
> ```javascript
> // 箭头函数不绑定arguments，上层作用域和window也没有，调用报错
> console.log(arguments)		// Uncaught ReferenceError: arguments is not defined
> var foo = (a, b, c) => {
>   console.log(arguments)		// Uncaught ReferenceError: arguments is not defined
> }
> foo(1, 2, 3)
> 
> // 函数的嵌套箭头函数，箭头函数获取的arguments是外层函数的
> function bar() {
>   console.log(arguments)		
>   // Arguments(2) [111, 222, callee: ƒ, Symbol(Symbol.iterator): ƒ]
>   var foo = () => {
>     console.log(arguments)
>     // Arguments(2) [111, 222, callee: ƒ, Symbol(Symbol.iterator): ƒ]
>   }
>   foo()
> }
> bar(111, 222)
> ```



##### 5、函数的剩余参数 rest paramenters

> ES6中引入了rest paramenter，可以将不定数量的函数实参放入到一个数组中。
>
> - 如果最后一个参数是以 ... 为前缀的，那么他会将剩余的参数作为一个数组放到该参数中；
>
> - **剩余参数必须放在最后一位**，否则会报错。
>
>   ```javascript
>   function foo(a, b, ...args) {
>   	console.log(a, b)		// 1, 2
>   	console.log(args)		// [3, "4", 5]
>   }
>   foo(1, 2, 3, "4", 5)
>   ```
>
> 剩余参数和arguments有什么区别呢？
>
> - 剩余参数只包含没有对应形参的实参，而arguments对象包含了所有实参；
> - 剩余参数是真正的数组，而arguments对象是一个伪数组；
> - arguments是早期ECMAScript中为了方便获取所有实参而提供的一个数据结构，而剩余参数是ES6中提供的希望替代arguments的。



##### 6、理解JavaScript纯函数

###### 6.1、什么是纯函数？

> 函数式编程中有一个非常重要的概念叫纯函数，JavaScript符合函数式编程的范式，所以也有纯函数的概念。
>
> 精简好理解的总结：
>
> - **确定的输入，一定会产生确定的输出；**
> - **函数执行的过程中，不能产生副作用。**
>
> 维基百科的定义：
>
> - 此函数在相同的输入值时，需产生相同的输出；
> - 函数的输出和输入值以外的其他隐藏信息或状态无关，也和由I/O设备产生的外部输出无关；
> - 该函数不能有语义上可观察的函数副作用，如“触发事件”，使输出设备输出，或更改输出值以外物件的内容。

###### 6.2、副作用的概念

> 表示在执行一个函数时，除了返回函数值之外，还对调用函数产生了附加的影响，比如修改了全局变量，修改参数或者改变外部的存储。纯函数的执行过程中是不能产生这样的副作用的，副作用往往是bug的温床。

###### 6.3、纯函数的案例

> ```javascript
> var names = ["abc", "cba", "nba", "dna"]
> // slice：截取数组时不会对原数组进行任何操作,而是生成一个新的数组;
> var sliceNames = names.slice(0, 2)
> console.log(sliceNames)		// ["abc", "cba"]
> console.log(names)		// ["abc", "cba", "nba", "dna"]
> // splice：splice截取数组, 会返回一个新的数组, 也会对原数组进行修改;
> var spliceNames = names.splice(0, 1)
> console.log(spliceNames)		// ["abc"]
> console.log(names)		// [cba", "nba", "dna"]
> 
> // 综上：slice就是一个纯函数，不会修改数组本身，而splice函数不是一个纯函数;
> ```

###### 6.4、纯函数的作用和优势：

> - 可以安心的编写、安心的使用；
> - 你在**写的时候**保证了函数的纯度，只是单纯实现自己的业务逻辑即可，不需要关心传入的内容是如何获得的或者依赖其他的 外部变量是否已经发生了修改;
> -  你在**用的时候**，你确定你的输入内容不会被任意篡改，并且自己确定的输入，一定会有确定的输出;
> -  React中就要求我们无论是**函数还是class声明一个组件**，这个组件都必须**像纯函数一样**，**保护它们的props不被修改:**



##### 7、理解JavaScript柯里化

###### 7.1、什么是柯里化？

> 柯里化也是函数式编程里面一个重要的概念，是一种函数的高阶技术，不仅用于JavaScript，还用于其他语言。
>
> 精简好理解的总结：
>
> - **只传递给函数一部分参数来调用它，让它返回一个函数去处理剩余的参数，这个过程就是柯里化；**
> - **柯里化不调用函数，是对函数进行转换，将一个函数从```foo(a,b,c)```调用转换成```foo(a)(b)(c)```调用。**
>
> 维基百科的定义：
>
> - 在计算机科学中，柯里化（Currying），又译为卡瑞化或加里化，是指把接收多个参数的函数，变成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数，而且返回 结果的新函数的技术；
> - 柯里化声称 “如果你固定某些参数，你将得到接受余下参数的一个函数”。

###### 7.2、柯里化的代码转换

```javascript
// 未柯里化的函数
function add(a, b, c) {
  return a + b + c
}
console.log(add(1, 2, 3))		// 6

// 柯里化处理的函数
function addCurring(a) {
  return function(b) {
    return function(c) {
      return a + b + c
    }
  }
}
console.log(addCurring(1)(2)(3))		// 6

// 精简版柯里化处理的函数
var addCurring = a => b => c => {
	return a + b + c
}
console.log(addCurring(1)(2)(3))		// 6
```

###### 7.3、柯里化的优势

> - 函数的职责单一
>   - 在函数式编程中，我们其实往往希望一个函数处理的问题尽可能的单一，而不是将一大堆的处理过程交给一个函数来处理; 
>   - 那么我们是否就可以将每次传入的参数在单一的函数中进行处理，处理完后在下一个函数中再使用处理后的结果;
>
> - 函数的参数复用
>
>   - makeAdder函数要求我们传入一个num(并且如果我们需要的话，可以在这里对num进行一些修改); 
>
>   - 在之后使用返回的函数时，我们不需要再继续传入num了;
>
>    ```javascript
>    // makeAdder函数就是对sum的柯里化
>    function makeAdder(count) {
>      function add(num) {
>        return count + num
>      }
>      return add
>    }
>    
>    // 1.数字和5相加
>    var adder5 = makeAdder(5)
>    adder5(10)
>    adder5(15)
>    
>    // 2.数组和10相加
>    var adder10 = makeAdder(10)
>    adder10(10)
>    adder10(19)
>    ```
>

###### 7.4、自动柯里化处理函数

```javascript
// 封装函数: 自动转化柯里化过程(有一点难度)
function curryHandle(fn) {
  function curryFn(...args) {
    // 两类操作:
    // 第一类操作: 继续返回一个新的函数, 继续接受参数
    // 第二类操作: 直接执行fn的函数
    if (args.length >= fn.length) { // 执行第二类
      return fn.apply(this, args)
    } else { // 执行第一类
      return function(...newArgs) {
        return curryFn.apply(this, args.concat(newArgs))
      }
    }
  }
  return curryFn
}

function foo(x, y, z) {
  console.log(x + y + z)
}
// 对其他的函数进行柯里化
var fooCurry = curryHandle(foo)
fooCurry(10)(20)(30)
// fooCurry(55)(12)(56)
// fooCurry(55, 12, 56)
```

