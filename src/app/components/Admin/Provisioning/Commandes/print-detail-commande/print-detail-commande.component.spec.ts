import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDetailCommandeComponent } from './print-detail-commande.component';

describe('PrintDetailCommandeComponent', () => {
  let component: PrintDetailCommandeComponent;
  let fixture: ComponentFixture<PrintDetailCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintDetailCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintDetailCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
