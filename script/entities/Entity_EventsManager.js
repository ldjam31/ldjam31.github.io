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
        'Ever saw a giant squid?',
        'Is talking to you my job?',
        'Do you have a license for this?',
        'I wish I knew some jokes...',
		'Man you just got shrimped :D',
		'The whale is in the mussel.',
		'Just forget about the surface.',
		'Haven\'t your hopes sank yet?',
		'Are you wondering who I am?',
		'Can we get some action please?',
		'I think I just saw the Nautilus.',
		'What\'s with all the submarines?'
    ];

    var EVENTS_ITEM = [
        'ammo',
        'ammo',
        'fuel',
        'fuel',
        'armour'
    ];

    var EVENTS_UPGRADE = [
        'upgrade_armour',
        'upgrade_fuel',
        'upgrade_ammo',
        'upgrade_o2',
        'upgrade_rocketDmg',
        'upgrade_radarRange',
        'upgrade_radarFrequence'
    ];
    
    var EVENTS_SCRIPT = {
        welcome: [
            {
                text: 'Oh hello there! Welcome to',
                time: 0
            },
            {
                text: 'your new home :-)',
                time: 300
            },
			{
				text: '---',
				time: 0
			},
			{
				text: 'Let me explain some basic',
				time: 0
			},
            {
                text: 'things you\'ll need to know.',
                time: 300
            },
            {
                text: '---',
                time: 0
            },
			{
				text: 'Look at this brand new sonar,',
				time: 0
			},
			{
				text: 'don\'t break it you prick.',
				time: 300
			},
			{
				text: '---',
				time: 0
			},
			{
				text: '/h can repair this submarine.',
				time: 300
			},
			{
				text: '/f is fuel, don\'t drink that.',
				time: 300
			},
			{
				text: '/o will refill some oxygen.',
				time: 300
			},
			{
				text: '/a is ammo, the more the better.',
				time: 300
			},
			{
				text: '/u can upgrade your equipment.',
				time: 300
			},
			{
				text: '/s are enemies, destroy and loot.',
				time: 300
			},
			{
				text: '---',
				time: 0
			},
			{
				text: 'You know what coordinates',
				time: 0
			},
			{
				text: 'are, right? Good.',
				time: 300
			},
			{
				text: '--',
				time: 0
			},
			{
				text: 'By the way, avoid rocks and',
				time: 0
			},
			{
				text: 'mines, unless you\'re stupid.',
				time: 300
			},
			{
				text: '---',
				time: 0
			},
			{
				text: '??? Stop wasting time, just try',
				time: 0
			},
			{
				text: 'the damn buttons.',
				time: 300
			},
			{
				text: '---',
				time: 0
			}
        ],
        gameOver: [
			{
				text: '',
				time: 500
			},
            {
                text: 'Looks like you were no fit',
                time: 0
            },
			{
				text: 'for the job after all...',
				time: 300
			},
			{
				text: '---',
				time: 0
			},
            {
                text: 'I\'m pretty sure the fishes',
                time: 0
            },
			{
				text: 'will enjoy your rotten flesh.',
				time: 300
			},
			{
				text: '---',
				time: 0
			},
            {
                text: 'You know what, let\'s give it',
                time: 0
            },
            {
                text: 'another try.',
                time: 300
            }
        ]
    }

    var MIN_EVENTS_UPGRADE_CD = 7200;
    var MAX_EVENTS_UPGRADE_CD = 8000;
    var MIN_EVENTS_SUBMARINE_CD = 3000;
    var MAX_EVENTS_SUBMARINE_CD = 4000;
    var MIN_EVENTS_ITEM_CD = 1500;
    var MAX_EVENTS_ITEM_CD = 2500;
    var MIN_EVENTS_TEXT_CD = 24000;
    var MAX_EVENTS_TEXT_CD = 36000;
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
            itemColdDown: 1,
            submarineColdDown: MIN_EVENTS_SUBMARINE_CD,
            upgradeColdDown: MIN_EVENTS_UPGRADE_CD,
            currentScript: null,
            currentScriptIndex: 0,
            scriptSequenceTTL: 0
        })
        .onUpdate(function (e, screen, game) {
            var logger, event, player, cell, dist, angle, x, y, m, s, ttl, value, level;

            logger = screen.getEntity('entity_log', 'log');

            if (this.currentScript) {
                if (this.scriptSequenceTTL === 0) {
                    logger.module('module_logUpdater').logsBuffer.push(EVENTS_SCRIPT[this.currentScript][this.currentScriptIndex].text);
                    this.scriptSequenceTTL = EVENTS_SCRIPT[this.currentScript][this.currentScriptIndex].time;
                    this.currentScriptIndex ++;
                    if (this.currentScriptIndex === EVENTS_SCRIPT[this.currentScript].length) {
                        this.currentScriptIndex = 0;
                        this.currentScript = null;
                    }
                } else {
                    this.scriptSequenceTTL --;
                }
            } else {
                if (this.itemColdDown <= 0) {
                player = screen.getEntity('entity_player', 'player');
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
                    if (cell && x > 0 && x < MAP_LIMITS && y > 0 && y < MAP_LIMITS) {
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
                            '/s' + ' in ' + x + '.' + (MAP_LIMITS - y) + ' before ' + m + ':' + s
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
                        event = EVENTS_UPGRADE[~~(Math.random() * EVENTS_UPGRADE.length)];
                        m = ~~((game.state.time + ttl) % 216000 / 3600);
                        m = (m < 10) ? '0' + m : m;
                        s = ~~((game.state.time + ttl) % 216000 % 3600 / 60);
                        s = (s < 10) ? '0' + s : s;
                        logger.module('module_logUpdater').logsBuffer.push(
                            '/u' + ' in ' + x + '.' + (MAP_LIMITS - y) + ' before ' + m + ':' + s
                            );
                        cell.addChild('entity_bonus', {
                            type: event,
                            x: x,
                            y: y,
                            ttl: ttl
                        })
                    }
                }
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
            }

        })

    game.Entity.define('entity_eventsManager')
        .modules([
            'module_eventsManagerUpdater'
        ])
        .onCreate(function (args,screen) {
            this.id = 'eventsManager';
            this.module('module_eventsManagerUpdater').currentScript = 'welcome';
        })
})()
