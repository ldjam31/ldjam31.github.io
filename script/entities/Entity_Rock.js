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
    game.Entity.define('entity_rock')
        .modules([
            'module_type'
        ])
        .updateAnyways()
        .onCreate(function (args, screen) {
            this.x = args.x;
            this.y = args.y;
            this.module('module_type').type = 'rock';
        })
        .whenHitsEntities(['entity_player'], function (player, screen, game) {
            if (game.state.invincibility === 0) {
                screen.getEntity('entity_shaker', 'shaker').module('module_shaking').newTTL = 45; 
                screen.getEntity('entity_shaker', 'shaker').module('module_shaking').newIntensity = 7;
                game.Audio.channel('hit').play((Math.random() > 0.5) ? 'hitA' : 'hitB').volume = FX_VOLUME;
                game.state.invincibility = 60;
                game.state.armour -= player.module('module_physics').speed * 30 + 1;
            }
        })
})()