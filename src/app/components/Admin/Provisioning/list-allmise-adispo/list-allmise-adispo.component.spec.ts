import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllmiseADispoComponent } from './list-allmise-adispo.component';

describe('ListAllmiseADispoComponent', () => {
  let component: ListAllmiseADispoComponent;
  let fixture: ComponentFixture<ListAllmiseADispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllmiseADispoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllmiseADispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
