import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorfolioServiceComponent } from './porfolio-service.component';

describe('PorfolioServiceComponent', () => {
  let component: PorfolioServiceComponent;
  let fixture: ComponentFixture<PorfolioServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorfolioServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorfolioServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
