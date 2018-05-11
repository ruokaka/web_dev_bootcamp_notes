var yuruo = {
    firstName: "Yuruo",
    sayHi = function(){
        setTimeout(function(){
            console.log("hi" + this.firstName)
        }, 3000)
    }
}

///since setTimeout() was called a later point in time, the object it attached to is actually the window instead of the yuruo obj, even 
///though it's in the object when declared, it's not in the object when executed
/// 'this' in this context refers to the global variable
//it should be

var peihao = {
    firstName: "Peihao",
    sayHi = function(){
        setTimeout(function(){
            console.log("hi" + this.firstName)
        }.bind(this), 3000)
    }
}
yuruo.sayHi() //hi undefined
peihao.sayHi() // hi Peihao

//=======================================================
function Person(name, age){
    this.name = name;
    this.age = age;
    this.sayHi = function(){
        console.log("Hi, My name is " + this.name);
    }
}
//====================================================
//multiple constructors
function Car(make, model){
    this.make  = make;
    this.model = model;
}

function Moto(make, model){
    Car(make, model); // not right, since now the 'this' in the constructor will be the car func not the moto func
    ////should do
    Car.call(this, make, model);
    // this.make = make;
    // this.model = model;
    //if use apply
    Car.apply(this, [make, model]) // OR EVEN SIMPLER
    Car.apply(this, arguments); ///arguments = all the args when calling the function
}
//
//we mimic the oop idea by using functions since js doesn't class built in 

//=============================
//prototypes __proto__, prototype and constructor

function Person(name){
    this.name = name;
    this.sayHi = function(){
        console.log("hi, i'm " + this.name);
    }
}
//^ this is not efficient, every time we make an obj using the new word we have to redefine the function
//we can instead put it on the prototype instead

function Person(name){
    this.name = name;
}

Person.prototype.sayHi = function(){
    console.log("hi, i'm " + this.name);
}

yuruo = new Person('yuruo');
yuruo.sayHi();


function Vehicle(make){
    this.make = make;
    this.isRunning = false;
}

Vehicle.prototype.turnOn = function(){
    this.isRunning = true;
};

Vehicle.prototype.Off = function(){
    this.isRunning = false;
};

Vehicle.prototype.Beep = function(){
    if(this.isRunning){
        console.log("beep");
    }
};

///===================================================CLOSURES!!!!!
//use a closure to emulate a private variable
// A closure is a function that uses a variable that is defined in outer functions that have previously returned

function outer(){
    var data = "closure are ";
    return function inner(){
        var innerData = "awesome";
        return data  + innerData;
    }
}
/// calling the outer function by outer(), and it returns the function defination of the inner(). Do outer()(), it's printing
// 'closures are awesome' meaning the inner() can still use the variable of outer, which has already returned

function outer(a){
    return function inner(b){
        return a + b;
    }
}

outer(5)(5) // 10

var storeOuter = outer(5)
storeOuter(10) //  15


//**we have to return the outer function for closure to work */
// when to use Closures?
// private variable -- since we dont have private variable built in with Js, use closure to emulate this functionality

function counter(){
    var count = 0
    //anoymous function
    return function(){
        return count ++;
    }
}


counter1 = counter()
counter1() // 1
counter1() // 2

counter2 = counter()
counter2() //1
counter2() //2

counter1() //3

count //undefined: private


function classRoom(){
    var instructors = ["yuruo", "peihao"];

    return {
        getInstructors : function(){
            return instructors;
        },
        addInstructor: function(i){
            instructors.push(i);
            return instructors;
        }
    }
}

cs1 = classRoom()
cs1.add