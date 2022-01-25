import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMagComponent } from './change-mag.component';

describe('ChangeMagComponent', () => {
  let component: ChangeMagComponent;
  let fixture: ComponentFixture<ChangeMagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
