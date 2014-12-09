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

    var ARMOUR_UPGRADE = 20;
    var O2_UPGRADE = 20;
    var FUEL_UPGRADE = 20;
    var AMMO_UPGRADE = 1;
    var ROCKET_DMG_UPGRADE = 5;
    var RADAR_RANGE_UPGRADE = 5;
    var RADAR_FREQUENCE_UPGRADE = -10;

    var ARMOUR_UPGRADE_INFO = '/h max';
    var O2_UPGRADE_INFO = '/o max';
    var FUEL_UPGRADE_INFO = '/f max';
    var AMMO_UPGRADE_INFO = '/a max';
    var ROCKET_DMG_UPGRADE_INFO = '/a damages max';
    var RADAR_RANGE_UPGRADE_INFO = 'radar range';
    var RADAR_FREQUENCE_UPGRADE_INFO = 'radar freq';

    game.Module.define('module_bonusUpdater')
        .data({
            ttl: 0
        })
        .onUpdate(function (entity, screen, game) {
            if (this.ttl <= 0) {
                screen.removeEntity(this);
            } else {
                this.ttl--;
            }
        })

    game.Entity.define('entity_bonus')
        .modules([
            'module_bonusUpdater',
            'module_type'
        ])
        .hitbox(Cassava.Hitbox.RECTANGLE_TYPE, {
            width: 20,
            height: 20
        })
        .updateAnyways()
        .onCreate(function (args) {
            this.module('module_type').type = args.type;
            this.module('module_type').value = args.value || 0;
            this.module('module_bonusUpdater').ttl = args.ttl;

            this.x = args.x;
            this.y = args.y;
        })
        .whenHitsEntities(['entity_player'], function (player, screen, game) {
            var type = this.module('module_type');
            var log, info;

            log = screen.getEntity('entity_log', 'log');

            game.Audio.channel('bonus').play('bonus');

            switch (type.type) {
                case 'ammo':
                case 'armour':
                case 'fuel':
                    game.state[type.type] += type.value;
                    if (game.state[type.type] > game.state[type.type + 'Max']) {
                        game.state[type.type] = game.state[type.type + 'Max'];
                    }
                    info = EVENT_ICON[type.type] + '+' + type.value;
                    break;
                case 'upgrade_armour':
                    game.state.armourMax += ARMOUR_UPGRADE;
                    game.state.armour = game.state.armourMax;
                    info = ARMOUR_UPGRADE_INFO + ' +' +ARMOUR_UPGRADE;
                    break;
                case 'upgrade_fuel':
                    game.state.fuelMax += FUEL_UPGRADE;
                    game.state.fuel = game.state.fuelMax;
                    info = FUEL_UPGRADE_INFO + ' +' +FUEL_UPGRADE;
                    break;
                case 'upgrade_ammo':
                    game.state.ammoMax += AMMO_UPGRADE;
                    game.state.ammo = game.state.ammoMax;
                    info = AMMO_UPGRADE_INFO + ' +' +AMMO_UPGRADE;
                    break;
                case 'upgrade_o2':
                    game.state.o2Max += O2_UPGRADE;
                    game.state.o2 = game.state.o2Max;
                    info = O2_UPGRADE_INFO + '+' +O2_UPGRADE;
                    break;
                case 'upgrade_rocketDmg':
                    game.state.rocketDamages += ROCKET_DMG_UPGRADE;
                    info = ROCKET_DMG_UPGRADE_INFO + '+' +ROCKET_DMG_UPGRADE;
                    break;
                case 'upgrade_radarRange':
                    game.state.radarRange += RADAR_RANGE_UPGRADE;
                    info = RADAR_RANGE_UPGRADE_INFO + '+' +RADAR_RANGE_UPGRADE;
                    break;
                case 'upgrade_radarFrequence':
                    game.state.radarFrequence += RADAR_FREQUENCE_UPGRADE;
                    info = RADAR_FREQUENCE_UPGRADE_INFO + '+' + -(~~(RADAR_FREQUENCE_UPGRADE * 10 / 60)) / 10 + 'hz';
                    break;
            }

            log.module('module_logUpdater').logsBuffer.push(info);

            screen.removeEntity(this);
        })
})()