import { apiKey } from "./util.js";

console.log(apiKey);

function greet() {
    console.log('Hello...');
}

const greeting = () => { console.log('Hello...'); }


class User {
    constructor(name, age) {
        this.age = age;
        this.name = name;
    }

    greet() {
        console.log('Hello');
    }
}

const user1 = new User('Max', 35);

function transformToObjects(numberArray) {
    // Todo: Add your logic
    // should return an array of objects


    return numberArray.map(item => ({val: item}));
}

function init() {
    function greet() {
        console.log('Hello');
    }

    greet();
}

init();     // Hello
