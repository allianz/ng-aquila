import {
  NxDropdownComponent,
  NxDropdownOption,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CarOption {
  id: string;
  brand: string;
  icon: string;
}

/**
 * @title Custom item template example
 */
@Component({
  selector: 'dropdown-item-template-example',
  templateUrl: './dropdown-item-template-example.html',
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxIconComponent,
    FormsModule,
  ],
  styles: `
    .custom-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .custom-item nx-icon {
      font-size: 16px;
    }
  `,
})
export class DropdownItemTemplateExampleComponent {
  cars: NxDropdownOption[] = [
    { value: { id: '1', brand: 'BMW', icon: 'product-car' }, label: 'BMW' },
    { value: { id: '2', brand: 'Audi', icon: 'product-car' }, label: 'Audi' },
    { value: { id: '3', brand: 'Volvo', icon: 'product-car' }, label: 'Volvo' },
    { value: { id: '4', brand: 'Mini', icon: 'product-car' }, label: 'Mini' },
  ];

  selectedCar: CarOption | null = null;
}
