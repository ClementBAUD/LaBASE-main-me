import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandePasserComponent } from './commande-passer.component';

describe('CommandePasserComponent', () => {
  let component: CommandePasserComponent;
  let fixture: ComponentFixture<CommandePasserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandePasserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandePasserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
