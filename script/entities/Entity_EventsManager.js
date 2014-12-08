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
    var EVENT_ICON = {
        ammo: '/a',
        fuel: '/f',
        armour: '/h'
    };
    
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

//    var MIN_EVENTS_CD = 5400;
//    var MAX_EVENTS_CD = 10800;
    var MIN_EVENTS_CD = 2700;
    var MAX_EVENTS_CD = 4050;
//    var MIN_EVENTS_CD = 540;
//    var MAX_EVENTS_CD = 1080;

    var EVENT_TEXT_PROBA = 0.1;
    var EVENT_ITEM_PROBA = 0.6;
    var EVENT_UPGRADE_PROBA = 0.3;

    var MIN_SPAWN_ITEM_DIST = 300;
    var MAX_SPAWN_ITEM_DIST = 400;

    var MIN_ARMOUR = 10;
    var MAX_ARMOUR = 40;
    var MIN_FUEL = 20;
    var MAX_FUEL = 60;
    var MIN_AMMO = 1;
    var MAX_AMMO = 3;
    var ITEM_MIN_TTL = 7200;
    var ITEM_MAX_TTL = 10800;

    game.Module.define('module_eventManagerUpdater')
        .data({
            coldDown: 0
        })
        .onUpdate(function (e, screen, game) {
            var logger, event, map, player, cell, dist, angle, x, y, eventType, h, m, ttl, value, rnd;

            rnd = Math.random();
            if (rnd < EVENT_TEXT_PROBA) {
                eventType = 'text';
            } else if (rnd < EVENT_TEXT_PROBA + EVENT_ITEM_PROBA) {
                eventType = 'item';
            } else {
                eventType = 'bonus';
            }

            if (this.coldDown === 0) {
                this.coldDown = ~~(1 + Math.random() * (MAX_EVENTS_CD - MIN_EVENTS_CD + 1)) + MIN_EVENTS_CD;
                if (logger = screen.getEntity('entity_log', 'log')) {
                    switch (eventType) {
                        case 'text':
                            event = EVENTS_TEXT[~~(Math.random() * EVENTS_TEXT.length)];
                            logger.module('module_logUpdater').logsBuffer.push(event);
                            break;
                        case 'item':
                            player = screen.getEntity('entity_player', 'player');
                            if (player) {
                                dist = ~~(1 + Math.random() * (MAX_SPAWN_ITEM_DIST - MIN_SPAWN_ITEM_DIST + 1)) + MIN_SPAWN_ITEM_DIST;
                                angle = Math.random() * Math.PI * 2;
                                x = ~~(player.x + dist * Math.cos(angle));
                                y = ~~(player.y + dist * Math.sin(angle));
                                cell = screen.getEntity('entity_cell', 'cell_' + ~~(x * 10 / (MAP_LIMITS)) + '_' + ~~(y * 10 / (MAP_LIMITS)));
                                if (cell) {
                                    ttl = ~~(1 + Math.random() * (ITEM_MAX_TTL - ITEM_MIN_TTL + 1)) + ITEM_MIN_TTL;
                                    switch(event) {
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
                                    value = ~~(1 + Math.random() * (ITEM_MAX_TTL - ITEM_MIN_TTL + 1)) + ITEM_MIN_TTL;
                                    event = EVENTS_ITEM[~~(Math.random() * EVENTS_ITEM.length)];
                                    h = ~~((game.state.time + ttl) / 216000);
                                    h = (h < 10) ? '0' + h : h;
                                    m = ~~((game.state.time + ttl) % 216000 / 3600);
                                    m = (m < 10) ? '0' + m : m;
                                    logger.module('module_logUpdater').logsBuffer.push(
                                        EVENT_ICON[event] + ' at ' + x + '.' + (MAP_LIMITS - y) + ' before ' + h + ':' + m
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
                            break;
                    }
                }
            } else {
                this.coldDown--;
            }
        })

    game.Entity.define('entity_eventsManager')
        .modules([
            'module_eventManagerUpdater'
        ])
        .onCreate(function () {
            this.id = 'eventsManager';
        })
})()
