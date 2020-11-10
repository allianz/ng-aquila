import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

/**
* @title Selectable cards dynamic example
*/
@Component({
  templateUrl: './selectable-card-dynamic-example.html'
})
export class SelectableCardDynamicExampleComponent {
  public myFormGroup: FormGroup;

  cardArray = new FormArray([
    new FormControl(false),
    new FormControl(false),
    new FormControl(false)]);

  constructor(private fb: FormBuilder) {
    this.myFormGroup = this.fb.group({
      'cards': this.cardArray
    });
  }

  public addNewCard() {
    this.cardArray.push(new FormControl(false));
  }

  public removeFirstCard() {
    this.cardArray.removeAt(0);
  }

  get cards(): FormArray {
    return this.myFormGroup.get('cards') as FormArray;
  }
}
