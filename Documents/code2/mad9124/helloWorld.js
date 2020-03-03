const students = require('./students.json');
console.log(students);
//destructuring
students.forEach( ({email, lastName}) => {
    console.log(email, lastName);

});