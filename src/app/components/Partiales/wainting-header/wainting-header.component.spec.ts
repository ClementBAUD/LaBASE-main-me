import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaintingHeaderComponent } from './wainting-header.component';

describe('WaintingHeaderComponent', () => {
  let component: WaintingHeaderComponent;
  let fixture: ComponentFixture<WaintingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaintingHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaintingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
