console.log("hello dear");

const sum = (a,b) => a+b;
//console.log(sum(4,5));

console.log(process.argv);

//console.log(sum(process.argv));----throws error

const num1 = process.argv[2];
const num2 = process.argv[3];

console.log(sum(num1,num2));

console.log(sum(+num1,+num2));

//destructuring
const [, , num3,num4] = process.argv;

console.log(sum(num3,num4));

console.log(sum(+num3,+num4));


//maximum of numbers by users 

// const maxi = Math.max(...[2,3,4]);
// console.log(maxi);
// const[, ,...arr_max] = process.argv;
// console.log(arr_max);
// const arr_max1 = arr_max.map(x=>+x);
// console.log(arr_max1);
// console.log(Math.max(...arr_max1));
const [, , nums]=process.argv;
const arr = JSON.parse(nums);
console.log(arr);
console.log(Math.max(...arr));
