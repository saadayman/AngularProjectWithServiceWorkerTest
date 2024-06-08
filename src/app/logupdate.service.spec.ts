import { TestBed } from '@angular/core/testing';

import { LogupdateService } from './logupdate.service';

describe('LogupdateService', () => {
  let service: LogupdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogupdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
