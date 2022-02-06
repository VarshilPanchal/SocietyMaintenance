import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaySummaryComponent } from './pay-summary.component';

describe('PaySummaryComponent', () => {
  let component: PaySummaryComponent;
  let fixture: ComponentFixture<PaySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaySummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
