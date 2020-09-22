import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export abstract class BaseDemoThemingService {

  abstract readonly unselectedClassNames: BehaviorSubject<string>;
  abstract readonly headerThemeAvailable: Subject<boolean>;

  abstract changeComparisonTableTheme(theme: string);
  abstract getCodeChanges(theme: string): string;
  abstract setUnselectedClassNames(value: string);
  abstract getThemeNames(): string[];
}
