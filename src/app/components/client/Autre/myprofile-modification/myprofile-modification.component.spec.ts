import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileModificationComponent } from './myprofile-modification.component';

describe('MyprofileModificationComponent', () => {
  let component: MyprofileModificationComponent;
  let fixture: ComponentFixture<MyprofileModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyprofileModificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprofileModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
