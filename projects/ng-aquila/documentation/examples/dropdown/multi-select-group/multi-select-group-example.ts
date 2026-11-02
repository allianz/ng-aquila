import { NxMultiSelectComponent } from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Country {
  code: string;
  name: string;
}

interface Continent {
  name: string;
  countries: Country[];
}

/**
 * @title Multi select with groups example
 */
@Component({
  selector: 'multi-select-group-example',
  templateUrl: './multi-select-group-example.html',
  styleUrls: ['./multi-select-group-example.css'],
  imports: [NxFormfieldComponent, NxMultiSelectComponent, FormsModule],
})
export class MultiSelectGroupExampleComponent {
  model: string[] = ['FR'];

  continents: Continent[] = [
    {
      name: 'Europe',
      countries: [
        { code: 'DE', name: 'Germany' },
        { code: 'FR', name: 'France' },
        { code: 'IT', name: 'Italy' },
        { code: 'ES', name: 'Spain' },
      ],
    },
    {
      name: 'Asia',
      countries: [
        { code: 'JP', name: 'Japan' },
        { code: 'IN', name: 'India' },
        { code: 'TH', name: 'Thailand' },
      ],
    },
    {
      name: 'South America',
      countries: [
        { code: 'BR', name: 'Brazil' },
        { code: 'AR', name: 'Argentina' },
        { code: 'CL', name: 'Chile' },
      ],
    },
  ];
}
