import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveMaintainenceComponent } from './receive-maintainence.component';

describe('ReceiveMaintainenceComponent', () => {
  let component: ReceiveMaintainenceComponent;
  let fixture: ComponentFixture<ReceiveMaintainenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveMaintainenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveMaintainenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
