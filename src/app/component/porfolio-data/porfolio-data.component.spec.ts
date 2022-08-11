import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorfolioDataComponent } from './porfolio-data.component';

describe('PorfolioDataComponent', () => {
  let component: PorfolioDataComponent;
  let fixture: ComponentFixture<PorfolioDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorfolioDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorfolioDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
