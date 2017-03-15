'use strict'

module.exports.map = [
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

module.exports.getEnemies = function(map) {
    let enemies = ['A', 'B', 'O', 'K', 'M', 'J']
    let enemiesPositions = []

    for (let row=0; row < map.length; row++) {

        // enemies.indexOf(row)
        for (let col=0; col <= map[row].length; col++) {
            // console.log(map[row][col])
            if (enemies.indexOf(map[row][col]) !== -1) [
                enemiesPositions.push({
                    player: map[row][col],
                    position: {
                        x: col,
                        y: row
                    }
                })
            ]
        }
    }

    return enemiesPositions
}
