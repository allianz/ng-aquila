import { FormControl, NgForm, Validators } from '@angular/forms';

import { ErrorStateMatcher } from './error-state-matcher';

describe('ErrorStateMatcher', () => {
    let matcher: ErrorStateMatcher;
    let control: FormControl;
    let form: NgForm;

    beforeEach(() => {
        matcher = new ErrorStateMatcher();
        control = new FormControl('', { validators: Validators.minLength(10) });
        form = new NgForm([], []);
    });

    it('should create an instance', () => {
        expect(matcher).toBeTruthy();
    });

    it('should return false on null control and null form', () => {
        const result = matcher.isErrorState(null, null);
        expect(result).toBeFalse();
    });

    it('should return false on null control and unsubmitted form', () => {
        const result = matcher.isErrorState(null, form);
        expect(result).toBeFalse();
    });

    it('should return false on null control and submitted form', () => {
        form.onSubmit(null!); // set submitted
        const result = matcher.isErrorState(null, form);
        expect(result).toBeFalse();
    });

    it('should return false on valid untouched control and null form', () => {
        const result = matcher.isErrorState(control, null);
        expect(result).toBeFalse();
    });

    it('should return false on valid untouched control and unsubmitted form', () => {
        const result = matcher.isErrorState(control, form);
        expect(result).toBeFalse();
    });

    it('should return false on valid untouched control and submitted form', () => {
        form.onSubmit(null!); // set submitted
        const result = matcher.isErrorState(control, form);
        expect(result).toBeFalse();
    });

    it('should return false on invalid untouched control and null form', () => {
        control.setValue('too short'); // set error
        const result = matcher.isErrorState(control, null);
        expect(result).toBeFalse();
    });

    it('should return false on invalid untouched control and unsubmitted form', () => {
        control.setValue('too short'); // set error
        const result = matcher.isErrorState(control, form);
        expect(result).toBeFalse();
    });

    it('should return true on invalid untouched control and submitted form', () => {
        control.setValue('too short'); // set error
        form.onSubmit(null!); // set submitted
        const result = matcher.isErrorState(control, form);
        expect(result).toBeTrue();
    });

    it('should return false on valid touched control and null form', () => {
        control.markAsTouched(); // set touched
        const result = matcher.isErrorState(control, null);
        expect(result).toBeFalse();
    });

    it('should return false on valid touched control and unsubmitted form', () => {
        control.markAsTouched(); // set touched
        const result = matcher.isErrorState(control, form);
        expect(result).toBeFalse();
    });

    it('should return false on valid touched control and submitted form', () => {
        control.markAsTouched(); // set touched
        form.onSubmit(null!); // set submitted
        const result = matcher.isErrorState(control, form);
        expect(result).toBeFalse();
    });

    it('should return true on invalid touched control and null form', () => {
        control.setValue('too short'); // set error
        control.markAsTouched(); // set touched
        const result = matcher.isErrorState(control, null);
        expect(result).toBeTrue();
    });

    it('should return true on invalid touched control and unsubmitted form', () => {
        control.setValue('too short'); // set error
        control.markAsTouched(); // set touched
        const result = matcher.isErrorState(control, form);
        expect(result).toBeTrue();
    });

    it('should return true on invalid touched control and submitted form', () => {
        control.setValue('too short'); // set error
        control.markAsTouched(); // set touched
        form.onSubmit(null!); // set submitted
        const result = matcher.isErrorState(control, form);
        expect(result).toBeTrue();
    });
});
