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

var EVENT_ICON = {
    ammo: '/a',
    fuel: '/f',
    armour: '/h'
};
(function ( ) {

    var EVENTS_TEXT = [
        "Hello robert ! :D",
        "Je test des trucs ptain",
        "C'est court",
        ":3"
    ];

    var EVENTS_ITEM = [
        'ammo',
        'ammo',
        'fuel',
        'fuel',
        'armour'
    ];

    var MIN_EVENTS_UPGRADE_CD = 7200;
    var MAX_EVENTS_UPGRADE_CD = 8000;
    var MIN_EVENTS_SUBMARINE_CD = 2000;
    var MAX_EVENTS_SUBMARINE_CD = 3000;
    var MIN_EVENTS_ITEM_CD = 1000;
    var MAX_EVENTS_ITEM_CD = 2000;
    var MIN_EVENTS_TEXT_CD = 24000;
    var MAX_EVENTS_TEXT_CD = 36000;
//    var MIN_EVENTS_CD = 540;
//    var MAX_EVENTS_CD = 1080;
    var MIN_SPAWN_DIST = 200;
    var MAX_SPAWN_DIST = 350;

    var SUBMARINE_TIME_BEFORE_LVL_2 = 18000;
    var SUBMARINE_TIME_BEFORE_LVL_3 = 36000;

    var MIN_ARMOUR = 10;
    var MAX_ARMOUR = 40;
    var MIN_FUEL = 20;
    var MAX_FUEL = 60;
    var MIN_AMMO = 1;
    var MAX_AMMO = 3;
    var MIN_TTL = 3600;
    var MAX_TTL = 5400;

    game.Module.define('module_eventsManagerUpdater')
        .data({
            textColdDown: MIN_EVENTS_TEXT_CD,
            itemColdDown: MIN_EVENTS_ITEM_CD,
            submarineColdDown: MIN_EVENTS_SUBMARINE_CD,
            upgradeColdDown: MIN_EVENTS_UPGRADE_CD
        })
        .onUpdate(function (e, screen, game) {
            var logger, event, player, cell, dist, angle, x, y, m, s, ttl, value, level;


            if (this.itemColdDown <= 0) {
                player = screen.getEntity('entity_player', 'player');
                logger = screen.getEntity('entity_log', 'log');
                if (player && logger) {
                    dist = ~~(1 + Math.random() * (MAX_SPAWN_DIST - MIN_SPAWN_DIST + 1)) + MIN_SPAWN_DIST;
                    angle = Math.random() * Math.PI * 2;
                    x = ~~(player.x + dist * Math.cos(angle));
                    y = ~~(player.y + dist * Math.sin(angle));
                    cell = screen.getEntity('entity_cell', 'cell_' + ~~(x * 10 / (MAP_LIMITS)) + '_' + ~~(y * 10 / (MAP_LIMITS)));
                    if (cell) {
                        ttl = ~~(1 + Math.random() * (MAX_TTL - MIN_TTL + 1)) + MIN_TTL;
                        event = EVENTS_ITEM[~~(Math.random() * EVENTS_ITEM.length)];
                        switch (event) {
                            case 'ammo':
                                value = ~~(1 + Math.random() * (MAX_AMMO - MIN_AMMO + 1)) + MIN_AMMO;
                                break;
                            case 'fuel':
                                value = ~~(1 + Math.random() * (MAX_FUEL - MIN_FUEL + 1)) + MIN_FUEL;
                                break;
                            case 'armour':
                                value = ~~(1 + Math.random() * (MAX_ARMOUR - MIN_ARMOUR + 1)) + MIN_ARMOUR;
                                break;
                        }
                        m = ~~((game.state.time + ttl) % 216000 / 3600);
                        m = (m < 10) ? '0' + m : m;
                        s = ~~((game.state.time + ttl) % 216000 % 3600 / 60);
                        s = (s < 10) ? '0' + s : s;
                        logger.module('module_logUpdater').logsBuffer.push(
                            EVENT_ICON[event] + ' in ' + x + '.' + (MAP_LIMITS - y) + ' before ' + m + ':' + s
                            );
                        cell.addChild('entity_bonus', {
                            type: event,
                            x: x,
                            y: y,
                            ttl: ttl,
                            value: value
                        })
                    }
                }
                this.itemColdDown = ~~(1 + Math.random() * (MAX_EVENTS_ITEM_CD - MIN_EVENTS_ITEM_CD + 1)) + MIN_EVENTS_ITEM_CD;
            } else {
                this.itemColdDown--;
            }

            if (this.submarineColdDown <= 0) {
                player = screen.getEntity('entity_player', 'player');
                logger = screen.getEntity('entity_log', 'log');
                if (player && logger) {
                    dist = ~~(1 + Math.random() * (MAX_SPAWN_DIST - MIN_SPAWN_DIST + 1)) + MIN_SPAWN_DIST;
                    angle = Math.random() * Math.PI * 2;
                    x = ~~(player.x + dist * Math.cos(angle));
                    y = ~~(player.y + dist * Math.sin(angle));
                    cell = screen.getEntity('entity_cell', 'cell_' + ~~(x * 10 / (MAP_LIMITS)) + '_' + ~~(y * 10 / (MAP_LIMITS)));
                    if (cell) {
                        if (game.state.time > SUBMARINE_TIME_BEFORE_LVL_3) {
                            level = 3;
                        } else if (game.state.time > SUBMARINE_TIME_BEFORE_LVL_3) {
                            level = 2;
                        } else {
                            level = 1;
                        }
                        ttl = ~~(1 + Math.random() * (MAX_TTL - MIN_TTL + 1)) + MIN_TTL;
                        m = ~~((game.state.time + ttl) % 216000 / 3600);
                        m = (m < 10) ? '0' + m : m;
                        s = ~~((game.state.time + ttl) % 216000 % 3600 / 60);
                        s = (s < 10) ? '0' + s : s;
                        logger.module('module_logUpdater').logsBuffer.push(
                            '/s ' + ' in ' + x + '.' + (MAP_LIMITS - y) + ' before ' + m + ':' + s
                            );
                        cell.addChild('entity_submarine', {
                            x: x,
                            y: y,
                            ttl: ttl,
                            level: level
                        })
                    }
                }
                this.submarineColdDown = ~~(1 + Math.random() * (MAX_EVENTS_SUBMARINE_CD - MIN_EVENTS_SUBMARINE_CD + 1)) + MIN_EVENTS_SUBMARINE_CD;
            } else {
                this.submarineColdDown--;
            }

            if (this.upgradeColdDown <= 0) {

                this.upgradeColdDown = ~~(1 + Math.random() * (MAX_EVENTS_UPGRADE_CD - MIN_EVENTS_UPGRADE_CD + 1)) + MIN_EVENTS_UPGRADE_CD;
            } else {
                this.upgradeColdDown--;
            }

            if (this.textColdDown <= 0) {
                logger = screen.getEntity('entity_log', 'log');
                if (logger) {
                    event = EVENTS_TEXT[~~(Math.random() * EVENTS_TEXT.length)];
                    logger.module('module_logUpdater').logsBuffer.push(event);
                    this.textColdDown = ~~(1 + Math.random() * (MAX_EVENTS_TEXT_CD - MIN_EVENTS_TEXT_CD + 1)) + MIN_EVENTS_TEXT_CD;
                }
            } else {
                this.textColdDown--;
            }

        })

    game.Entity.define('entity_eventsManager')
        .modules([
            'module_eventsManagerUpdater'
        ])
        .onCreate(function () {
            this.id = 'eventsManager';
        })
})()
