import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorfolioDescriptionComponent } from './porfolio-description.component';

describe('PorfolioDescriptionComponent', () => {
  let component: PorfolioDescriptionComponent;
  let fixture: ComponentFixture<PorfolioDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorfolioDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorfolioDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
