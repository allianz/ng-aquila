import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BaseDemoThemingService } from '@aposin/ngx-docs-ui';

@Injectable()
export class DemoThemingService extends BaseDemoThemingService {

  readonly unselectedClassNames = new BehaviorSubject<string>('secondary small');
  readonly headerThemeAvailable = new Subject<boolean>();

  changeComparisonTableTheme(theme: string) {}
  setUnselectedClassNames(value: string) {}
}
