import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeContrainteComponent } from './liste-contrainte.component';

describe('ListeContrainteComponent', () => {
  let component: ListeContrainteComponent;
  let fixture: ComponentFixture<ListeContrainteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeContrainteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeContrainteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
