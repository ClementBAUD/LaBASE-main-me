import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAllEtudiantsComponent } from './liste-all-etudiants.component';

describe('ListeAllEtudiantsComponent', () => {
  let component: ListeAllEtudiantsComponent;
  let fixture: ComponentFixture<ListeAllEtudiantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAllEtudiantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAllEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
