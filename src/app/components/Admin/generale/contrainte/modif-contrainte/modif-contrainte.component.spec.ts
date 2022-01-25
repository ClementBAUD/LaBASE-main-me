import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifContrainteComponent } from './modif-contrainte.component';

describe('ModifContrainteComponent', () => {
  let component: ModifContrainteComponent;
  let fixture: ComponentFixture<ModifContrainteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifContrainteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifContrainteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
