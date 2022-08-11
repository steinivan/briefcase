import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorfolioProyectsComponent } from './porfolio-proyects.component';

describe('PorfolioProyectsComponent', () => {
  let component: PorfolioProyectsComponent;
  let fixture: ComponentFixture<PorfolioProyectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorfolioProyectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorfolioProyectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
