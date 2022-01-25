import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCommandeMagasinComponent } from './detail-commande-magasin.component';

describe('DetailCommandeMagasinComponent', () => {
  let component: DetailCommandeMagasinComponent;
  let fixture: ComponentFixture<DetailCommandeMagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCommandeMagasinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCommandeMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
