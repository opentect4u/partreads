import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserheaderafterloginComponent } from './userheaderafterlogin.component';

describe('UserheaderafterloginComponent', () => {
  let component: UserheaderafterloginComponent;
  let fixture: ComponentFixture<UserheaderafterloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserheaderafterloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserheaderafterloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
