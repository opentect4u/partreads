import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionMgmtComponent } from './commission-mgmt.component';

describe('CommissionMgmtComponent', () => {
  let component: CommissionMgmtComponent;
  let fixture: ComponentFixture<CommissionMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionMgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
