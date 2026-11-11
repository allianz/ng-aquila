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

interface Decade {
  label: string;
  options: NxDropdownOption[];
}

/** Years from newest to oldest, grouped by decade. */
function createDecades(fromYear: number, toYear: number): Decade[] {
  const decades: Decade[] = [];
  for (let year = toYear; year >= fromYear; year--) {
    const label = `${Math.floor(year / 10) * 10}s`;
    if (decades.at(-1)?.label !== label) {
      decades.push({ label, options: [] });
    }
    decades.at(-1)!.options.push({ value: year, label: String(year) });
  }
  return decades;
}

/**
 * @title Dropdown with grouped options example
 */
@Component({
  selector: 'dropdown-group-options-example',
  templateUrl: './dropdown-group-options-example.html',
  styleUrls: ['./dropdown-group-options-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    FormsModule,
  ],
})
export class DropdownGroupOptionsExampleComponent {
  country = 'FR';

  year: number | null = null;

  /** Groups with the default keys `label` and `options`, so no selectors are needed. */
  decades = createDecades(1900, new Date().getFullYear());

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
