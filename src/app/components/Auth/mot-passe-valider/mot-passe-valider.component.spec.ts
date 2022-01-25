import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotPasseValiderComponent } from './mot-passe-valider.component';

describe('MotPasseValiderComponent', () => {
  let component: MotPasseValiderComponent;
  let fixture: ComponentFixture<MotPasseValiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotPasseValiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotPasseValiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
