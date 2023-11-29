import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { NxDateAdapter } from '@aposin/ng-aquila/datefield';
import moment from 'moment';

import { NxMomentDateModule } from './index';
import { NxMomentDateAdapter } from './moment-date-adapter';

const JAN = 0,
    FEB = 1,
    MAR = 2,
    APR = 3,
    MAY = 4,
    JUN = 5,
    JUL = 6,
    AUG = 7,
    SEP = 8,
    OCT = 9,
    NOV = 10,
    DEC = 11;

describe('NxMomentDateAdapter', () => {
    let adapter: NxMomentDateAdapter;

    function assertValidDate(date: moment.Moment | null, valid: boolean): void {
        expect(adapter.isDateInstance(date)).withContext(`Expected ${date} to be a date instance`).not.toBeNull();
        expect(adapter.isValid(date as moment.Moment))
            .withContext(`Expected ${date} to be ${valid ? 'valid' : 'invalid'}, but was ${valid ? 'invalid' : 'valid'}`)
            .toBe(valid);
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxMomentDateModule],
        }).compileComponents();
    }));

    beforeEach(inject([NxDateAdapter], (dateAdapter: NxMomentDateAdapter) => {
        moment.locale('en');
        adapter = dateAdapter;
        adapter.setLocale('en');
    }));

    it('should get year', () => {
        expect(adapter.getYear(moment([2017, JAN, 1]))).toBe(2017);
    });

    it('should get month', () => {
        expect(adapter.getMonth(moment([2017, JAN, 1]))).toBe(0);
    });

    it('should get date', () => {
        expect(adapter.getDate(moment([2017, JAN, 1]))).toBe(1);
    });

    it('should create valid dates from valid ISO strings', () => {
        assertValidDate(adapter.deserialize('1985-04-12T23:20:50.52Z'), true);
        assertValidDate(adapter.deserialize('1996-12-19T16:39:57-08:00'), true);
        assertValidDate(adapter.deserialize('1937-01-01T12:00:27.87+00:20'), true);
        assertValidDate(adapter.deserialize('1990-13-31T23:59:00Z'), false);
        assertValidDate(adapter.deserialize('1/1/2017'), false);
        expect(adapter.deserialize('')).toBeNull();
        expect(adapter.deserialize(null)).toBeNull();
        assertValidDate(adapter.deserialize(new Date()), true);
        assertValidDate(adapter.deserialize(new Date(NaN)), false);
        assertValidDate(adapter.deserialize(moment()), true);
        assertValidDate(adapter.deserialize(moment.invalid()), false);
    });

    it('setLocale should not modify global moment locale', () => {
        expect(moment.locale()).toBe('en');
        adapter.setLocale('ja-JP');
        expect(moment.locale()).toBe('en');
    });

    it('should create invalid date', () => {
        assertValidDate(adapter.invalid(), false);
    });

    it('should parse invalid value as invalid', () => {
        const d = adapter.parse('hello', 'MM/DD/YYYY', false);
        expect(d).not.toBeNull();
        expect(adapter.isDateInstance(d)).withContext('Expected string to have been fed through Date.parse').toBeTrue();
        expect(adapter.isValid(d as moment.Moment))
            .withContext('Expected to parse as "invalid date" object')
            .toBeFalse();
    });

    it('should allow strict parsing', () => {
        // year is mismatching
        assertValidDate(adapter.parse('03/01/18', 'MM/DD/YYYY', true), false);

        // month is missing second digit
        assertValidDate(adapter.parse('3/01/2018', 'MM/DD/YYYY', true), false);

        // month & day is missing second digit
        assertValidDate(adapter.parse('3/1/2018', 'MM/DD/YYYY', true), false);

        // month & day is missing second digit, year is missing two digits
        assertValidDate(adapter.parse('3/1/18', 'MM/DD/YYYY', true), false);

        // that's fine
        assertValidDate(adapter.parse('03/01/2018', 'MM/DD/YYYY', true), true);

        // wrong separator
        assertValidDate(adapter.parse('03/01/2018', 'MM-DD-YYYY', true), false);
        assertValidDate(adapter.parse('03-01-2018', 'MM-DD-YYYY', true), true);
    });

    it('should allow strict parsing with multiple patterns', () => {
        // allow slash and dash in strict mode
        assertValidDate(adapter.parse('03/01/2018', ['MM/DD/YYYY', 'MM-DD-YYYY'], true), true);
        assertValidDate(adapter.parse('03-01-2018', ['MM/DD/YYYY', 'MM-DD-YYYY'], true), true);
        assertValidDate(adapter.parse('03 01 2018', ['MM/DD/YYYY', 'MM-DD-YYYY'], true), false);
    });

    it('should format date according to given format', () => {
        expect(adapter.format(moment([2017, JAN, 2]), 'MM/DD/YYYY')).toBe('01/02/2017');
        expect(adapter.format(moment([2017, JAN, 2]), 'DD/MM/YYYY')).toBe('02/01/2017');
    });
});
