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
    var EVENTS_TYPES = {
        'text': 0
    };
    
    var EVENTS = [
        {
            type: EVENTS_TYPES.text,
            data: {
                content: "Hello robert ! :D",
            }
        },
        {
            type: EVENTS_TYPES.text,
            data: {
                content: "Je test des trucs ptain",
            }
        },
        {
            type: EVENTS_TYPES.text,
            data: {
                content: "C'est court",
            }
        },
        {
            type: EVENTS_TYPES.text,
            data: {
                content: ":3",
            }
        }
    ];

    var MIN_EVENTS_CD = 5400;
    var MAX_EVENTS_CD = 10800;
    
    game.Module.define('module_eventManagerUpdater')
        .data({
            coldDown: 0
        })
        .onUpdate(function (e, screen) {
            var logger, event;
            if (this.coldDown === 0) {
                this.coldDown = ~~(1 + Math.random() * (MAX_EVENTS_CD - MIN_EVENTS_CD + 1)) + MIN_EVENTS_CD;
                if (logger = screen.getEntity('entity_log', 'log')) {
                    event = EVENTS[~~(Math.random() * EVENTS.length)];
                    switch (event.type) {
                        case EVENTS_TYPES.text:
                            logger.module('module_logUpdater').logsBuffer.push(event.data.content);
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
