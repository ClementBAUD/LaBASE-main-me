import { TestBed } from '@angular/core/testing';

import { AutreService } from './autre.service';

describe('AutreService', () => {
  let service: AutreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
