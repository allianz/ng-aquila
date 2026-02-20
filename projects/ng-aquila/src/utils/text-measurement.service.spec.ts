import { TestBed } from '@angular/core/testing';

import { TextMeasurementService } from './text-measurement.service';

describe('TextMeasurementService', () => {
  let service: TextMeasurementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextMeasurementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('computeInputWidth', () => {
    it('should return width based on placeholder when value is null', () => {
      const width = service.computeInputWidth(null, 'hh', 2);
      expect(width).toMatch(/^\d+px$/);
    });

    it('should return width based on placeholder when value is empty', () => {
      const width = service.computeInputWidth('', 'hh', 2);
      expect(width).toMatch(/^\d+px$/);
    });

    it('should return width based on value when at max length', () => {
      const width = service.computeInputWidth('12', 'hh', 2);
      expect(width).toMatch(/^\d+px$/);
    });

    it('should return width for partial values', () => {
      const width = service.computeInputWidth('1', 'hh', 2);
      expect(width).toMatch(/^\d+px$/);
    });
  });
});
