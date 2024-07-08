import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxCodeInputComponent } from '@aposin/ng-aquila/code-input';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * @title Manipulating model example
 */
@Component({
    selector: 'code-input-model-example',
    templateUrl: 'code-input-model-example.html',
    styleUrls: ['code-input-model-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxCodeInputComponent,
        NgIf,
        NxErrorComponent,
        NxButtonComponent,
    ],
})
export class CodeInputModelExampleComponent implements OnInit, OnDestroy {
    inputValue = '';

    codeForm = new FormGroup({
        keyCode: new FormControl(this.inputValue, {
            validators: [Validators.required, Validators.minLength(4)],
            updateOn: 'change',
        }),
    });

    get keyCode() {
        return this.codeForm.get('keyCode');
    }

    private readonly _destroyed = new Subject<void>();

    ngOnInit(): void {
        this.keyCode?.valueChanges
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => {
                if (this.keyCode?.valid && this.keyCode.value !== '1234') {
                    this.codeForm.setValue({ keyCode: '1234' });
                }
            });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
