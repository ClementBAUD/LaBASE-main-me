import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeNonRecupereComponent } from './commande-non-recupere.component';

describe('CommandeNonRecupereComponent', () => {
  let component: CommandeNonRecupereComponent;
  let fixture: ComponentFixture<CommandeNonRecupereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeNonRecupereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeNonRecupereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
