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
                type: 'entity_map'
            },
            {type: 'entity_radarScreen'},
            {type: 'entity_shattering'},
            {type: 'entity_eventsManager'},
        ])
        .postEventModules([
            'module_radar',
            'module_statsUpdater',
            'module_soundsManager',
        ])
        .onCreate(function () {
            game.Audio.channel('sonar').volume = FX_VOLUME;
            game.Audio.channel('shatter').volume = FX_VOLUME;
            game.Audio.channel('bonus').volume = FX_VOLUME;
            game.Audio.channel('torpedo').volume = FX_VOLUME;
            game.Audio.channel('hit').volume = FX_VOLUME;
        })
})()
