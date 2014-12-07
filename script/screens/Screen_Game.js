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
        {type: 'entity_mine', data: {x: 560, y: 560}},
        {type: 'entity_mine', data: {x: 540, y: 560}},
        {type: 'entity_mine', data: {x: 520, y: 560}},
        {type: 'entity_mine', data: {x: 500, y: 560}},
        {type: 'entity_mine', data: {x: 560, y: 540}},
        {type: 'entity_mine', data: {x: 540, y: 540}},
        {type: 'entity_mine', data: {x: 520, y: 540}},
        {type: 'entity_mine', data: {x: 500, y: 540}},
        {type: 'entity_mine', data: {x: 560, y: 520}},
        {type: 'entity_mine', data: {x: 540, y: 520}},
        {type: 'entity_mine', data: {x: 520, y: 520}},
        {type: 'entity_mine', data: {x: 500, y: 520}},
        {type: 'entity_mine', data: {x: 560, y: 500}},
        {type: 'entity_mine', data: {x: 540, y: 500}},
        {type: 'entity_mine', data: {x: 520, y: 500}},
        {type: 'entity_mine', data: {x: 500, y: 500}},
        {type: 'entity_rock', data: {x: 400, y: 450}},
        {type: 'entity_rock', data: {x: 500, y: 450}},
        {type: 'entity_rock', data: {x: 450, y: 400}},
        {type: 'entity_rock', data: {x: 450, y: 500}},
        {type: 'entity_bonus', data: {x: 100, y: 100, type:'fuel', value: '10'}},
        {type: 'entity_bonus', data: {x: 200, y: 200, type:'armor', value: '10'}},
        {type: 'entity_bonus', data: {x: 300, y: 300, type:'ammo', value: '2'}},
        {type: 'entity_bonus', data: {x: 400, y: 530, type:'ammo', value: '2'}}
    ]
    
    game.Screen.define('screen_game')
        .entities([
            {type: 'entity_hud'},
            {
                type: 'entity_player', 
                data: {
                    x: MAP_LIMITS / 2,
                    y: MAP_LIMITS / 2
                }
            },
            {
                type: 'entity_map',
                data: initialEnemies
            },
            {type: 'entity_radarScreen'},
            {type: 'entity_shattering'}
        ])
        .postEventModules([
            'module_radar',
            'module_statsUpdater',
        ]);
})()