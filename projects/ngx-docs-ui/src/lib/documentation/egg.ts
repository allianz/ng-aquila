// thatmikeflynn.com/egg.js/
/*
Copyright (c) 2015 Mike Flynn
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */
export class Egg {
    eggs: any[] = [];
    hooks: any[] = [];
    kps: any[] = [];
    activeEgg = '';
    // for now we'll just ignore the shift key to allow capital letters
    ignoredKeys: any[] = [16];

    addCode(keys: any, fn: () => void, metadata: any) {
        this.eggs.push({ keys: this.__toCharCodes(keys), fn, metadata });
        return this;
    }

    addHook(fn: () => void) {
        this.hooks.push(fn);
        return this;
    }

    listen(): any {
        // Standards compliant only. Don't waste time on IE8.
        if (document.addEventListener !== void 0) {
            // @ts-expect-error
            document.addEventListener('keydown', this, false);
            // @ts-expect-error
            document.addEventListener('keyup', this, false);
        }

        return this;
    }

    handleEvent(e: { which: any; type: string; metaKey: any; ctrlKey: any; altKey: any; shiftKey: any; target: { tagName: any }; preventDefault(): void }) {
        let keyCode = e.which;
        const isLetter = keyCode >= 65 && keyCode <= 90;
        /*
      This prevents find as you type in Firefox.
      Only prevent default behavior for letters A-Z.
      I want keys like page up/down to still work.
    */
        if (e.type === 'keydown' && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
            const tag = e.target.tagName;

            if ((tag === 'HTML' || tag === 'BODY') && isLetter) {
                e.preventDefault();
                return;
            }
        }

        if (e.type === 'keyup' && this.eggs.length > 0) {
            // keydown defaults all letters to uppercase
            if (isLetter) {
                if (!e.shiftKey) {
                    // convert to lower case letter
                    keyCode += 32;
                }
            }

            // make sure that it's not an ignored key (shift for one)
            if (!this.ignoredKeys.includes(keyCode)) {
                this.kps.push(keyCode);
            }

            this.eggs.forEach((currentEgg, i) => {
                const foundEgg = this.kps.toString().includes(currentEgg.keys);

                if (foundEgg) {
                    // Reset keys; if more keypresses occur while the callback is executing, it could retrigger the match
                    this.kps = [];
                    // Set the activeEgg to this one
                    this.activeEgg = currentEgg;
                    // if callback is a function, call it
                    // @ts-expect-error
                    this.__execute(currentEgg.fn, this);
                    // Call the hooks
                    this.hooks.forEach(this.__execute, this);
                    this.activeEgg = '';
                }
            }, this);
        }
    }

    __execute(fn: any) {
        return typeof fn === 'function' && fn.call(this);
    }

    __toCharCodes(keys: string | (string | number)[]) {
        const special: { [key: string]: number } = {
            slash: 191,
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            enter: 13,
            space: 32,
            ctrl: 17,
            alt: 18,
            tab: 9,
            esc: 27,
        };

        if (typeof keys === 'string') {
            // make sure there isn't any whitespace
            keys = keys.split(',').map(key => key.trim());
        }

        const characterKeyCodes = keys.map(key => {
            // check if it's already a keycode
            if (key === parseInt(key.toString(), 10)) {
                return key;
            }
            key = key as string; // should not be a number after the previous if block

            // it's a letter, return the char code for it
            return special[key] ?? key.charCodeAt(0);
        });
        return characterKeyCodes.join(',');
    }
}
