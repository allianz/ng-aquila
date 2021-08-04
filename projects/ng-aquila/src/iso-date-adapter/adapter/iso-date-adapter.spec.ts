import { NxIsoDateModule } from './iso-date-adapter.module';
import { NxDateAdapter } from '@aposin/ng-aquila/datefield';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { NxIsoDateAdapter } from './iso-date-adapter';

import 'dayjs/locale/de';
dayjs.extend(localeData);

describe('NxIsoDateAdapter', () => {
  let adapter: NxIsoDateAdapter;
  let assertValidDate: (d: string | null, valid: boolean) => void;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxIsoDateModule]
    }).compileComponents();
  }));

  beforeEach(inject([NxDateAdapter], (dateAdapter: NxIsoDateAdapter) => {
    dayjs.locale('en');
    adapter = dateAdapter;
    adapter.setLocale('en');

    assertValidDate = (d: string | null, valid: boolean) => {
      expect(adapter.isDateInstance(d)).not.toBeNull();
      expect(adapter.isValid(d as string)).toBe(valid);
    };
  }));

  describe('Localization', () => {
    beforeEach(() => {
      adapter.setLocale('de');
      dayjs.locale('de');
    });

    it('should parse locale date with explicit format', () => {
      const date = adapter.parse('01.12.2020', 'MM.DD.YYYY', true);
      expect(date).toBe('2020-01-12');
    });

    it('should parse locale date with locale format (L)', () => {
      const isoDate = adapter.parse('03.01.2020', 'L', true);
      expect(isoDate).toMatch('2020-01-03');
    });

    it('should parse locale date with locale expanded format (LL)', () => {
      const isoDate = adapter.parse('24. September 2020', 'LL', true);
      expect(isoDate).toMatch('2020-09-24');
    });
  });

  describe('Localization with a different format between global day.js and the adapter', () => {
    beforeEach(() => {
      adapter.setLocale('de');
      dayjs.locale('en');
    });

    it('should parse locale date with locale format (L)', () => {
      const isoDate = adapter.parse('03.01.2020', 'L', true);
      expect(isoDate).toMatch('2020-01-03');
    });

    it('should parse locale date with locale expanded format (LL)', () => {
      const isoDate = adapter.parse('24. September 2020', 'LL', true);
      expect(isoDate).toMatch('2020-09-24');
    });
  });

  it('should get year', () => {
    expect(adapter.getYear('2017-01-01')).toBe(2017);
  });

  it('should get month', () => {
    expect(adapter.getMonth('2017-01-01')).toBe(0);
  });

  it('should get date', () => {
    expect(adapter.getDate('2017-01-01')).toBe(1);
  });

  it('should create valid dates from valid ISO strings', () => {
    assertValidDate(adapter.deserialize('1985-04-12T23:20:50.52Z'), true);
    assertValidDate(adapter.deserialize('1996-12-19T16:39:57-08:00'), true);
    assertValidDate(adapter.deserialize('1937-01-01T12:00:27.87+00:20'), true);
    assertValidDate(adapter.deserialize('1990-13-31T23:59:00Z'), false);
    expect(adapter.deserialize('')).toBeNull();
    expect(adapter.deserialize(null)).toBeNull();
    assertValidDate(adapter.deserialize(new Date()), true);
    assertValidDate(adapter.deserialize(new Date(NaN)), false);
    assertValidDate(adapter.deserialize('2017-01-01'), true);
  });

  it('setLocale should not modify global moment locale', () => {
    expect(dayjs.locale()).toBe('en');
    adapter.setLocale('de');
    expect(dayjs.locale()).toBe('en');
  });

  it('should create invalid date', () => {
    assertValidDate(adapter.invalid(), false);
  });

  it('should parse invalid value as invalid', () => {
    const d = adapter.parse('hello', 'MM/DD/YYYY', false);
    expect(d).not.toBeNull();
    expect(adapter.isDateInstance(d)).toBe(true);
    expect(adapter.isValid(d)).toBe(false);
  });

  it('should allow non-strict parsing', () => {
    expect(adapter.parse('20190101', 'YYYY-MM-DD', false)).toBe('2019-01-01');
    expect(adapter.parse('20190101', ['YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-M-D'], false)).toBe('2019-01-01');
    expect(adapter.parse('2019011', ['YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-M-D'], false)).toBe('2019-01-01');
    expect(adapter.parse('201911', ['YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-M'], false)).toBe('2019-11-01');
    expect(adapter.parse('20191', ['YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-M'], false)).toBe('2019-01-01');
    expect(adapter.parse('201911', ['YYYY-M'], false)).toBe('2019-11-01');
    expect(adapter.parse('2019-11', ['YYYYM'], false)).toBe('2019-11-01');
    expect(adapter.parse('04.03.2019', ['DD.MM.YYYY', 'M-YYYY'], false)).toBe('2019-03-04');
    expect(adapter.parse('02032019', ['DD.MM.YYYY', 'M-YYYY'], false)).toBe('2019-03-02');
    expect(adapter.parse('102019', ['DD.MM.YYYY', 'M-YYYY'], false)).toBe('2019-10-01');
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
    expect(adapter.format('2017-01-02', 'MM/DD/YYYY')).toEqual('01/02/2017');
    expect(adapter.format('2017-01-02', 'DD/MM/YYYY')).toEqual('02/01/2017');
  });
});
