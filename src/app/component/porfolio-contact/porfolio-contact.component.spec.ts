import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorfolioContactComponent } from './porfolio-contact.component';

describe('PorfolioContactComponent', () => {
  let component: PorfolioContactComponent;
  let fixture: ComponentFixture<PorfolioContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorfolioContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorfolioContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
