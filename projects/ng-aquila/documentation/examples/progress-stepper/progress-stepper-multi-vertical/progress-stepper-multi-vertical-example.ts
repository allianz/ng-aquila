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
    animalType: string;
    name?: string;
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

    value?: Animal;

    readonly animalTypes = ['cat', 'dog'];

    readonly dogBreeds = [
        'German Shepherd',
        'Bulldog',
        'Labrador Retriever',
        'Beagle',
        'Golden Retriever',
    ];

    readonly catBreeds = [
        'Maine Coon',
        'Persian Cat',
        'Siamese Cat',
        'Ragdoll',
        'British Shorthair',
    ];

    readonly animalTypeForm = {
        label: 'Species',
        form: this.fb.group({
            animalType: ['', Validators.required],
        }),
    };

    readonly breedForm = {
        label: 'Breed',
        form: this.fb.group({}),
    };

    readonly ageForm = {
        label: 'Age',
        form: this.fb.group({
            age: ['', Validators.required],
        }),
    };

    readonly nameForm = {
        label: 'Name',
        form: this.fb.group({
            name: ['', Validators.required],
        }),
    };

    private readonly _destroyed = new Subject<void>();

    constructor(private readonly fb: FormBuilder) {
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
            animalType: { ...this.animalTypeForm.form.value } as string,
            age: { ...this.ageForm.form.value } as number,
            dogBreed: { ...this.breedForm.form.value } as string,
            catBreed: { ...this.nameForm.form.value } as string,
        };

        this.stepper.steps.last.interacted = true;
    }

    reset() {
        this.stepper.reset();
        this.value = undefined;
    }
}
