import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiseADispoComponent } from './mise-adispo.component';

describe('MiseADispoComponent', () => {
  let component: MiseADispoComponent;
  let fixture: ComponentFixture<MiseADispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiseADispoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiseADispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
