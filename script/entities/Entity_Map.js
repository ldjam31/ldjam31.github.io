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
    var MIN_ROCKS_PER_CELL = 0;
    var MAX_ROCKS_PER_CELL = 2;
    var MIN_MINES_PER_CELL = 0;
    var MAX_MINES_PER_CELL = 1;
    var CELL_SIZE = MAP_LIMITS / 10;

    game.Module.define('module_mapUpdater')
        .data({
            reinit: false
        })
        .onUpdate(function(entity, screen) {
            if (this.reinit) {
                var i, j, k, entitiesToPut, cell, originX, originY, nodeCell, nodeElem;

                this.reinit = false;
                nodeCell = entity.firstChildNode;
                    while (nodeCell) {
                        nodeElem = nodeCell.o.firstChildNode;
                        while (nodeElem) {
                            screen.removeEntity(nodeElem.o);
                            nodeElem = nodeElem.next;
                        }
                        nodeCell = nodeCell.next;
                    }
                
                
                //Dispatch mines and rocks on map
                for (i = 0; i < 10; ++i) {
                    for (j = 0; j < 10; ++j) {
                        originX = CELL_SIZE * i;
                        originY = CELL_SIZE * j;

                        cell = entity.child('cell_' + i + '_' + j);

                        if ((i === 4 || i === 5) && (j===4 || j === 5)) {
                            continue;
                        }

                        entitiesToPut = ~~(1 + Math.random() * (MAX_ROCKS_PER_CELL - MIN_ROCKS_PER_CELL)) + MIN_ROCKS_PER_CELL;
                        for (k = 0; k < entitiesToPut; ++k) {
                            cell.addChild('entity_rock', {
                                x: originX + ~~(Math.random() * CELL_SIZE),
                                y: originY + ~~(Math.random() * CELL_SIZE)
                            })
                        }

                        entitiesToPut = ~~(1 + Math.random() * (MAX_MINES_PER_CELL - MIN_MINES_PER_CELL)) + MIN_MINES_PER_CELL;
                        for (k = 0; k < entitiesToPut; ++k) {
                            cell.addChild('entity_mine', {
                                x: originX + ~~(Math.random() * CELL_SIZE),
                                y: originY + ~~(Math.random() * CELL_SIZE)
                            })
                        }

                    }
                }
            }
        })
        
    game.Entity.define('entity_map')
        .updateAnyways()
        .modules([
            'module_mapUpdater'
        ])
        .onCreate(function () {
            var i, j, k, entitiesToPut, cell, originX, originY;

            this.id = 'map';

            //Dispatch mines and rocks on map
            for (i = 0; i < 10; ++i) {
                for (j = 0; j < 10; ++j) {
                    originX = CELL_SIZE * i;
                    originY = CELL_SIZE * j;
                    
                    cell = this.addChild('entity_cell', {
                        id: 'cell_' + i + '_' + j
                    });
                    
                    if ((i === 4 || i === 5) && (j===4 || j === 5)) {
                        continue;
                    }
                    
                    entitiesToPut = ~~(1 + Math.random() * (MAX_ROCKS_PER_CELL - MIN_ROCKS_PER_CELL)) + MIN_ROCKS_PER_CELL;
                    for (k = 0; k < entitiesToPut; ++k) {
                        cell.addChild('entity_rock', {
                            x: originX + ~~(Math.random() * CELL_SIZE),
                            y: originY + ~~(Math.random() * CELL_SIZE)
                        })
                    }
                    
                    entitiesToPut = ~~(1 + Math.random() * (MAX_MINES_PER_CELL - MIN_MINES_PER_CELL)) + MIN_MINES_PER_CELL;
                    for (k = 0; k < entitiesToPut; ++k) {
                        cell.addChild('entity_mine', {
                            x: originX + ~~(Math.random() * CELL_SIZE),
                            y: originY + ~~(Math.random() * CELL_SIZE)
                        })
                    }

                }
            }
        })
})()
