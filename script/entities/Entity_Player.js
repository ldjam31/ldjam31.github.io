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
    var FUEL_REQUIRED_FOR_ACCELERATION = 0.00018;
    var FUEL_REQUIRED_FOR_ROTATION_ACCELERATION = 0.0001;

    var PLAYER_INERTIA = 0.00027;
    var PLAYER_ROTATION_INERTIA = 0.00008;
    var PLAYER_MAX_SPEED = 0.2;
    var PLAYER_MAX_ROTATION_SPEED = Math.PI/200;

    var MAX_ACCELERATION_FRONT = 0.00072;
    var MAX_ACCELERATION_BACK = 0.0004;
    var MAX_ACCELERATION_ROTATION = 0.0005;

    game.Entity.define('entity_player')
        .hitbox(Cassava.Hitbox.RECTANGLE_TYPE, {
            width: 20,
            height: 20
        })
        .modules([
            {
                type: 'module_physics',
                data: {
                    maxSpeed: PLAYER_MAX_SPEED,
                    maxRotationSpeed: PLAYER_MAX_ROTATION_SPEED,
                    inertia: PLAYER_INERTIA,
                    rotationInertia: PLAYER_ROTATION_INERTIA
                }
            },
        ])
        .updateAnyways()
        .onCreate(function (args) {
            this.id = 'player';
            this.x = args.x;
            this.y = args.y;
            this.module('module_physics').rotation = -Math.PI / 2;
        })
        .whenKeyIsPressed(
            38, function (s, game) { //up
                this.module('module_physics').acceleration += MAX_ACCELERATION_FRONT;
                game.state.fuel = Cassava.fixedFloat(game.state.fuel - FUEL_REQUIRED_FOR_ACCELERATION);
            }
        )
        .whenKeyIsPressed(
            40, function (s, game) { //down
                this.module('module_physics').acceleration -= MAX_ACCELERATION_BACK;
                game.state.fuel = Cassava.fixedFloat(game.state.fuel - FUEL_REQUIRED_FOR_ACCELERATION);
            }
        )
        .whenKeyIsPressed(
            37, function (s, game) { //left
                this.module('module_physics').rotationAcceleration -= MAX_ACCELERATION_ROTATION;
                game.state.fuel = Cassava.fixedFloat(game.state.fuel - FUEL_REQUIRED_FOR_ROTATION_ACCELERATION);
            }
        )
        .whenKeyIsPressed(
            39, function (s, game) { //right
                this.module('module_physics').rotationAcceleration += MAX_ACCELERATION_ROTATION;
                game.state.fuel = Cassava.fixedFloat(game.state.fuel - FUEL_REQUIRED_FOR_ROTATION_ACCELERATION);
            }
        )
// DEBUG ONLY :D
//        .whenKeyIsPressed(
//            88, function (screen, game) {
//                if (game.state.ammo > 0 && game.state.rocketReload <= 0) {
//                    game.Audio.channel('torpedo').play('torpedo');
//                    screen.getEntity('entity_map', 'map').child('cell_0_0').addChild('entity_rocket', {
//                        type: 'rocket_player',
//                        x: this.xCenter,
//                        y: this.yCenter,
//                        speedX: game.state.rocketSpeed * Math.cos(this.module('module_physics').rotation),
//                        speedY: game.state.rocketSpeed * Math.sin(this.module('module_physics').rotation),
//                        damages: game.state.rocketDamages,
//                    })
//
//                    game.state.rocketReload = game.state.initialRocketReload;
//                    game.state.ammo--;
//                }
//            }
//        )
        .whenHitsEntities(['entity_rocket'], function (rocket, screen) {
            if (rocket.module('module_type').type === 'rocket_enemy') {
                game.Audio.channel('hit').play('hitA').volume = FX_VOLUME;
                game.state.invincibility = 60;
                game.state.armour -= rocket.module('module_rocketUpdater').damages;
                screen.removeEntity(rocket);
            }
        })
})()