import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginToReadComponent } from './login-to-read.component';

describe('LoginToReadComponent', () => {
  let component: LoginToReadComponent;
  let fixture: ComponentFixture<LoginToReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginToReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginToReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
