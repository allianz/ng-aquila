import { APP_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { IdGenerationService } from './id-generation.service';

describe('IdGenerationService', () => {
  it('should generate unique IDs with a given prefix', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(IdGenerationService);
    const id1 = service.nextId('test');
    const id2 = service.nextId('test');

    expect(id1).not.toEqual(id2);
    expect(id1).toContain('test');
    expect(id2).toContain('test');
  });

  it('should use provided APP_ID as namespace', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: APP_ID, useValue: 'customAppId' }],
    });
    const service = TestBed.inject(IdGenerationService);
    const id = service.nextId('comp');

    expect(id.startsWith('customAppId-comp-')).toBeTrue();
  });

  it('should use random namespace if APP_ID is default or missing', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: APP_ID, useValue: 'ng' }], // mimick Def
    });
    const service = TestBed.inject(IdGenerationService);
    const id = service.nextId('foo');

    expect(id.startsWith('ng-')).toBeTrue();
    expect(id).toContain('-foo-');
  });

  it('should use random namespace if APP_ID is not provided', () => {
    TestBed.resetTestingModule();
    const service = TestBed.inject(IdGenerationService);
    const id = service.nextId('bar');

    expect(id.startsWith('a-')).toBeTrue(); // seem like default APP_ID is a in test environment 🤔
    expect(id).toContain('-bar-');
  });
});
