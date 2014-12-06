!(function () {
    var CHARACTER_WIDTH = 22;
    var CHARACTER_HEIGHT = 37;

    var Characters = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        dot: 10,
        colon: 11,
        minus: 12,
        empty: 13
    };

    game.Module.define('module_sentenceDigit')
        .data(
            {
                sentence: ''
            }
        )
        .onUpdate(
            function (entity) {
                var y = entity.y,
                    x = entity.x,
                    childNode = entity.firstChildNode,
                    i,
                    frame;


                i = 0;

                for (i = 0; i > 0 && i < this.characters.length - this.sentence.length; ++i) {
                    this.sentence += ' ';
                }

                for (i = 0; i < this.sentence.length; ++i) {
                    if (this.sentence[i] === ' ') {
                        frame = Characters.empty;
                    } else if (this.sentence[i] === ':') {
                        frame = Characters.colon;
                    } else if (this.sentence[i] === '.') {
                        frame = Characters.dot;
                    } else if (this.sentence[i] === '-') {
                        frame = Characters.minus;
                    } else {
                        frame = Characters[this.sentence[i]];
                    }

                    if (!childNode) {
                        entity.addChild(
                            'entity_characterDigit', {
                                frame: frame
                            }
                        );

                        childNode = entity.lastChildNode;
                    }

                    childNode.o.x = x;
                    childNode.o.y = y;

                    childNode.o.sprite.frame = frame;

                    x += CHARACTER_WIDTH;

                    childNode = childNode.next;

                    if (i === this.sentence.length && childNode) {
                        this.sentence += ' ';
                    }
                }

                while (childNode) {
                    childNode.o.x = x;
                    childNode.o.y = y;
                    childNode.o.sprite.frame = Characters.empty;

                    x += CHARACTER_HEIGHT;
                    childNode = childNode.next;
                }
            }
        );

    game.Entity.define('entity_characterDigit')
        .sprite('sprite_charactersDigit')
        .onCreate(
            function (args) {
                this.sprite.stop();
                this.sprite.frame = args.frame;
            }
        );

    game.Entity.define('entity_sentenceDigit')
        .modules(['module_sentenceDigit'])
        .onCreate(
            function (args, screen) {
                this.x = args.x;
                this.y = args.y;
                this.id = args.id || Cassava.getId();
                this.module('module_sentenceDigit').sentence = args.sentence;
            }
        );
})()