import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsAddComponent } from './admins-add.component';

describe('AdminsAddComponent', () => {
  let component: AdminsAddComponent;
  let fixture: ComponentFixture<AdminsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
