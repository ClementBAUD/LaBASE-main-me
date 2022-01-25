import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandePasseComponent } from './commande-passe.component';

describe('CommandePasseComponent', () => {
  let component: CommandePasseComponent;
  let fixture: ComponentFixture<CommandePasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandePasseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandePasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
