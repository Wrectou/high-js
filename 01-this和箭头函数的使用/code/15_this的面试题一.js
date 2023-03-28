var name = "window1";

var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};

function sayName() {
  var sss = person.sayName;

  sss();    // window1 ✅

  person.sayName();   // person ✅

  (person.sayName)();   // window1 ❌ 

  (b = person.sayName)();   // window1 ✅
}

sayName();
