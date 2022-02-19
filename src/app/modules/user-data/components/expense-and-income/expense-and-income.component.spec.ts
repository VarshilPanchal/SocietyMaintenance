import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseAndIncomeComponent } from './expense-and-income.component';

describe('ExpenseAndIncomeComponent', () => {
  let component: ExpenseAndIncomeComponent;
  let fixture: ComponentFixture<ExpenseAndIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseAndIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseAndIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
