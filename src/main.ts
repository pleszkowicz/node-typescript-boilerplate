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
let isRespawned = true

function updateGlobalInfo(error, response, body) {
  let resp = JSON.parse(body)
  map = resp.map
  currentPosition = resp.self.position
  allies = resp.allies
  enemies = Map.getEnemies(map)
}

function move(x, y) {
  request(`${url}/move/${x},${y}`, function (error, response, body) {
    updateGlobalInfo(error, response, body)
  })
}

function shoot(x, y) {
  request(`${url}/shoot/${x},${y}`, function (error, response, body) {
    console.log('a: ', error, response, body)
    updateGlobalInfo(error, response, body)
  })

}

function shield(x, y) {
  request(`${url}/shield/${x},${y}`, function (error, response, body) {
    updateGlobalInfo(error, response, body)
  })
}

function shield2(x1, y1, x2, y2 ) {
  request(`${url}/shield/${x1},${y1};${x2},${y2}`, function (error, response, body) {
    updateGlobalInfo(error, response, body)
  })
}

function moveDown(x, y) {
  move(x, y +1)
}

function moveLeft(x, y) {
  move(x-1, y)
}

function moveRight(x, y) {
  move(x+1, y)
}

function moveTop(x, y) {
  move(x, y-1)
}

function moveTopRight(x, y) {
    move(x+1, y-1)
}

function moveDownLeft(x, y) {
    move(x-1, y+1)
}

function moveDownRight(x, y) {
    move(x+1, y+1)
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

request.get(url, function(error, response, body) {
  let resp = JSON.parse(body);
  currentPosition = resp.self.position
  map = resp.map

  setInterval(() => {
    let x = currentPosition.x
    let y = currentPosition.y

    Map.getEnemies(map).forEach((enemy) => {
      if (Map.canShoot(x, 7, enemy.pos.x, enemy.pos.y)) {
        shoot(enemy.pos.x, enemy.pos.y)
      }
    })



    console.log(map, currentPosition)
    console.log('x:', x, 'y: ', y)

    //if in the base - top right corner
    //   moveTopRight(x, y)
    if (x >= 57
        && x <= 66
        && y >= 1
        && y <= 4) {
            if (Map.canMoveTo(map, x + 1, y + 1)) {
                console.log(1)
                moveDownRight(x, y)
            } else if (Map.canMoveTo(map, x + 1, y)) {
                console.log('ss')
                moveRight(x, y)
            } else if (Map.canMoveTo(map, x, y + 1)) {
                console.log(3)
                moveDown(x, y)
            }
    } else if (Map.canMoveTo(map, x - 1, y)) {
        moveLeft(x, y)
    }
    else if (Map.canMoveTo(map, x - 1, y + 1)) {
        moveDownLeft(x, y)
    } else if (Map.canMoveTo(map, x, y + 1)) {
        moveDown(x, y)
    }


    // shoot(1,2)
  }, 3000)
})
