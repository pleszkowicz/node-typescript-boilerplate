'use strict'

let map = [
    "####################################################################",
    "#      #                               #                 A         #",
    "#      #                  #            #      B                    #",
    "#      #                  #            #                #          #",
    "#                  ########            #                #          #",
    "#                                                       #######    #",
    "#             #                            ####                    #",
    "#             #             ##########                             #",
    "#######       #                   #               ######           #",
    "#                                 #                                #",
    "#                     #           #                                #",
    "#         ######      #           #       #                  #######",
    "#                     #                   #                        #",
    "#                     #                   #         #              #",
    "#    #######          #                   #         #              #",
    "#          #          #     #      ########         #              #",
    "#          #     ######     #                       ########       #",
    "#                           #                                      #",
    "#                           #                                      #",
    "###################################################################Z"
]

const ALLIES = 'kmpstz'
const ENEMIES = 'ABOKMJ'

module.exports.map = map

module.exports.getEnemies = function(map) {
    let enemiesPositions = []
    //console.log(map)

    for (let row=0; row < map.length; row++) {

        // enemies.indexOf(row)
        for (let col=0; col <= map[row].length; col++) {
            // console.log(map[row][col])
            if (ENEMIES.indexOf(map[row][col]) !== -1) [
                enemiesPositions.push({
                    player: map[row][col],
                    pos: {
                        x: col,
                        y: row
                    }
                })
            ]
        }
    }

    return enemiesPositions
}

module.exports.canMoveTo = function(map, col, row) {
    let target = map[row].charAt(col)

    return map && target !== '#' && ALLIES.indexOf(target) === -1
}

module.exports.canShoot = function(x0, y0, x1, y1) {
    let dx = Math.abs(x1-x0);
    let dy = Math.abs(y1-y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx-dy;

    let canShoot = false
    while(true){
        if (map && map[y0].charAt(x0) === '#') break;

        if ((x0==x1) && (y0==y1)) {
            canShoot = true
            break
        }

        let e2 = 2*err;
        if (e2 >-dy){ err -= dy; x0  += sx; }
        if (e2 < dx){ err += dx; y0  += sy; }
    }

    return canShoot
}
