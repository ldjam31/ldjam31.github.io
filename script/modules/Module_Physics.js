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
    var MAX_LIMITS = 900;
    var MIN_LIMITS = 0;
    
    var data = {
        speed: 0,
        acceleration: 0,
        maxSpeed: 0,
        inertia: 0,
        
        rotation: 0,
        rotationSpeed: 0,
        maxRotationSpeed: 0,
        rotationAcceleration: 0,
        rotationInertia: 0,
    };

    function update(entity) {
        //Avoid NaN situations
        this.speed = this.speed || 0;
        this.rotationSpeed = this.rotationSpeed || 0;
        
        this.acceleration = this.acceleration || 0;
        this.rotationAcceleration = this.rotationAcceleration || 0;
        
        this.rotation = this.rotation || 0;
        
        this.speed = Cassava.fixedFloat(this.speed + this.acceleration);
        if (this.speed > 0 && this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < 0 && this.speed < -this.maxSpeed) {
            this.speed = -this.maxSpeed;
        }

        this.rotationSpeed = Cassava.fixedFloat(this.rotationSpeed + this.rotationAcceleration);
        if (this.rotationSpeed > 0 && this.rotationSpeed > this.maxRotationSpeed) {
            this.rotationSpeed = this.maxRotationSpeed;
        }
        if (this.rotationSpeed < 0 && this.rotationSpeed < -this.maxRotationSpeed) {
            this.rotationSpeed = -this.maxRotationSpeed;
        }

        this.rotation = Cassava.fixedFloat((this.rotation + this.rotationSpeed) % (2*Math.PI)); 

        entity.x = Cassava.fixedFloat(entity.x + this.speed * (Math.cos(this.rotation)));
        entity.y = Cassava.fixedFloat(entity.y + this.speed * (Math.sin(this.rotation)));

        if (entity.x < MIN_LIMITS) {
            entity.x = MIN_LIMITS;
        }
        
        if (entity.y < MIN_LIMITS) {
            entity.y = MIN_LIMITS;
        }
        
        if (entity.x2 > MAX_LIMITS) {
            entity.x = MAX_LIMITS - entity.width;
        }
        
        if (entity.y2 > MAX_LIMITS) {
            entity.y = MAX_LIMITS - entity.height;
        }

        if (this.speed < 0) {
            this.speed = Cassava.fixedFloat(this.speed + this.inertia);
            if (this.speed > 0) {
                this.speed = 0;
            }
        } else if (this.speed > 0) {
            this.speed = Cassava.fixedFloat(this.speed - this.inertia);
            if (this.speed < 0) {
                this.speed = 0;
            }
        }
        if (this.rotationSpeed < 0) {
            this.rotationSpeed = Cassava.fixedFloat(this.rotationSpeed + this.rotationInertia);
            if (this.rotationSpeed > 0) {
                this.rotationSpeed = 0;
            }
        } else if (this.rotationSpeed > 0) {
            this.rotationSpeed = Cassava.fixedFloat(this.rotationSpeed - this.rotationInertia);
            if (this.rotationSpeed < 0) {
                this.rotationSpeed = 0;
            }
        }

        this.acceleration = 0;
        this.rotationAcceleration = 0;
        
//        document.getElementById('debug').innerHTML = entity.x + ',' + entity.y + ',' + this.rotation;
    }

    function initPhysics(args) {
        this.maxSpeed = args.maxSpeed || 0;
        this.maxRotationSpeed = args.maxRotationSpeed || 0;

        this.inertia = args.inertia || 0;
        this.rotationInertia = args.rotationInertia || 0;
    }

    game.Module.define('module_physics')
        .data(data)
        .onInit(initPhysics)
        .onUpdate(update);
})();