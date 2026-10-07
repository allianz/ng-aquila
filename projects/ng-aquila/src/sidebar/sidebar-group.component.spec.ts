import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxSidebarComponent } from './sidebar.component';
import { NxSidebarModule } from './sidebar.module';

@Component({
  selector: 'test-sidebar-group',
  template: `
    <nx-sidebar>
      <nx-sidebar-group [label]="firstLabel">
        <button type="button">First item</button>
      </nx-sidebar-group>
      <nx-sidebar-group label="Second group">
        <button type="button">Second item</button>
      </nx-sidebar-group>
    </nx-sidebar>
  `,
  imports: [NxSidebarModule],
  changeDetection: ChangeDetectionStrategy.Eager,
})
class SidebarGroupTestComponent {
  @ViewChild(NxSidebarComponent) sidebar!: NxSidebarComponent;
  firstLabel: string | undefined = 'First group';
}

describe('NxSidebarGroupComponent', () => {
  let fixture: ComponentFixture<SidebarGroupTestComponent>;
  let groups: HTMLElement[];

  const header = (group: HTMLElement) =>
    group.querySelector<HTMLElement>('.nx-sidebar-group__header');
  const label = (group: HTMLElement) =>
    group.querySelector<HTMLElement>('.nx-sidebar-group__label');

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarGroupTestComponent);
    fixture.detectChanges();
    groups = Array.from(fixture.nativeElement.querySelectorAll('nx-sidebar-group'));
  });

  it('has the group role', () => {
    expect(groups[0].getAttribute('role')).toBe('group');
  });

  it('is labelled by its header', () => {
    const labelledBy = groups[0].getAttribute('aria-labelledby');

    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy!)?.textContent?.trim()).toBe('First group');
  });

  it('gives every group its own label id', () => {
    expect(groups[0].getAttribute('aria-labelledby')).not.toBe(
      groups[1].getAttribute('aria-labelledby'),
    );
  });

  it('renders no header and no aria-labelledby without a label', () => {
    fixture.componentInstance.firstLabel = undefined;
    fixture.detectChanges();

    expect(header(groups[0])).toBeNull();
    expect(groups[0].hasAttribute('aria-labelledby')).toBe(false);
  });

  describe('when the sidebar is collapsed', () => {
    beforeEach(() => {
      fixture.componentInstance.sidebar.close();
      fixture.detectChanges();
    });

    it('hides the label text but keeps it for aria-labelledby', () => {
      expect(getComputedStyle(label(groups[1])!).display).toBe('none');
      expect(document.getElementById(groups[1].getAttribute('aria-labelledby')!)).toBe(
        label(groups[1]),
      );
    });

    it('shows a divider line instead of the header', () => {
      expect(getComputedStyle(header(groups[1])!).borderTopStyle).toBe('solid');
    });

    it('hides the header of the first group', () => {
      expect(getComputedStyle(header(groups[0])!).display).toBe('none');
    });
  });
});
