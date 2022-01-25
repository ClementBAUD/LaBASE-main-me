import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProduitCategorieComponent } from './liste-produit-categorie.component';

describe('ListeProduitCategorieComponent', () => {
  let component: ListeProduitCategorieComponent;
  let fixture: ComponentFixture<ListeProduitCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeProduitCategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeProduitCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
