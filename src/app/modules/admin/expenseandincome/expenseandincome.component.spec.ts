import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseandincomeComponent } from './expenseandincome.component';

describe('ExpenseandincomeComponent', () => {
  let component: ExpenseandincomeComponent;
  let fixture: ComponentFixture<ExpenseandincomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseandincomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseandincomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
