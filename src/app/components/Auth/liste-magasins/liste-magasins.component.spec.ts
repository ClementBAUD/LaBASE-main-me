import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMagasinsComponent } from './liste-magasins.component';

describe('ListeMagasinsComponent', () => {
  let component: ListeMagasinsComponent;
  let fixture: ComponentFixture<ListeMagasinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeMagasinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeMagasinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
