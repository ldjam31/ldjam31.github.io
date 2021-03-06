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

var FX_VOLUME = 0.9;
var MUSIC_VOLUME = 0.99;
var REFILL_VOLUME = 0.5;
var SONAR_VOLUME = 0.15;
var BONUS_VOLUME = 0.4;

var INITIAL_ARMOUR = 100;
var ARMOUR_MAX = 100;
var INITIAL_FUEL = 100;
var FUEL_MAX = 100;
var INITIAL_O2 = 100;
var O2_MAX = 100;
var INITIAL_AMMO = 3;
var AMMO_MAX = 5;
var ROCKET_DAMAGES = 15;
var ROCKET_SPEED = 0.1;
var ROCKET_RELOAD = 300;
var RADAR_FREQUENCE = 90;
var RADAR_RANGE = 120;


!(function () {
    var assets = [
        {type: Cassava.Assets.IMAGE, name: 'hud', src: './assets/img/Board.png'},
        {type: Cassava.Assets.IMAGE, name: 'glass', src: './assets/img/Glass.png'},
        {type: Cassava.Assets.IMAGE, name: 'pointOnRadar', src: './assets/img/Icons.png'},
        {type: Cassava.Assets.IMAGE, name: 'charactersDigit', src: './assets/img/Digits.png'},
        {type: Cassava.Assets.IMAGE, name: 'charactersFont', src: './assets/img/Font.png'},
        {type: Cassava.Assets.IMAGE, name: 'shattering', src: './assets/img/shattering.png'},
        {type: Cassava.Assets.IMAGE, name: 'compass', src: './assets/img/CompassBack.png'},
        {type: Cassava.Assets.IMAGE, name: 'fireButton', src: './assets/img/FireOn.png'},
        {type: Cassava.Assets.IMAGE, name: 'refillButton', src: './assets/img/RefillOn.png'},
        {type: Cassava.Assets.IMAGE, name: 'rotationHandle', src: './assets/img/RotationHandle.png'},
        {type: Cassava.Assets.IMAGE, name: 'speedHandle', src: './assets/img/SpeedHandle.png'},
        
        {type: Cassava.Assets.AUDIO, name: 'ambient', src: './assets/snd/Ambient.ogg'},
        {type: Cassava.Assets.AUDIO, name: 'bonus', src: './assets/snd/Bonus.wav'},
        {type: Cassava.Assets.AUDIO, name: 'end', src: './assets/snd/End.ogg'},
        {type: Cassava.Assets.AUDIO, name: 'hell', src: './assets/snd/Hell.ogg'},
        {type: Cassava.Assets.AUDIO, name: 'hitA', src: './assets/snd/HitA.wav'},
        {type: Cassava.Assets.AUDIO, name: 'hitB', src: './assets/snd/HitB.wav'},
        {type: Cassava.Assets.AUDIO, name: 'shatterA', src: './assets/snd/ShatterA.wav'},
        {type: Cassava.Assets.AUDIO, name: 'shatterB', src: './assets/snd/ShatterB.wav'},
        {type: Cassava.Assets.AUDIO, name: 'sonar', src: './assets/snd/Sonar.wav'},
        {type: Cassava.Assets.AUDIO, name: 'torpedo', src: './assets/snd/Torpedo.wav'},
        {type: Cassava.Assets.AUDIO, name: 'air', src: './assets/snd/Air.wav'}
    ];

    game.initialState({
        ammo: INITIAL_AMMO,
        ammoMax: AMMO_MAX,
        rocketDamages: ROCKET_DAMAGES,
        rocketSpeed: ROCKET_SPEED,
        initialRocketReload: ROCKET_RELOAD,
        rocketReload: ROCKET_RELOAD,
        invincibility: 0,
        armour: INITIAL_ARMOUR,
        armourMax: ARMOUR_MAX,
        fuel: INITIAL_FUEL,
        fuelMax: FUEL_MAX,
        o2: INITIAL_O2,
        o2Max: O2_MAX,
        time: 0,
        radarRange: RADAR_RANGE,
        radarFrequence: RADAR_FREQUENCE,
        screenState: 0
    });

    game.assets(assets)
        .background('#007224')
        .startAtScreen('screen_game');

    game.Audio
        .addChannel('sonar')
        .addChannel('shatter')
        .addChannel('bonus')
        .addChannel('torpedo')
        .addChannel('hit')
        .addChannel('musicAmbient')
        .addChannel('musicEnd')
        .addChannel('refill');
})()