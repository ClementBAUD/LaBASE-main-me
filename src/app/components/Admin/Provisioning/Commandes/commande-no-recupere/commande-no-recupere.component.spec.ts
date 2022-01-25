import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeNoRecupereComponent } from './commande-no-recupere.component';

describe('CommandeNoRecupereComponent', () => {
  let component: CommandeNoRecupereComponent;
  let fixture: ComponentFixture<CommandeNoRecupereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeNoRecupereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeNoRecupereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
