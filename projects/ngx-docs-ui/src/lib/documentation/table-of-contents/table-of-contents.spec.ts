import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { NxvTableOfContentsModule } from './table-of-contents.module';

describe('NxvTableOfContentsComponent', () => {
    let fixture: ComponentFixture<TableOfContentsTest>;

    function getLinks() {
        return fixture.nativeElement.querySelector('nxv-table-of-contents').querySelectorAll('a');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxvTableOfContentsModule, BrowserAnimationsModule, RouterTestingModule],
            declarations: [TableOfContentsTest],
        }).compileComponents();
    }));

    it('should only show known selectors', fakeAsync(() => {
        fixture = TestBed.createComponent(TableOfContentsTest);
        fixture.detectChanges();
        tick();
        const links = getLinks();
        expect(links).toHaveSize(8);
        expect(links[0].textContent.trim()).toBe('Markdown parent');
        expect(links[1].textContent.trim()).toBe('Markdown child');
        expect(links[2].textContent.trim()).toBe('Api parent');
        expect(links[3].textContent.trim()).toBe('Api child');
        expect(links[4].textContent.trim()).toBe('Public parent');
        expect(links[5].textContent.trim()).toBe('Public child');
        expect(links[6].textContent.trim()).toBe('Private parent');
        expect(links[7].textContent.trim()).toBe('Private child');
    }));

    it('should set the level', fakeAsync(() => {
        fixture = TestBed.createComponent(TableOfContentsTest);
        fixture.detectChanges();
        tick();
        const links = getLinks();
        expect(links[0]).toHaveClass('docs-level-h3');
        expect(links[1]).toHaveClass('docs-level-h4');
    }));

    it('should filter elements in docs-public parent', fakeAsync(() => {
        fixture = TestBed.createComponent(TableOfContentsTest);
        fixture.detectChanges();
        tick();
        const links = getLinks();
        expect(links[4]).toHaveClass('docs-public');
        expect(links[4]).not.toHaveClass('docs-private');
        expect(links[5]).toHaveClass('docs-public');
        expect(links[5]).not.toHaveClass('docs-private');
    }));

    it('should filter elements in docs-private parent', fakeAsync(() => {
        fixture = TestBed.createComponent(TableOfContentsTest);
        fixture.detectChanges();
        tick();
        const links = getLinks();
        expect(links[6]).toHaveClass('docs-private');
        expect(links[6]).not.toHaveClass('docs-public');
        expect(links[7]).toHaveClass('docs-private');
        expect(links[7]).not.toHaveClass('docs-public');
    }));
});

@Component({
    template: `
        <div class="test-content">
            <h3 class="docs-markdown--h3">Markdown parent</h3>
            <h4 class="docs-markdown--h4">Markdown child</h4>
            <h3 class="docs-api-h3">Api parent</h3>
            <h4 class="docs-api-h4">Api child</h4>
            <h3 class="not-supported">Not supported</h3>
            <div class="docs-public">
                <h3 class="docs-markdown--h3">Public parent</h3>
                <h4 class="docs-markdown--h4">Public child</h4>
            </div>
            <div class="docs-private">
                <h3 class="docs-markdown--h3">Private parent</h3>
                <h4 class="docs-markdown--h4">Private child</h4>
            </div>
        </div>
        <nxv-table-of-contents container="test-content"> </nxv-table-of-contents>
    `,
})
class TableOfContentsTest {}
