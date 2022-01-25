import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContrainteComponent } from './add-contrainte.component';

describe('AddContrainteComponent', () => {
  let component: AddContrainteComponent;
  let fixture: ComponentFixture<AddContrainteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContrainteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContrainteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
