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
    game.Module.define('module_rocketUpdater')
        .data({
            ttl: 600,
            speedX: 0,
            speedY: 0
        })
        .onUpdate(function (entity, screen) {
            if (this.ttl <= 0) {
                screen.removeEntity(entity);
            } else {
                entity.x += this.speedX;
                entity.y += this.speedY;
                this.ttl--;
            }
        })

    game.Entity.define('entity_rocket')
        .modules([
            'module_rocketUpdater',
            'module_type',
        ])
            .updateAnyways()
        .hitbox(Cassava.Hitbox.RECTANGLE_TYPE, {
            widht: 0,
            height: 0
        })
        .onCreate(function (args) {
            if (args.type === 'rocket_player') {
                this.width = 45;
                this.height = 45;
            } else {
                this.width = 15;
                this.height = 15;
            }
            this.module('module_type').type = args.type;
            
            this.x = args.x - this.width / 2;
            this.y = args.y - this.height / 2;
            this.module('module_rocketUpdater').speedX = args.speedX;
            this.module('module_rocketUpdater').speedY = args.speedY;
        })
        .whenHitsEntities(['entity_mine'], function (mine, screen) {
            screen.removeEntity(mine);
            screen.removeEntity(this);
        })
})()


