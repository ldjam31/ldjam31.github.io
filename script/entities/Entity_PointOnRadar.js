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
    var POINT_TTL = 45;
    
    game.Module.define('module_pointUpdater')
        .data({
            initialTTL: POINT_TTL,
            ttl: POINT_TTL
        })
        .onUpdate(function (entity, screen) {
            if (this.ttl <= 0) {
                screen.removeEntity(entity);
            } else {
                entity.sprite.alpha = this.ttl / this.initialTTL;
                this.ttl--;
            }
        })

    game.Entity.define('entity_pointOnRadar')
        .modules([
            'module_pointUpdater'
        ])
        .spriteDelta(-15, -15)
        .sprite('sprite_pointOnRadar')
        .onCreate(function (args) {
            this.sprite.stop();
            switch (args.type) {
                default:
                case 'rocket_enemy':
                    this.sprite.frame = 0
                    break;
                case 'rocket_player':
                    this.sprite.frame = 1;
                    break;
                case 'submarine':
                    this.sprite.frame = 2;
                    break;
                case 'mine':
                    this.sprite.frame = 4;
                    break;
                case 'rock':
                    this.sprite.frame = 5;
                    break;
                case 'upgrade_armour':
                case 'upgrade_fuel':
                case 'upgrade_ammo':
                case 'upgrade_o2':
                case 'upgrade_rocketDmg':
                case 'upgrade_radarRange':
                case 'upgrade_radarFrequence':
                    this.sprite.frame = 6;
                    break;
                case 'armour':
                    this.sprite.frame = 7;
                    break;
                case 'ammo':
                    this.sprite.frame = 8;
                    break;
                case 'fuel':
                    this.sprite.frame = 9;
                    break;
            }
            this.x = args.x;
            this.y = args.y;
        })
})()


