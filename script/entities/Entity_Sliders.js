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
    var PLAYER_MAX_SPEED = 0.2;
    var PLAYER_MAX_ROTATION_SPEED = Math.PI/200;
    
    var MAX_ACCELERATION_FRONT = 0.00072;
    var MAX_ACCELERATION_BACK = 0.0005;
    var MAX_ACCELERATION_ROTATION = 0.0008;

    var FUEL_REQUIRED_FOR_ACCELERATION_FRONT = 0.005;
    var FUEL_REQUIRED_FOR_ACCELERATION_BACK = 0.01;
    var FUEL_REQUIRED_FOR_ROTATION_ACCELERATION = 0.005;

    game.Module.define('module_speedSliderUpdater')
        .onUpdate(function (slider, screen) {
            var player = screen.getEntity('entity_player', 'player');

            if (player) {
                if (306 - slider.y < 0) {
                    if (player.module('module_physics').speed > PLAYER_MAX_SPEED * (306 - slider.y) / 80) {
                        player.module('module_physics').acceleration = - MAX_ACCELERATION_BACK;
                    }
                    game.state.fuel = Cassava.fixedFloat(game.state.fuel - FUEL_REQUIRED_FOR_ACCELERATION_BACK * Math.abs(306 - slider.y) / 80);
                }
                if (306 - slider.y > 0) {
                    if (player.module('module_physics').speed < PLAYER_MAX_SPEED * (306 - slider.y) / 80) {
                        player.module('module_physics').acceleration = MAX_ACCELERATION_FRONT;
                    }
                    game.state.fuel = Cassava.fixedFloat(game.state.fuel - FUEL_REQUIRED_FOR_ACCELERATION_FRONT * Math.abs(306 - slider.y) / 80);
                }
            }
        });

    game.Entity.define('entity_speedSlider')
        .sprite('sprite_sliderVertical')
        .hitbox(Cassava.Hitbox.RECTANGLE_TYPE, {
            width: 136,
            height: 102
        })
        .modules([
            'module_speedSliderUpdater'
        ])
        .spriteDelta(0, 20)
        .onCreate(function () {
            this.x = 643;
            this.y = 306;
        })
        .whenPointed(function (point) {
            this.y = point.y - 51;
            if (this.y > 386) {
                this.y = 386;
            }
            if (this.y < 226) {
                this.y = 226;
            }
        });

    game.Module.define('module_rotationSliderUpdater')
        .onUpdate(function (slider, screen) {
            var player = screen.getEntity('entity_player', 'player');

            if (player) {
                if (player.module('module_physics').rotationSpeed < PLAYER_MAX_ROTATION_SPEED * (slider.x - 672) / 60) {
                    player.module('module_physics').rotationAcceleration = + MAX_ACCELERATION_ROTATION;
                } else if (player.module('module_physics').rotationSpeed > PLAYER_MAX_ROTATION_SPEED * (slider.x - 672) / 60){
                    player.module('module_physics').rotationAcceleration = - MAX_ACCELERATION_ROTATION;
                }
                game.state.fuel = Cassava.fixedFloat(game.state.fuel - FUEL_REQUIRED_FOR_ROTATION_ACCELERATION * Math.abs(672 - slider.x) / 60);
            }
            
            if (slider.x > 672) {
                slider.x = Cassava.fixedFloat(slider.x - 1);
            } else if (slider.x < 672){
                slider.x = Cassava.fixedFloat(slider.x + 1);
            }
        })


    game.Entity.define('entity_rotationSlider')
        .sprite('sprite_sliderHorizontal')
        .hitbox(Cassava.Hitbox.RECTANGLE_TYPE, {
            width: 78,
            height: 77
        })
        .modules([
            'module_rotationSliderUpdater'
        ])
        .spriteDelta(20, 0)
        .onCreate(function () {
            this.x = 672;
            this.y = 517;
        })
        .whenPointed(function (point) {
            this.x = point.x - 39;
            if (this.x > 732) {
                this.x = 732;
            }
            if (this.x < 612) {
                this.x = 612;
            }
        });
})()