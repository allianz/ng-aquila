import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainedListComponent } from './contained-list-example';

describe('ContainedList Pattern', () => {
  let component: ContainedListComponent;
  let fixture: ComponentFixture<ContainedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainedListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
