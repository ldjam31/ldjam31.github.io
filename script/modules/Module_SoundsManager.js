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

(function () {
    
    var AMBIENT_TARGET_SPEED = 0.005;
    var END_TARGET_SPEED = 0.003;
    
    game.Module.define('module_soundsManager')
        .data({
            musicAmbientTarget: 1,
            musicAmbientTargetSpeed: AMBIENT_TARGET_SPEED,
            musicEndTarget: 0,
            musicEndTargetSpeed: END_TARGET_SPEED
        })
        .onUpdate(function (e, screen, game) {
            var player = screen.getEntity('entity_player', 'player');
        
            if (game.Audio.channel('musicAmbient').volume < this.musicAmbientTarget) {
                game.Audio.channel('musicAmbient').volume = (game.Audio.channel('musicAmbient').volume + this.musicAmbientTargetSpeed) * MUSIC_VOLUME;
            } else if (game.Audio.channel('musicAmbient').volume > this.musicAmbientTarget) {
                game.Audio.channel('musicAmbient').volume = (game.Audio.channel('musicAmbient').volume - this.musicAmbientTargetSpeed) * MUSIC_VOLUME;
            }
            if (game.Audio.channel('musicEnd').volume < this.musicEndTarget) {
                game.Audio.channel('musicEnd').volume = (game.Audio.channel('musicEnd').volume + this.musicEndTargetSpeed) * MUSIC_VOLUME;
            } else if (game.Audio.channel('musicEnd').volume > this.musicEndTarget) {
                game.Audio.channel('musicEnd').volume = (game.Audio.channel('musicEnd').volume - this.musicEndTargetSpeed) * MUSIC_VOLUME;
            }
            if (game.state.armour < 40) {
                this.musicEndTarget = 1 - (game.state.armour / 40);
            } else {
                this.musicEndTarget = 0;
            }
        })
        .onInit(function () {
            game.Audio.channel('musicAmbient').play('ambient').loop().volume = MUSIC_VOLUME;
            game.Audio.channel('musicEnd').play('end').loop().volume = 0;
        })
})()

