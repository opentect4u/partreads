import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherforgotpasswordComponent } from './publisherforgotpassword.component';

describe('PublisherforgotpasswordComponent', () => {
  let component: PublisherforgotpasswordComponent;
  let fixture: ComponentFixture<PublisherforgotpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublisherforgotpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherforgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
