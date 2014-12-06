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
            width: 30,
            height: 30
        })
        .onCreate(function (args) {
            this.module('module_type').type = args.type;
            this.module('module_type').value = args.value || 0;
            this.module('module_bonusUpdater').ttl = args.ttl;
            
            this.x = args.x;
            this.y = args.y;
        })
        .whenHitsEntities(['entity_player'], function (player, screen) {
            var type = this.module('module_type');
            
            switch (type.type) {
                case'ammo':
                case'armor':
                case'fuel':
                    game.state[type.type] += type.value;
                    if (game.state[type.type] > game.state[type.type + 'Max']) {
                        game.state[type.type] = game.state[type.type + 'Max'];
                    }
                    break;
            }
            
            screen.removeEntity(this);
        })
})()