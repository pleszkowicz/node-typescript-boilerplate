'use strict';

let request = require('request')

setInterval(() => {
  // request('http://52.90.90.73/8h35nwk8/shoot/0,1', function (error, response, body) {
  request('https://jsonplaceholder.typicode.com/posts/1', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  })
}, 1000)
