import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxStatusIconComponent, NxStatusIconType } from './status-icon.component';

describe('StatusIconComponent', () => {
  let component: NxStatusIconComponent;
  let fixture: ComponentFixture<StatusIconTestComponent>;
  let testInstance: StatusIconTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StatusIconTestComponent],
    });
    fixture = TestBed.createComponent(StatusIconTestComponent);
    testInstance = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `<nx-status-icon [type]="status"></nx-status-icon>`,
  imports: [NxStatusIconComponent],
})
class StatusIconTestComponent {
  status: NxStatusIconType = 'info';
}
