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
        exc: 13,
        qst: 14,
        equal: 15,
        quote: 16,
        leftp: 17,
        rightp: 18,
        plus: 19,
        comma: 20,
        slash: 21,
        A: 22,
        B: 23,
        C: 24,
        D: 25,
        E: 26,
        F: 27,
        G: 28,
        H: 29,
        I: 30,
        J: 31,
        K: 32,
        L: 33,
        M: 34,
        N: 35,
        O: 36,
        P: 37,
        Q: 38,
        R: 39,
        S: 40,
        T: 41,
        U: 42,
        V: 43,
        W: 44,
        X: 45,
        Y: 46,
        Z: 47,
        a: 48,
        b: 49,
        c: 50,
        d: 51,
        e: 52,
        f: 53,
        g: 54,
        h: 55,
        i: 56,
        j: 57,
        k: 58,
        l: 59,
        m: 60,
        n: 61,
        o: 62,
        p: 63,
        q: 64,
        r: 65,
        s: 66,
        t: 67,
        u: 68,
        v: 69,
        w: 70,
        x: 71,
        y: 72,
        z: 73,
        upgrade: 74,
        armour: 75,
        ammo: 76,
        fuel: 77,
        o2: 78,
        submarine: 79
    };

    game.Module.define('module_sentence')
        .data(
            {
                character: null,
                characterWidth: 1,
                characterHeight: 1,
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

                for (i = 0; i < this.sentence.length; ++i) {
                    switch (this.sentence[i]) {
                        case ' ':
                            frame = null;
                            break;
                        case ':':
                            frame = Characters.colon;
                            break;
                        case '.':
                            frame = Characters.dot;
                            break;
                        case '-':
                            frame = Characters.minus;
                            break;
                        case '!':
                            frame = Characters.exc;
                            break;
                        case '?':
                            frame = Characters.qst;
                            break;
                        case '=':
                            frame = Characters.equal;
                            break;
                        case '\'':
                            frame = Characters.quote;
                            break;
                        case '(':
                            frame = Characters.leftp;
                            break;
                        case ')':
                            frame = Characters.rightp;
                            break;
                        case '+':
                            frame = Characters.plus;
                            break;
                        case ',':
                            frame = Characters.comma;
                            break;
                        case '\/':
                            switch (this.sentence[i+1]) {
                                case 'u' :
                                    i++;
                                    frame = Characters.upgrade;
                                    break
                                case 'h' :
                                    i++;
                                    frame = Characters.armour;
                                    break;
                                case 'a' :
                                    i++;
                                    frame = Characters.ammo;
                                    break;
                                case 'f' :
                                    i++;
                                    frame = Characters.fuel;
                                    break;
                                case 'o' :
                                    i++;
                                    frame = Characters.o2;
                                    break;
                                case 's' :
                                    i++;
                                    frame = Characters.submarine;
                                    break;
                                default:
                                    frame = Characters.slash;
                                    break;
                            }
                            break;
                        default:
                            frame = Characters[this.sentence[i]];
                            break;
                    }

                    if (!childNode) {
                        entity.addChild(
                            this.character, {
                                frame: frame
                            }
                        );

                        childNode = entity.lastChildNode;
                    }

                    childNode.o.x = x;
                    childNode.o.y = y;

                    if (frame === null) {
                        childNode.o.sprite.isVisible = false;
                    } else {
                        childNode.o.sprite.isVisible = true;
                        childNode.o.sprite.frame = frame;
                    }

                    x += this.characterWidth;

                    childNode = childNode.next;

                    if (i === this.sentence.length && childNode) {
                        this.sentence += ' ';
                    }
                }

                while (childNode) {
                    childNode.o.x = x;
                    childNode.o.y = y;
                    childNode.o.sprite.isVisible = false;
                    childNode.o.sprite.frame = 0;

                    x += this.characterHeight;
                    childNode = childNode.next;
                }
            }
        );

    var createCharacter = function (args) {
        this.sprite.stop();
        this.sprite.frame = args.frame;
    };

    game.Entity.define('entity_characterDigit')
        .sprite('sprite_charactersDigit')
        .onCreate(createCharacter);

    game.Entity.define('entity_characterFont')
        .sprite('sprite_charactersFont')
        .onCreate(createCharacter);

    game.Entity.define('entity_sentence')
        .modules(['module_sentence'])
        .onCreate(
            function (args, screen) {
                this.x = args.x;
                this.y = args.y;
                this.id = args.id || Cassava.getId();
                this.module('module_sentence').sentence = args.sentence;
                this.module('module_sentence').character = args.character;
                this.module('module_sentence').characterWidth = args.characterWidth;
                this.module('module_sentence').characterHeight = args.characterHeight;
            }
        );
})()