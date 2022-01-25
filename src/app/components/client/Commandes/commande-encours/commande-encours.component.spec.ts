import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeEncoursComponent } from './commande-encours.component';

describe('CommandeEncoursComponent', () => {
  let component: CommandeEncoursComponent;
  let fixture: ComponentFixture<CommandeEncoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeEncoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeEncoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
