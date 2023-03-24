var name = "window";

var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};

function sayName() {
  var sss = person.sayName;

  sss();    // window ✅

  person.sayName();   // person ✅

  (person.sayName)();   // window ❌ person

  (b = person.sayName)();   // window ✅
}

sayName();
