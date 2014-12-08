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
    var SUBMARINE_INVINCIBILITY = 45;
    var SUBMARINE_HEALTH = 45;
    var SUBMARINE_ROCKET_DMG = 15;
    var SUBMARINE_ROCKET_SPEED = 0.15;
    var SUBMARINE_ROCKET_CD = 720;
    var SUBMARINE_ROCKET_TTL = 180;
    var SUBMARINE_LEVEL_COEF = 0.7;
    var SUBMARINE_RADAR_RANGE = 170;
    var SUBMARINE_ARMOUR_LOOT = 30;
    var SUBMARINE_AMMO_LOOT = 5;
    var SUBMARINE_O2_LOOT = 30;
    var SUBMARINE_FUEL_LOOT = 30;

    game.Module.define('module_submarineUpdater')
        .data({
            ttl: 0,
            health: 0,
            invincibilityMax: SUBMARINE_INVINCIBILITY,
            invincibility: 0,
            rocketCd: SUBMARINE_ROCKET_CD,
            rocketMaxCd: SUBMARINE_ROCKET_CD,
            rocketDmg: 0,
            rocketSpeed: SUBMARINE_ROCKET_SPEED,
            radarRange: 0,
            level: 0
        })
        .onUpdate(function (entity, screen, game) {
            var player, dist, distX, distY;

            player = screen.getEntity('entity_player', 'player');

            if (player) {
                distX = player.xCenter - entity.xCenter;
                distY = player.yCenter - entity.yCenter;
                dist = Math.sqrt(distX * distX + distY * distY);

                if (dist < this.radarRange) {
                    if (this.rocketCd > 0) {
                        this.rocketCd--;
                    } else {
                        screen.getEntity('entity_map', 'map').child('cell_0_0').addChild('entity_rocket', {
                            type: 'rocket_enemy',
                            x: entity.xCenter,
                            y: entity.yCenter,
                            speedX: this.rocketSpeed * distX / dist,
                            speedY: this.rocketSpeed * distY / dist,
                            damages: game.state.rocketDamages
                        });
                        this.rocketCd = this.rocketMaxCd;
                    }
                }

            }

            if (this.ttl <= 0) {
                screen.removeEntity(this);
            } else {
                this.ttl--;
            }
        })

    game.Entity.define('entity_submarine')
        .modules([
            'module_submarineUpdater',
            'module_type'
        ])
        .updateAnyways()
        .hitbox(Cassava.Hitbox.RECTANGLE_TYPE, {
            width: 15,
            height: 15
        })
        .onCreate(function (args) {
            this.module('module_type').type = 'submarine';
            this.module('module_submarineUpdater').ttl = args.ttl;
            
            this.module('module_submarineUpdater').level = args.level;
            this.module('module_submarineUpdater').health = ~~(SUBMARINE_LEVEL_COEF * args.level * SUBMARINE_HEALTH);
            this.module('module_submarineUpdater').rocketDmg = ~~(SUBMARINE_LEVEL_COEF * args.level * SUBMARINE_ROCKET_DMG);
            this.module('module_submarineUpdater').radarRange = ~~(SUBMARINE_LEVEL_COEF * args.level * SUBMARINE_RADAR_RANGE);

            this.x = args.x;
            this.y = args.y;
        })
        .whenHitsEntities(['entity_player'], function (player, screen) {
            if (game.state.invincibility === 0) {
                game.state.invincibility = 60;
                game.state.armour -= player.module('module_physics').speed * 30 + 5;
                if (this.module('module_submarineUpdater').invincibility <= 0) {
                    this.module('module_submarineUpdater').invincibility = this.module('module_submarineUpdater').invincibilityMax;
                    this.module('module_submarineUpdater').health -= player.module('module_physics').speed * 30;
                    if (this.module('module_submarineUpdater').health < 0) {
                        screen.removeEntity(this);
                    }
                }
            }
        })
        .whenHitsEntities(['entity_rocket'], function (rocket, screen, game) {
            var log, ammo, armour, o2, fuel;
            
            if (rocket.module('module_type').type === 'rocket_player') {
                this.module('module_submarineUpdater').invincibility = this.module('module_submarineUpdater').invincibilityMax;
                this.module('module_submarineUpdater').health -= rocket.module('module_rocketUpdater').damages;
                screen.removeEntity(rocket);
                if (this.module('module_submarineUpdater').health < 0) {
                    ammo = ~~(Math.random() * SUBMARINE_LEVEL_COEF * this.module('module_submarineUpdater').level * SUBMARINE_AMMO_LOOT);
                    armour = ~~(Math.random() * SUBMARINE_LEVEL_COEF * this.module('module_submarineUpdater').level * SUBMARINE_ARMOUR_LOOT);
                    fuel = ~~(Math.random() * SUBMARINE_LEVEL_COEF * this.module('module_submarineUpdater').level * SUBMARINE_FUEL_LOOT);
                    o2 = ~~(Math.random() * SUBMARINE_LEVEL_COEF * this.module('module_submarineUpdater').level * SUBMARINE_O2_LOOT);
                    
                    game.state.ammo += ammo;
                    if (game.state.ammo > game.state.ammoMax) {
                        game.state.ammo = game.state.ammoMax;
                    }
                    game.state.armour += armour;
                    if (game.state.armour > game.state.armourMax) {
                        game.state.armour = game.state.armourMax;
                    }
                    game.state.fuel += fuel;
                    if (game.state.fuel > game.state.fuelMax) {
                        game.state.fuel = game.state.fuelMax;
                    }
                    game.state.o2 += o2;
                    if (game.state.o2 > game.state.o2Max) {
                        game.state.o2 = game.state.o2Max;
                    }
                    
                    log = screen.getEntity('entity_log', 'log');
                    if (log) {
                        log.module('module_logUpdater').logsBuffer.push('/a:' + ammo + ' /h:' + armour + ' /o:' + o2 + ' /f:' + fuel);
                    }
                    screen.removeEntity(this);
                }
            }
        })
})()