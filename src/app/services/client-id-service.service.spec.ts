import { TestBed } from '@angular/core/testing';

import { ClientIdServiceService } from './client-id-service.service';

describe('ClientIdServiceService', () => {
  let service: ClientIdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientIdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
