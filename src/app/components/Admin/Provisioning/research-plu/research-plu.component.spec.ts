import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchPluComponent } from './research-plu.component';

describe('ResearchPluComponent', () => {
  let component: ResearchPluComponent;
  let fixture: ComponentFixture<ResearchPluComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchPluComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchPluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
