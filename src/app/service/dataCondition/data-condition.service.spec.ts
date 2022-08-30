import { TestBed } from '@angular/core/testing';

import { DataConditionService } from './data-condition.service';

describe('DataConditionService', () => {
  let service: DataConditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataConditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
