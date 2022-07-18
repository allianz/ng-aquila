import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
    NxMultiStepperComponent,
    NxMultiStepperDirection,
    NxProgressStepperDirective,
} from '@aposin/ng-aquila/progress-stepper';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Animal {
    type: 'dog' | 'cat';
    name: string;
    dogBreed?: string;
    catBreed?: string;
    age: number;
}

/**
 * @title Progress Indicator Multi Vertical Example
 */
@Component({
    selector: 'progress-stepper-multi-vertical-example',
    templateUrl: './progress-stepper-multi-vertical-example.html',
    styleUrls: ['./progress-stepper-multi-vertical-example.css'],
    host: {
        '[class.is-vertical]': 'direction === "vertical"',
    },
})
export class ProgressStepperMultiVerticalExampleComponent implements OnDestroy {
    @ViewChild(NxProgressStepperDirective, { static: true })
    stepper!: NxMultiStepperComponent;

    direction: NxMultiStepperDirection = 'vertical';

    value: Animal | undefined;

    animalTypes = ['cat', 'dog'];

    dogBreeds = [
        'German Shepherd',
        'Bulldog',
        'Labrador Retriever',
        'Beagle',
        'Golden Retriever',
    ];

    catBreeds = [
        'Maine Coon',
        'Persian Cat',
        'Siamese Cat',
        'Ragdoll',
        'British Shorthair',
    ];

    animalTypeForm = {
        label: 'Species',
        form: this._formBuilder.group({
            animalType: ['', Validators.required],
        }),
    };

    breedForm = {
        label: 'Breed',
        form: this._formBuilder.group({}),
    };

    ageForm = {
        label: 'Age',
        form: this._formBuilder.group({
            age: ['', Validators.required],
        }),
    };

    nameForm = {
        label: 'Name',
        form: this._formBuilder.group({
            name: ['', Validators.required],
        }),
    };

    private readonly _destroyed = new Subject<void>();

    constructor(private _formBuilder: FormBuilder) {
        this.animalTypeForm.form
            .get('animalType')
            ?.valueChanges.pipe(takeUntil(this._destroyed))
            .subscribe(value => {
                if (value === 'dog') {
                    this.breedForm.form.removeControl('catBreed');
                    this.breedForm.form.addControl(
                        'dogBreed',
                        new FormControl('', Validators.required),
                    );
                } else if (value === 'cat') {
                    this.breedForm.form.removeControl('dogBreed');
                    this.breedForm.form.addControl(
                        'catBreed',
                        new FormControl('', Validators.required),
                    );
                }

                this.breedForm.form.reset();
            });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    onSubmit() {
        this.value = {
            ...this.animalTypeForm.form.value,
            ...this.ageForm.form.value,
            ...this.breedForm.form.value,
            ...this.nameForm.form.value,
        };

        this.stepper.steps.last.interacted = true;
    }

    reset() {
        this.stepper.reset();
        this.value = undefined;
    }
}
