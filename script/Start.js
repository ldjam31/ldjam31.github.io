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
    var assets = [
        {type: Cassava.Assets.IMAGE, name: 'hud', src: './assets/img/Board.png'},
        {type: Cassava.Assets.IMAGE, name: 'glass', src: './assets/img/Glass.png'},
        {type: Cassava.Assets.IMAGE, name: 'pointOnRadar', src: './assets/img/Icons.png'},
        {type: Cassava.Assets.IMAGE, name: 'charactersDigit', src: './assets/img/Digits.png'},
        {type: Cassava.Assets.IMAGE, name: 'charactersFont', src: './assets/img/Font.png'},
        {type: Cassava.Assets.IMAGE, name: 'shattering', src: './assets/img/shattering.png'},
        {type: Cassava.Assets.IMAGE, name: 'compass', src: './assets/img/CompassBack.png'},
    ];

    var INITIAL_ARMOUR = 100;
    var ARMOUR_MAX = 100;
    var INITIAL_FUEL = 100;
    var FUEL_MAX = 100;
    var INITIAL_O2 = 100;
    var O2_MAX = 100;
    var INITIAL_AMMO = 3;
    var AMMO_MAX = 5;
    var ROCKET_DAMAGES = 20;
    var ROCKET_SPEED = 0.1;

    game.initialState({
        ammo: INITIAL_AMMO,
        ammoMax: AMMO_MAX,
        rocketDamages: ROCKET_DAMAGES,
        rocketSpeed: ROCKET_SPEED,
//        armour: initialArmour,
        invincibility: 0,
        armour: INITIAL_ARMOUR,
        armourMax: ARMOUR_MAX,
//        fuel: initialFuel,
        fuel: INITIAL_FUEL,
        fuelMax: FUEL_MAX,
        o2: INITIAL_O2,
        o2Max: O2_MAX,
        time: 0
    });

    game.assets(assets)
        .background('#007224')
        .startAtScreen('screen_game');
})()