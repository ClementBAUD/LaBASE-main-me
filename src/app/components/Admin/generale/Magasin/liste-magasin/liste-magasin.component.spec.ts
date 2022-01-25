import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMagasinComponent } from './liste-magasin.component';

describe('ListeMagasinComponent', () => {
  let component: ListeMagasinComponent;
  let fixture: ComponentFixture<ListeMagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeMagasinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
