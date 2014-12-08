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
            if (game.state.armour < 20 && game.state.screenState === 3) {
                game.state.screenState = 4;
                game.Audio.channel('shatter').play('shatterB').volume = FX_VOLUME;
                entity.sprite.isVisible = true;
                entity.sprite.frame = 3;
            } else if (game.state.armour < 40 && game.state.screenState === 2) {
                game.state.screenState = 3;
                game.Audio.channel('shatter').play('shatterB').volume = FX_VOLUME;
                entity.sprite.isVisible = true;
                entity.sprite.frame = 2;
            } else if (game.state.armour < 60 && game.state.screenState === 1) {
                game.state.screenState = 2;
                game.Audio.channel('shatter').play('shatterA').volume = FX_VOLUME;
                entity.sprite.isVisible = true;
                entity.sprite.frame = 1;
            } else if (game.state.armour < 80 && game.state.screenState === 0) {
                game.state.screenState = 1;
                game.Audio.channel('shatter').play('shatterA').volume = FX_VOLUME;
                entity.sprite.isVisible = true;
                entity.sprite.frame = 0;
            }
            
            switch(game.state.screenState) {
                case 4:
                    entity.sprite.isVisible = true;
                    entity.sprite.frame = 3;
                    break;
                case 3:
                    entity.sprite.isVisible = true;
                    entity.sprite.frame = 2;
                    break;
                case 2:
                    entity.sprite.isVisible = true;
                    entity.sprite.frame = 1;
                    break;
                case 1:
                    entity.sprite.isVisible = true;
                    entity.sprite.frame = 0;
                    break;
                default: 
                    entity.sprite.isVisible = false;
                    break;
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