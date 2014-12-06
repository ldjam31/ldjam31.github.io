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
    game.Module.define('module_shatteringUpdater')
        .onUpdate(function (entity, s, game) {
            if (game.state.armor / game.state.maxArmor < 0.20) {
                entity.sprite.isVisible = true;
                entity.sprite.frame = 3;
            } else if (game.state.armor / game.state.maxArmor < 0.40) {
                entity.sprite.isVisible = true;
                entity.sprite.frame = 2;
            } else if (game.state.armor / game.state.maxArmor < 0.60) {
                entity.sprite.isVisible = true;
                entity.sprite.frame = 1;
            } else if (game.state.armor / game.state.maxArmor < 0.80) {
                entity.sprite.isVisible = true;
                entity.sprite.frame = 0;
            } else {
                entity.sprite.isVisible = false;
            }
        })
    
    game.Entity.define('entity_shattering')
        .sprite('sprite_shattering')
        .modules([
            'module_shatteringUpdater'
        ])
        .onCreate(function () {
            this.z = 3;
            this.id = 'shattering';
            this.sprite.stop();
            this.sprite.isVisible = false;
            this.x = 230;
            this.y = 130;
        })
})()