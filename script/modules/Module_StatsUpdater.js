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
    var O2_DECREASING = 0.008;
    
    game.Module.define('module_statsUpdater')
        .data({
            o2Decreasing: O2_DECREASING
        })
        .onUpdate(function (e,screen,game) {
            if (game.state.invincibility > 0) {
                game.state.invincibility --;
            }
                
            game.state.o2 -= this.o2Decreasing;
            game.state.time ++;

            game.state.rocketReload --;
            
            game.state.armour = (game.state.armour < 0) ? 0 : game.state.armour;
            game.state.fuel = (game.state.fuel < 0) ? 0 : game.state.fuel;
            game.state.o2 = (game.state.o2 < 0) ? 0 : game.state.o2;
            if (game.state.armour <= 0 || game.state.o2 <= 0) {
                
                screen.getEntity('entity_log', 'log').module('module_logUpdater').logsBuffer.push('================');
                screen.getEntity('entity_log', 'log').module('module_logUpdater').logsBuffer.push('GAME OVER');
                screen.getEntity('entity_log', 'log').module('module_logUpdater').logsBuffer.push('SCORE:' + ~~(game.state.time / 60));
                screen.getEntity('entity_map', 'map').module('module_mapUpdater').reinit = true;
                game.state = {
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
                }
                screen.getEntity('entity_player', 'player').x = screen.getEntity('entity_player', 'player').y = MAP_LIMITS / 2;
                screen.getEntity('entity_eventsManager', 'eventsManager').module('module_eventsManagerUpdater').currentScript = 'gameOver';
            }
        })
})()