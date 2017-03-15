'use strict';

let request = require('request')
// const url = 'http://52.90.90.73/'
const url = 'http://weathered-rain-1953.getsandbox.com/move'


function move(x, y) {
  request(`${url}/move/${x},${y}`, function (error, response, body) {
    console.log(body)
  })
}

function shoot(x, y) {
  request(`${url}/shoot/${x},${y}`, function (error, response, body) {
    console.log(body)
  })

}

function shield(x, y) {
  request(`${url}/shield/${x},${y}`, function (error, response, body) {
    console.log(response)
  })
}

function shield2(x1, y1, x2, y2 ) {
  request(`${url}/shield/${x1},${y1};${x2},${y2}`, function (error, response, body) {})
}

setInterval(() => {
  move(1,2)
  shoot(1,2)
}, 1000)
