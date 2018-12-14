const obj = {name: 'imooc', course: 'React development'}

console.log(Object.keys(obj));
console.log(Object.values(obj));

//把一个对象变成一个数组
console.log(Object.entries(obj));

//----------------------------------------数组解构赋值----------------------------------------
//ES5的赋值只能是单独一个赋值
const arr = ['hello', 'imooc']

const arg1 = arr[0]
const arg2 = arr[1]

console.log(`${arg1}  |  ${arg2}`)

//ES6 解构赋值
let [arg3, arg4] = arr
console.log(`${arg3}  %  ${arg4}`)

//----------------------------------------对象解构赋值----------------------------------------
const obj = {name: 'imooc', course: 'React development'}
const {name, course} = obj
console.log(name,'~~~',course);

//----------------------------------------class-----------------------------------------

class MyApp{
    constructor() {
        this.name = 'imooc'
    }
    sayHello() {
        console.log(`hello ${this.name}`)
    }
}
const app = new MyApp()
app.sayHello();


