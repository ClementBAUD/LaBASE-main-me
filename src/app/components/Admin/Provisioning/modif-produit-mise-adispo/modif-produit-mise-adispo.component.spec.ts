import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifProduitMiseADispoComponent } from './modif-produit-mise-adispo.component';

describe('ModifProduitMiseADispoComponent', () => {
  let component: ModifProduitMiseADispoComponent;
  let fixture: ComponentFixture<ModifProduitMiseADispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifProduitMiseADispoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifProduitMiseADispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
