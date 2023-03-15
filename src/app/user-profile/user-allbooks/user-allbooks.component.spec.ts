import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAllbooksComponent } from './user-allbooks.component';

describe('UserAllbooksComponent', () => {
  let component: UserAllbooksComponent;
  let fixture: ComponentFixture<UserAllbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAllbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAllbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
