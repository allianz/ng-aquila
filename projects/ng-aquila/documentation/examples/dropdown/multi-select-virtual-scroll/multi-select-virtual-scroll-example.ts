import { NxMultiSelectComponent } from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Car {
  id: number;
  name: string;
}

/**
 * @title Multi select with virtual scroll example
 */
@Component({
  selector: 'multi-select-virtual-scroll-example',
  templateUrl: './multi-select-virtual-scroll-example.html',
  styleUrls: ['./multi-select-virtual-scroll-example.css'],
  imports: [NxFormfieldComponent, NxMultiSelectComponent, FormsModule],
})
export class MultiSelectVirtualScrollExampleComponent {
  readonly options: Car[] = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Car ${i + 1}`,
  }));

  model: number[] = [];
}
