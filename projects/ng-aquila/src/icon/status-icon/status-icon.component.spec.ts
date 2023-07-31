import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxStatusIconComponent } from './status-icon.component';

describe('StatusIconComponent', () => {
    let component: NxStatusIconComponent;
    let fixture: ComponentFixture<NxStatusIconComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NxStatusIconComponent],
        });
        fixture = TestBed.createComponent(NxStatusIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
