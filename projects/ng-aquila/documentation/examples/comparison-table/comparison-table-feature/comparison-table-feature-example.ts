import { NxCheckboxComponent } from '@allianz/ng-aquila/checkbox';
import {
  NxComparisonTableFeature,
  NxComparisonTableFeatureLayout,
  NxComparisonTableFeatureType,
} from '@allianz/ng-aquila/comparison-table';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

/** @title Feature cell content */
@Component({
  selector: 'comparison-table-feature-example',
  templateUrl: './comparison-table-feature-example.html',
  styleUrls: ['./comparison-table-feature-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxComparisonTableFeature,
    NxCheckboxComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxFormfieldComponent,
    NxInputDirective,
  ],
})
export class ComparisonTableFeatureExampleComponent {
  readonly typeOptions: {
    value: NxComparisonTableFeatureType | 'none';
    label: string;
  }[] = [
    { value: 'check', label: 'check' },
    { value: 'minus', label: 'minus' },
    { value: 'cross', label: 'cross' },
    { value: 'none', label: 'none (text only)' },
  ];
  readonly layoutOptions: NxComparisonTableFeatureLayout[] = [
    'horizontal',
    'vertical',
  ];
  readonly widthOptions = [96, 160, 320];

  readonly type = signal<NxComparisonTableFeatureType | 'none'>('check');
  readonly featureType = computed(() => {
    const type = this.type();
    return type === 'none' ? null : type;
  });
  readonly contained = signal(true);
  readonly layout = signal<NxComparisonTableFeatureLayout>('horizontal');
  readonly text = signal('Up to 10,000 km per year');
  readonly width = signal(160);

  setText(event: Event): void {
    this.text.set((event.target as HTMLInputElement).value);
  }
}
