import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export abstract class BaseDemoThemingService {

  abstract readonly unselectedClassNames: BehaviorSubject<string>;
  abstract readonly headerThemeAvailable: Subject<boolean>;

  abstract changeComparisonTableTheme(theme: string);
  abstract setUnselectedClassNames(value: string);
}
