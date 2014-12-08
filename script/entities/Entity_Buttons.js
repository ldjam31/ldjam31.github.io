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
    var REFILL_FUEL_COST_PER_FRAME = 0.08;
    var REFILL_O2_REGEN_PER_FRAME = 0.108;
    
    game.Module.define('module_buttonPressing')
        .data({
            isPressed: false
        })
        .onUpdate(function (entity) {
            if (this.isPressed) {
                entity.sprite.hide();
            } else {
                if (entity.name === 'entity_refillButton') {
                    game.Audio.channel('refill').stop();
                }
                entity.sprite.show();
            }

            this.isPressed = false;
        });

    game.Entity.define('entity_refillButton')
        .sprite('sprite_refillButton')
        .hitbox(Cassava.Hitbox.RECTANGLE_TYPE, {
            width: 70,
            height: 72
        })
        .modules([
            'module_buttonPressing'
        ])
        .onCreate(function () {
            this.z = 2;
            this.x = 51;
            this.y = 26;
        })
        .whenPointed(function (e, s, game) {
            this.module('module_buttonPressing').isPressed = true;
            if (game.state.fuel > 0) {
                game.Audio.channel('refill').play('air').loop().volume = REFILL_VOLUME;
                game.state.fuel -= REFILL_FUEL_COST_PER_FRAME;
                game.state.o2 += REFILL_O2_REGEN_PER_FRAME;
                if (game.state.o2 >= game.state.o2Max) {
                    game.state.o2 = game.state.o2Max;
                }
            } else {
                game.Audio.channel('refill').stop();
            }
        });

    game.Entity.define('entity_fireButton')
        .sprite('sprite_fireButton')
        .hitbox(Cassava.Hitbox.RECTANGLE_TYPE, {
            width: 70,
            height: 72
        })
        .modules([
            'module_buttonPressing'
        ])
        .onCreate(function () {
            this.z = 2;
            this.x = 50;
            this.y = 499;
        })
        .whenPointed(function (e, screen, game) {
            var player, log;
            this.module('module_buttonPressing').isPressed = true;
            
            if (game.state.ammo > 0 && game.state.rocketReload <= 0) {
                player = screen.getEntity('entity_player', 'player');
                log = screen.getEntity('entity_log', 'log');
                
                if (player) {
                    screen.getEntity('entity_shaker', 'shaker').module('module_shaking').newTTL = 90; 
                    screen.getEntity('entity_shaker', 'shaker').module('module_shaking').newIntensity = 3; 
                    game.Audio.channel('torpedo').play('torpedo');
                    
                    screen.getEntity('entity_map', 'map').child('cell_0_0').addChild('entity_rocket', {
                        type: 'rocket_player',
                        x: player.xCenter,
                        y: player.yCenter,
                        speedX: game.state.rocketSpeed * Math.cos(player.module('module_physics').rotation),
                        speedY: game.state.rocketSpeed * Math.sin(player.module('module_physics').rotation),
                        damages: game.state.rocketDamages,
                    })

                    game.state.rocketReload = game.state.initialRocketReload;
                    game.state.ammo--;
                    if (log) {
                        log.module('module_logUpdater').logsBuffer.push('/a left: ' + game.state.ammo);
                    }
                }
            }
        });
})()