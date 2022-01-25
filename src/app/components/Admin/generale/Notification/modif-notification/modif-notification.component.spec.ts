import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifNotificationComponent } from './modif-notification.component';

describe('ModifNotificationComponent', () => {
  let component: ModifNotificationComponent;
  let fixture: ComponentFixture<ModifNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
