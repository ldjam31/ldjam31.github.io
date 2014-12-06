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
    var initialEnemies = [
        {type: 'entity_mine', data: {x: 60, y: 60}},
        {type: 'entity_mine', data: {x: 40, y: 60}},
        {type: 'entity_mine', data: {x: 20, y: 60}},
        {type: 'entity_mine', data: {x: 0, y: 60}},
        {type: 'entity_mine', data: {x: 60, y: 40}},
        {type: 'entity_mine', data: {x: 40, y: 40}},
        {type: 'entity_mine', data: {x: 20, y: 40}},
        {type: 'entity_mine', data: {x: 0, y: 40}},
        {type: 'entity_mine', data: {x: 60, y: 20}},
        {type: 'entity_mine', data: {x: 40, y: 20}},
        {type: 'entity_mine', data: {x: 20, y: 20}},
        {type: 'entity_mine', data: {x: 0, y: 20}},
        {type: 'entity_mine', data: {x: 60, y: 0}},
        {type: 'entity_mine', data: {x: 40, y: 0}},
        {type: 'entity_mine', data: {x: 20, y: 0}},
        {type: 'entity_mine', data: {x: 0, y: 0}},
    ]
    
    game.Screen.define('screen_game')
        .entities([
            {type: 'entity_hud'},
            {
                type: 'entity_player', 
                data: {
                    x: 500,
                    y: 500
                }
            },
            {
                type: 'entity_obstacles',
                data: initialEnemies
            },
            {type: 'entity_radarScreen'}
        ])
        .postEventModules([
            'module_radar',
            'module_statsUpdater',
        ]);
})()