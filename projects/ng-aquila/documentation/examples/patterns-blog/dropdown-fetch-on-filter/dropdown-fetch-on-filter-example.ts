import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxSpinnerComponent } from '@allianz/ng-aquila/spinner';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
} from '@angular/core';
import { debounceTime, skip, switchMap } from 'rxjs';

/**
 * @title Dropdown HTTP Fetch on Filter Example
 */
@Component({
  selector: 'nx-dropdown-fetch-on-filter',
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxSpinnerComponent,
  ],
  templateUrl: './dropdown-fetch-on-filter-example.html',
  styleUrl: './dropdown-fetch-on-filter-example.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownFetchOnFilterComponent implements AfterViewInit {
  optionsBase = [
    'BMW',
    'Audi',
    'VW',
    'Mercedes',
    'Porsche',
    'Tesla',
    'Lada',
    'Opel',
    'Fiat',
    'Ford',
    'Kia',
    'Toyota',
    'Ferrari',
  ];
  options = signal<string[]>(this.optionsBase);
  fetchingOptions = signal<boolean>(false);
  dropdown = viewChild.required<NxDropdownComponent>(NxDropdownComponent);

  constructor(private readonly http: HttpClient) {}

  ngAfterViewInit(): void {
    // just to show the spinner immedeataly for better UX
    this.dropdown()
      .filterChanges.pipe(skip(1))
      .subscribe(() => {
        this.fetchingOptions.set(true);
      });

    // wait for debounce and fetch results from RESTful API
    this.dropdown()
      .filterChanges.pipe(
        skip(1),
        debounceTime(250),
        switchMap((filterValue) =>
          this.http.get<string[]>('/dropdown-options', {
            params: new HttpParams().set('filter', filterValue),
            responseType: 'json',
          }),
        ),
      )
      .subscribe({
        next: (options) => {
          this.options.set(options);
          this.fetchingOptions.set(false);
        },
        error: () => {
          this.options.set([]);
          this.fetchingOptions.set(false);
        },
      });
  }
}
