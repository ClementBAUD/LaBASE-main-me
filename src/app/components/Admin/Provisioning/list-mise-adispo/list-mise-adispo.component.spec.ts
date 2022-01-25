import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMiseADispoComponent } from './list-mise-adispo.component';

describe('ListMiseADispoComponent', () => {
  let component: ListMiseADispoComponent;
  let fixture: ComponentFixture<ListMiseADispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMiseADispoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMiseADispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
