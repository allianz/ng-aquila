import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RabbitHole {
    readonly showThemeEgg = new Subject<boolean>();
    private _showTheming = false;

    toggleTheming() {
        this._showTheming = !this._showTheming;
        this.showThemeEgg.next(this._showTheming);
    }
}
