import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMagasinComponent } from './update-magasin.component';

describe('UpdateMagasinComponent', () => {
  let component: UpdateMagasinComponent;
  let fixture: ComponentFixture<UpdateMagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMagasinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
