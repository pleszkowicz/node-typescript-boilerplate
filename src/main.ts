'use strict';

let request = require('request')
// import map from 'map'
let Map = require('./map')
// const url = 'http://52.90.90.73/'
const url = 'http://192.168.1.148:50000/8h35nwk8'

let currentPosition = {};
let map = [];
let allies = [];
let enemies = [];

function updateGlobalInfo(body) {
  let resp = JSON.parse(body)
  map = resp.map
  currentPosition = resp.self.position
  allies = resp.allies
  enemies = Map.getEnemies(map)
  console.log(map)
}

function move(x, y) {
  request(`${url}/move/${x},${y}`, function (error, response, body) {
    updateGlobalInfo(body)
  })
}

function shoot(x, y) {
  request(`${url}/shoot/${x},${y}`, function (error, response, body) {
    updateGlobalInfo(body)
  })

}

function shield(x, y) {
  request(`${url}/shield/${x},${y}`, function (error, response, body) {
    updateGlobalInfo(body)
  })
}

function shield2(x1, y1, x2, y2 ) {
  request(`${url}/shield/${x1},${y1};${x2},${y2}`, function (error, response, body) {
    updateGlobalInfo(body)
  })
}

request.get(url, function(error, response, body) {
  let resp = JSON.parse(body);
  currentPosition = resp.self.position
  map = resp.map
  //
  // console.log('map: ', map)
  console.log('x: ', currentPosition['x'])
  console.log('y: ', currentPosition['y'])
  // // console.log(map[currentPosition['x']].charAt(currentPosition['x']))
  // console.log(map[0].charAt(0))

  console.log(map[currentPosition['x'] + 1][currentPosition['y'] - 1)])

  if (Map.canMoveTo(currentPosition['x'] + 1, currentPosition['y'] - 1)) {

    console.log('sciana')
  }
  setInterval(() => {
    Map.getEnemies(map).forEach((enemy) => {
      if (Map.canShoot(51, 7, enemy.pos.x, enemy.pos.y)) {
        shoot(enemy.pos.x, enemy.pos.y)
      }
    })

    if (Map.canMoveTo(currentPosition['x'] + 1, currentPosition['y'] + 1)) {
      // move(currentPosition['x'] + 1, currentPosition['y'] + 1)
    }


    // shoot(1,2)
  }, 1000)
})


