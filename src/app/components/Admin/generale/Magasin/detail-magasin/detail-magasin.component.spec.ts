import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMagasinComponent } from './detail-magasin.component';

describe('DetailMagasinComponent', () => {
  let component: DetailMagasinComponent;
  let fixture: ComponentFixture<DetailMagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMagasinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
