function hello(name){
    console.log(`hello ${name} !`)
}

const hello1 = (name) => {
    console.log(`hello ${name} !`)
}

hello('imooc')
hello1('imooc')

setTimeout(() => {
    console.log(`dfsfgfg`)
},1000)

//如果只有一个参数，可以支持不用括号
const double3 = x => x*2
console.log(double3(4));

function double2(x) {
    return x*2
}
console.log(double2(3))

const hello1 = (name='imooc') => {
    console.log(`hello1 ${name}!`)
}
hello1()

//apply function
function addArrayToPara(name1, name2){
    console.log(name1,name2)
}
arr = ['imooc', 'May']
addArrayToPara.apply(null,arr)



//--------------------------------------------------------Different of call apply, and bind------------------------------------------------------------------------
//------------------call function------------------
const obj = {num:2};

//---this one work
// const addTothis = function(a){
//     return this.num + a;
// }

//---this one work
function addTothis(a){
    console.log(this);
    return this.num + a;
}

//---this one doesn't work, as the scope of this refers to windows
// const addTothis = (a) => {
//     console.log(this);
//     return this.num + a;
// }

//Syntax： functionname.call(obj, functionarguments)
var sum = addTothis.call(obj, 5);
console.log(sum);

//----------------------------------------------
//more than one parameter
//use call
const obj = {num:2};

const addTothis = function(a, b, c){
    return this.num + a + b + c;
    console.log(a,b,c)
}
var sum = addTothis.call(obj, 5 ,3, 6);
console.log(sum);

//use apply
var arr1 = [1,2,3]
var sum1 = addTothis.apply(obj, arr1);
console.log(sum1);

//use bind
var bound = addTothis.bind(obj);
console.dir(bound);
bound(1,2,3);
console.log(bound(1,2,3));


//----------------------------------------------
//this 在普通函数和箭头函数中的指代
//the code below doesn't work, as the scope of this refer to windows here rather than the obj
const obj2 = {
    username: 'May',
    hello: function(){
        console.log(this)
        return 'hello' + this.username
    }
 }
console.log(obj2.hello());

//the code below doesn't work, as the scope of this refer to windows here rather than the obj
const obj2 = {
    username: 'May',
    hello: ()=>{
        console.log(this)
        return 'hello' + this.username
    }
 }
console.log(obj2.hello());
//------------------------------------------


const showNum = function(a, b, c){
    console.log('apply'+ a,b,c)
}

arr = [2,4,5]
showNum.apply(null, arr);
//showNum(...arr);
// arr = [2,4,5]
// showNum.call(null, arr);
