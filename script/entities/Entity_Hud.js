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
    game.Module.define('module_hudUpdater')
        .onUpdate(function (entity, s, game) {
            var sentence;
        
            sentence = entity.child('armor');
            if (!sentence) {
                sentence = entity.addChild('entity_sentenceDigit', {
                    id: 'armor',
                    sentence: '100'
                })
            }
            sentence.module('module_sentenceDigit')
                .sentence = ''+ ~~(100 * game.state.armor / game.state.maxArmor);

            
            sentence = entity.child('o2');
            if (!sentence) {
                sentence = entity.addChild('entity_sentenceDigit', {
                    id: 'o2',
                    sentence: '100'
                })
            }
            sentence.module('module_sentenceDigit')
                .sentence = ''+ ~~(100 * game.state.o2 / game.state.maxO2);
            
            sentence = entity.child('fuel');
            if (!sentence) {
                sentence = entity.addChild('entity_sentenceDigit', {
                    id: 'fuel',
                    sentence: '100'
                })
            }
            sentence.module('module_sentenceDigit')
                .sentence = ''+ ~~(100 * game.state.fuel / game.state.maxFuel);
        });

    game.Entity.define('entity_hud')
        .sprite('sprite_hud')
        .updateAnyways()
        .modules([
            'module_hudUpdater'
        ])
        .onCreate(function () {
            this.id = 'hud';
        })
})()