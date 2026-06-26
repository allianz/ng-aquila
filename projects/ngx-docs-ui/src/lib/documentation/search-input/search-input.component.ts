import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxInputModule } from '@allianz/ng-aquila/input';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  OnInit,
  output,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'nxv-search',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxButtonModule, NxFormfieldModule, NxIconModule, NxInputModule, FormsModule],
})
export class NxvSearchInputComponent implements OnInit {
  /**
   * Enables mobile behavior: the clear button is always shown and, when pressed
   * while the input is empty, emits `close` instead of clearing.
   */
  readonly mobile = input(false, { transform: booleanAttribute });

  /** Emits when the user dismisses the search (clear pressed on empty input). */
  readonly close = output<void>();

  readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  searchTerm = '';
  searchTermChanged$ = new BehaviorSubject<string>('');

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  focusInput() {
    this.searchInput()?.nativeElement.focus();
  }

  ngOnInit() {
    this.searchTermChanged$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((term) => !!term),
      )
      .subscribe((term) => this.navigateToSearch(term as string));

    // this.route.snapshot.params?.id.subscribe((params: { term: any }) => {
    if (this.route.firstChild) {
      this.route.firstChild.params.pipe().subscribe((params) => {
        const term = params.term;
        if (term && term !== this.searchTermChanged$.getValue()) {
          this.searchTerm = term;
        }
      });
    }
  }

  onSearchKeyUp(event: any) {
    this.searchTermChanged$.next(event.target.value);

    // on ENTER key, send always to search
    if (event.code === 'Enter') {
      this.navigateToSearch(this.searchTermChanged$.getValue());
    }
  }

  navigateToSearch(term: string): void {
    this.router.navigate([`/my-viewer/search/${term}`]);
  }

  resetSearchInput(): void {
    // In mobile mode, pressing clear while the input is already empty means
    // "dismiss the expanded search" — let the host component handle it.
    if (this.mobile() && !this.searchTerm) {
      this.close.emit();
      return;
    }
    this.searchTermChanged$.next('');
    this.searchTerm = '';
  }
}
