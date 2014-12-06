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
    var centerOnPlayer = function (player, s, game) {
        game.camera.x = Cassava.fixedFloat(player.xCenter - 400);
        game.camera.y = Cassava.fixedFloat(player.yCenter - 300);
    }

    var placeRadarScreen = function (radarScreen, s, g) {
        var nodePoint = radarScreen.firstChildNode;

        radarScreen.x = Cassava.fixedFloat(game.camera.x - 20);
        radarScreen.y = Cassava.fixedFloat(game.camera.y - 20);

        while (nodePoint) {
            nodePoint.o.x = nodePoint.o.sprite.x + game.camera.x;
            nodePoint.o.y = nodePoint.o.sprite.y + game.camera.y;

            nodePoint = nodePoint.next;
        }
    }

    var placeHud = function (hud, s, game) {
        var child;

        hud.x = Cassava.fixedFloat(game.camera.x - 20);
        hud.y = Cassava.fixedFloat(game.camera.y - 20);

        child = hud.child('armor')
        if (child) {
            child.x = Cassava.fixedFloat(game.camera.x + 44);
            child.y = Cassava.fixedFloat(game.camera.y + 192);
            child.module('module_sentenceDigit').update(child);
        }

        child = hud.child('o2')
        if (child) {
            child.x = Cassava.fixedFloat(game.camera.x + 44);
            child.y = Cassava.fixedFloat(game.camera.y + 301);
            child.module('module_sentenceDigit').update(child);
        }

        child = hud.child('fuel')
        if (child) {
            child.x = Cassava.fixedFloat(game.camera.x + 44);
            child.y = Cassava.fixedFloat(game.camera.y + 411);
            child.module('module_sentenceDigit').update(child);
        }
    }

    game.Module.define('module_cameraPlacer')
        .data({})
        .onUpdate(function (e, screen) {
            screen.ifEntity('entity_player', 'player', centerOnPlayer);
            screen.ifEntity('entity_hud', 'hud', placeHud);
            screen.ifEntity('entity_radarScreen', 'radarScreen', placeRadarScreen);
        })
})()