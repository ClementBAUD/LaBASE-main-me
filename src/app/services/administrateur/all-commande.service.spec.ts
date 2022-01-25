import { TestBed } from '@angular/core/testing';

import { AllCommandeService } from './all-commande.service';

describe('AllCommandeService', () => {
  let service: AllCommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
