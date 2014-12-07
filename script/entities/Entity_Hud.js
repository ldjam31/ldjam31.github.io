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

!(function () {
    var x = -20;
    var y = -20;
    
    var MAP_HEIGHT = 900;
    
    var DIGIT = 'entity_characterDigit';
    var DIGIT_WIDTH = 22;
    var DIGIT_HEIGHT = 37;
    
    game.Module.define('module_hudUpdater')
        .onUpdate(function (entity, screen, game) {
            var sentence, player, seconds, minutes, hours, compass;
        
            sentence = entity.child('armor');
            if (!sentence) {
                sentence = entity.addChild('entity_sentence', {
                    id: 'armor',
                    sentence: '100',
                    character: DIGIT,
                    characterWidth: DIGIT_WIDTH,
                    characterHeight: DIGIT_HEIGHT,
                    x: 50,
                    y: 192
                })
            }
            sentence.module('module_sentence')
                .sentence = 
                    (game.state.armor < 100 ? '0' : '') +
                    (game.state.armor < 10 ? '0' : '') +
                    ~~game.state.armor;

            
            sentence = entity.child('o2');
            if (!sentence) {
                sentence = entity.addChild('entity_sentence', {
                    id: 'o2',
                    sentence: '100',
                    character: DIGIT,
                    characterWidth: DIGIT_WIDTH,
                    characterHeight: DIGIT_HEIGHT,
                    x: 50,
                    y: 301
                })
            }
            sentence.module('module_sentence')
                .sentence =  
                    (game.state.o2 < 100 ? '0' : '') +
                    (game.state.o2 < 10 ? '0' : '') +
                    ~~game.state.o2;
            
            sentence = entity.child('fuel');
            if (!sentence) {
                sentence = entity.addChild('entity_sentence', {
                    id: 'fuel',
                    sentence: '100',
                    character: DIGIT,
                    characterWidth: DIGIT_WIDTH,
                    characterHeight: DIGIT_HEIGHT,
                    x: 50,
                    y: 411
                })
            }
            sentence.module('module_sentence')
                .sentence = 
                    (game.state.fuel < 100 ? '0' : '') +
                    (game.state.fuel < 10 ? '0' : '') +
                    ~~game.state.fuel;
            
            sentence = entity.child('time');
            if (!sentence) {
                sentence = entity.addChild('entity_sentence', {
                    id: 'time',
                    sentence: '00:00:00',
                    character: DIGIT,
                    characterWidth: DIGIT_WIDTH,
                    characterHeight: DIGIT_HEIGHT,
                    x: 199,
                    y: 537
                });
            }
            
            hours = ~~(game.state.time / 216000);
            minutes = ~~(game.state.time % 216000 / 3600);
            seconds = ~~(game.state.time % 216000 % 3600 / 60);
            
            sentence.module('module_sentence').sentence = 
                ((hours < 10) ? '0' : '') + 
                hours + 
                ':' + 
                ((minutes < 10) ? '0' : '') + 
                minutes + 
                ':' + 
                ((seconds < 10) ? '0' : '') + 
                seconds;
            
            
            sentence = entity.child('coordinates');
            if (!sentence) {
                sentence = entity.addChild('entity_sentence', {
                    id: 'coordinates',
                    character: DIGIT,
                    characterWidth: DIGIT_WIDTH,
                    characterHeight: DIGIT_HEIGHT,
                    sentence: '',
                    x: 433,
                    y: 537
                })
            }

            compass = entity.child('compass');
            if (!compass) {
                compass = entity.addChild('entity_compass', {
                    x: 714,
                    y: 61
                })
            }
            
            player = screen.getEntity('entity_player', 'player');
            if (player) {
                sentence.module('module_sentence')
                    .sentence = 
                        ((player.x < 100) ? '0' : '') + 
                        ((player.x < 10) ? '0' : '') + 
                        ~~player.x +
                        '.'+ 
                        ((MAP_HEIGHT - player.y < 100) ? '0' : '') + 
                        ((MAP_HEIGHT -player.y < 10) ? '0' : '') + 
                        ~~(MAP_HEIGHT -player.y);
                    
                compass.sprite.rotation = -player.module('module_physics').rotation * 1 - Math.PI/2;
            }
        })
        .onInit(function() {
            this.entity.addChild('entity_log');
        })

    game.Entity.define('entity_hud')
        .sprite('sprite_hud')
        .updateAnyways()
        .modules([
            'module_hudUpdater'
        ])
        .hitbox(Cassava.Hitbox.RECTANGLE_TYPE, {
            width : 840,
            height: 640
        })
        .onCreate(function () {
            this.id = 'hud';
            this.x = x;
            this.y = x;
        })
})()