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
    var fuelConsumptionForAcceleration = 0.01;
    var fuelConsumptionForRotationAcceleration = 0.01;

    game.Entity.define('entity_player')
        .modules([
            {
                type: 'module_physics',
                data: {
                    maxSpeed: 2,
                    maxRotationSpeed: Math.PI / 20,
                    inertia: 0.1,
                    rotationInertia: Math.PI / 22
                }
            },
        ])
        .updateAnyways()
        .onCreate(function (args) {
            this.id = 'player';
            this.x = args.x;
            this.y = args.y;
            this.module('module_physics').rotation = Math.PI / 2;
        })
        .whenKeyIsPressed(
            38, function (s, game) { //up
                this.module('module_physics').acceleration += 0.2;
                game.state.fuel = Cassava.fixedFloat(game.state.fuel - fuelConsumptionForAcceleration);
            }
        )
        .whenKeyIsPressed(
            40, function (s, game) { //down
                this.module('module_physics').acceleration -= 0.15;
                game.state.fuel = Cassava.fixedFloat(game.state.fuel - fuelConsumptionForAcceleration);
            }
        )
        .whenKeyIsPressed(
            37, function (s, game) { //left
                this.module('module_physics').rotationAcceleration -= 0.05;
                game.state.fuel = Cassava.fixedFloat(game.state.fuel - fuelConsumptionForRotationAcceleration);
            }
        )
        .whenKeyIsPressed(
            39, function (s, game) { //right
                this.module('module_physics').rotationAcceleration += 0.05;
                game.state.fuel = Cassava.fixedFloat(game.state.fuel - fuelConsumptionForRotationAcceleration);
            }
        )
})()