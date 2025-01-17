import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
    selector: 'nxv-search',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
    imports: [NxFormfieldModule, NxInputModule, FormsModule],
})
export class NxvSearchInputComponent implements OnInit {
    searchTerm = '';
    searchTermChanged$ = new BehaviorSubject<string>('');

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.searchTermChanged$
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                filter(term => !!term),
            )
            .subscribe(term => this.navigateToSearch(term as string));

        // this.route.snapshot.params?.id.subscribe((params: { term: any }) => {
        if (this.route.firstChild) {
            this.route.firstChild.params.pipe().subscribe(params => {
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
        this.searchTermChanged$.next('');
        this.searchTerm = '';
    }
}
