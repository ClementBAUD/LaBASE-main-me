import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagasinInfoComponent } from './magasin-info.component';

describe('MagasinInfoComponent', () => {
  let component: MagasinInfoComponent;
  let fixture: ComponentFixture<MagasinInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagasinInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagasinInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
