var name = 'window1'
var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    return () => {
      console.log(this.name)
    }
  }
}
var person2 = { name: 'person2' }

// 开始题目:
// person1.foo1();   // person1 ✅
// person1.foo1.call(person2);   // person2 ✅

// person1.foo2();   // person1 ✅ ❌ 对象没有作用域
// person1.foo2.call(person2);   // person1 ✅ ❌

// person1.foo3()();   // window1 ❌ ✅
// person1.foo3.call(person2)();   // person2 ❌ ❌
// person1.foo3().call(person2);   // person1 ✅ ❌

person1.foo4()();   // perons1 ✅
person1.foo4.call(person2)();   // person2 ✅
person1.foo4().call(person2);   //  perons1 ❌ ✅