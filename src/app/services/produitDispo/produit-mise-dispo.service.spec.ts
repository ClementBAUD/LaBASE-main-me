import { TestBed } from '@angular/core/testing';

import { ProduitMiseDispoService } from './produit-mise-dispo.service';

describe('ProduitMiseDispoService', () => {
  let service: ProduitMiseDispoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitMiseDispoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
