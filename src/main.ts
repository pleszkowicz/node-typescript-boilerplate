'use strict';

let request = require('request')
// import map from 'map'
let Map = require('./map')
// const url = 'http://52.90.90.73/'
const url = 'http://192.168.1.148:50000/37hxuef1'

let currentPosition = {};
let map = [];
let allies = [];
let enemies = [];

function updateGlobalInfo(body) {
  let resp = JSON.parse(body)
  console.log(body)
  map = resp.map
  currentPosition = resp.self.position
  allies = resp.allies
  enemies = Map.getEnemies(map)
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

request.get(url, function(error, response, body) {
  console.log('error: ', error);
  let resp = JSON.parse(body);
  currentPosition = resp.self.position
  map = resp.map

  setInterval(() => {
    // Map.getEnemies(map).forEach((enemy) => {
    //   if (Map.canShoot(51, 7, enemy.pos.x, enemy.pos.y)) {
    //     shoot(enemy.pos.x, enemy.pos.y)
    //   }
    // })

    console.log(map, currentPosition)

    //if in the base - top right corner
    if (currentPosition['x'] >= 57
        && currentPosition['x'] <= 66
        && currentPosition['y'] >= 1
        && currentPosition['y'] <= 4) {
            if (Map.canMoveTo(map, currentPosition['x'] + 1, currentPosition['y'] + 1)) {
                move(currentPosition['x'] + 1, currentPosition['y'] + 1)
            } else if (Map.canMoveTo(map, currentPosition['x'] + 1, currentPosition['y'])) {
                move(currentPosition['x'] + 1, currentPosition['y'])
            } else if (Map.canMoveTo(map, currentPosition['x'], currentPosition['y'] + 1)) {
                move(currentPosition['x'], currentPosition['y'] + 1)
            }
    } /*else if (currentPosition['y'] < 8) { // outside of the base camp - go always to the y=8
        move(currentPosition['x'], currentPosition['y'] + 1)
    } else if (currentPosition['x'] >= 57 || currentPosition['x'] <= 66) { // outside of the base camp - go always to the x=57
        move(currentPosition['x'] - 1, currentPosition['y'])
    }*/
    //now always go to the left bottom corner

    if (Map.canMoveTo(map, currentPosition['x'] - 1, currentPosition['y'])) {
        move(currentPosition['x'] - 1, currentPosition['y'])
    } else if (Map.canMoveTo(map, currentPosition['x'] - 1, currentPosition['y'] + 1)) {
        move(currentPosition['x'] - 1, currentPosition['y'] + 1)
    } else if (Map.canMoveTo(map, currentPosition['x'], currentPosition['y'] + 1)) {
        move(currentPosition['x'], currentPosition['y'] + 1)
    }

    }

    // shoot(1,2)
  }, 3000)
})
