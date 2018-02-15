var moment = require('moment');

var date = new Date();
console.log(date.getMonth());
moment.locale('el');
var date = moment();

console.log(date.format(''));
console.log(date.format('MMM'));
console.log(date.format('MMM YYYY'));
console.log(date.format('MMM Do YYYY, h:mm a'));


date.add(1, 'year').subtract(5, 'months');
console.log(date.format('MMM Do YYYY, h:mm a'));


console.log(date.format('h:mm a'));



var createdAt = 1234;
var createdAtMoment = moment(createdAt);
console.log(createdAtMoment.format('h:mm a'));


var someTimestamp = moment().valueOf();
var someTimestamPMoment = moment(someTimestamp);
console.log(someTimestamPMoment.format('h:mm a'));
