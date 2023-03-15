import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccVerificationPubComponent } from './acc-verification-pub.component';

describe('AccVerificationPubComponent', () => {
  let component: AccVerificationPubComponent;
  let fixture: ComponentFixture<AccVerificationPubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccVerificationPubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccVerificationPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
