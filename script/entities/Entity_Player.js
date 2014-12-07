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

(function ( ) {
    var fuelConsumptionForAcceleration = 0.018;
    var fuelConsumptionForRotationAcceleration = 0.01;

    game.Entity.define('entity_player')
        .hitbox(Cassava.Hitbox.RECTANGLE_TYPE, {
            width: 20,
            height: 20
        })
        .modules([
            {
                type: 'module_physics',
                data: {
                    maxSpeed: 1,
                    maxRotationSpeed: Math.PI / 20,
                    inertia: 0.0001,
                    rotationInertia: 0.00005
                }
            },
        ])
        .updateAnyways()
        .onCreate(function (args) {
            this.id = 'player';
            this.x = args.x;
            this.y = args.y;
            this.module('module_physics').rotation = - Math.PI / 2;
        })
        .whenKeyIsPressed(
            38, function (s, game) { //up
                this.module('module_physics').acceleration += 0.002;
                game.state.fuel = Cassava.fixedFloat(game.state.fuel - fuelConsumptionForAcceleration);
            }
        )
        .whenKeyIsPressed(
            40, function (s, game) { //down
                this.module('module_physics').acceleration -= 0.0015;
                game.state.fuel = Cassava.fixedFloat(game.state.fuel - fuelConsumptionForAcceleration);
            }
        )
        .whenKeyIsPressed(
            37, function (s, game) { //left
                this.module('module_physics').rotationAcceleration -= 0.001;
                game.state.fuel = Cassava.fixedFloat(game.state.fuel - fuelConsumptionForRotationAcceleration);
            }
        )
        .whenKeyIsPressed(
            39, function (s, game) { //right
                this.module('module_physics').rotationAcceleration += 0.001;
                game.state.fuel = Cassava.fixedFloat(game.state.fuel - fuelConsumptionForRotationAcceleration);
            }
        )
        .whenKeyIsPressed(
            88, function (screen) {
                if (game.state.ammo > 0) {
                    screen.getEntity('entity_map', 'map').addChild('entity_rocket', {
                        type: 'rocket_player',
                        x : this.xCenter,
                        y : this.yCenter,
                        speedX: 0.2 * Math.cos(this.module('module_physics').rotation),
                        speedY: 0.2 * Math.sin(this.module('module_physics').rotation)
                    })
                    
                    game.state.ammo --;
                }
            }
        )
})()