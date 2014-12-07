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

    var initialArmor = 100;
    var initialFuel = 100;
    var initialO2 = 100;
    var initialAmmo = 0;
    var ammoMax = 5;

    game.initialState({
        ammo: initialAmmo,
        ammoMax: ammoMax,
//        armor: initialArmor,
        invincibility: 0,
        armor: 67,
        armorMax: initialArmor,
//        fuel: initialFuel,
        fuel: 78,
        fuelMax: initialFuel,
        o2: initialO2,
        o2Max: initialO2,
        time: 0
    });

    game.assets(assets)
        .background('#007224')
        .startAtScreen('screen_game');
})()