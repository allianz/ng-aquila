import { ChangeDetectionStrategy, Component } from '@angular/core';
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

  it('should apply the type class on the host', () => {
    expect(fixture.nativeElement.querySelector('.nx-status-icon--info')).toBeTruthy();
  });

  it('should apply the contained class when contained is set', () => {
    testInstance.contained = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.nx-status-icon--contained')).toBeTruthy();
  });

  it('should apply the inverse class when inverse is set', () => {
    testInstance.inverse = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.nx-status-icon--inverse')).toBeTruthy();
  });
});

@Component({
  selector: 'test-status-icon-test-component',
  template: `<nx-status-icon
    [type]="status"
    [contained]="contained"
    [inverse]="inverse"
  ></nx-status-icon>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxStatusIconComponent],
})
class StatusIconTestComponent {
  status: NxStatusIconType = 'info';
  contained = false;
  inverse = false;
}
