/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 imwhiskas@gmail.com, hugo.kelfani@gmail.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function () {
    var parameters = {};

    game.Module.define('module_radar')
        .data({
            range: 0,
            maxRange: 150,
            rangeInc: 0.
        })
        .onUpdate(function (e, screen) {
            var player, obstacles, nodeObstacle, distX, distY,
                dist, rotation, cosRotation, sinRotation, 
                playerXCenter, playerYCenter, radarScreen;

            player = screen.getEntity('entity_player', 'player');
            obstacles = screen.getEntity('entity_obstacles', 'obstacles');
            radarScreen = screen.getEntity('entity_radarScreen', 'radarScreen');

            if (this.range >= this.maxRange) {
                this.range = 0;
            } else {
//                this.range+= this.rangeInc;
                this.range+=1;
            }

            if (player && obstacles && radarScreen) {
                rotation = player.module('module_physics').rotation + Math.PI / 2;
                cosRotation = Math.cos(-rotation);
                sinRotation = Math.sin(-rotation);
                nodeObstacle = obstacles.firstChildNode;
                playerXCenter = player.xCenter;
                playerYCenter = player.yCenter;

                while (nodeObstacle) {
                    distX = nodeObstacle.o.xCenter - playerXCenter;
                    distY = nodeObstacle.o.yCenter - playerYCenter;
                    dist = Math.sqrt(distX * distX + distY * distY);

                    if (~~dist === this.range) {
                        parameters.x = distX * cosRotation - distY * sinRotation + playerXCenter;
                        parameters.y = distX * sinRotation + distY * cosRotation + playerYCenter;
                        radarScreen.addChild('entity_pointOnRadar', parameters);
                        console.log(parameters.x,parameters.y);
                    }
                    nodeObstacle = nodeObstacle.next;
                }
            }
        });
})()

