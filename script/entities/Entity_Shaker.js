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
    game.Module.define('module_shaking')
        .data({
            intensity: 0,
            initialTTL: 0,
            ttl: 0,
            
            speedX: 0,
            speedY: 0,
            movementTTL: 5,
            movementInitialTTL: 5,
            
            //IN
            newIntensity: null,
            newTTL: null
        })
        .onUpdate(function(e,s,game) {
            if (this.newIntensity !== null && this.newTTL !== null) {
                if (this.intensity < this.newIntensity || this.ttl <= 0) {
                    this.intensity = this.newIntensity;
                    this.initialTTL = this.newTTL;
                    this.ttl = this.newTTL;
                }
            }
        
            this.newIntensity = null;
            this.newTTL = null;
            
            if (this.ttl > 0) {
                if (this.movementTTL <= 0) {
                    game.camera.x = (Math.random() * 2 - 1) * this.intensity * (this.ttl / this.initialTTL);
                    game.camera.y = (Math.random() * 2 - 1) * this.intensity * (this.ttl / this.initialTTL);
                    this.movementTTL = this.movementInitialTTL;
                } else {
                    this.movementTTL --;
                }
                this.ttl--;
            } else {
                game.camera.x = 0;
                game.camera.y = 0;
            }
        });
        
        game.Entity.define('entity_shaker')
            .onCreate(function() {
                this.id = 'shaker';
            })
                .updateAnyways()
            .modules([
                'module_shaking'
            ]);
})();