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
    var MAX_LOGS_DISPLAYABLE = 4;
    var LOGS_X = 193;
    var LOGS_Y = 9;

    game.Module.define('module_logUpdater')
        .data({
            lastLog: null
        })
        .onUpdate(function (entity) {
            if (this.lastLog) {
                entity.child('log0').module('module_sentence').sentence = entity.child('log1').module('module_sentence').sentence;
                entity.child('log1').module('module_sentence').sentence = entity.child('log2').module('module_sentence').sentence;
                entity.child('log2').module('module_sentence').sentence = entity.child('log3').module('module_sentence').sentence;
                entity.child('log3').module('module_sentence').sentence = this.lastLog;
                
                this.lastLog = null;
            }
        });

    game.Entity.define('entity_log')
        .modules([
            'module_logUpdater'
        ])
        .onCreate(function () {
            this.id = 'log';
            
            for (i = 0; i < MAX_LOGS_DISPLAYABLE; ++i) {
                this.addChild('entity_sentence', {
                    id: 'log' + i,
                    sentence: 'a/+,,\'' + i,
                    character: 'entity_characterFont',
                    characterWidth: 15,
                    characterHeight: 30,
                    x: LOGS_X,
                    y: LOGS_Y + i * 22
                })
            }
        })


})();