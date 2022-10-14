import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorfolioLoginComponent } from './porfolio-login.component';

describe('PorfolioContactComponent', () => {
  let component: PorfolioLoginComponent;
  let fixture: ComponentFixture<PorfolioLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorfolioLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorfolioLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
