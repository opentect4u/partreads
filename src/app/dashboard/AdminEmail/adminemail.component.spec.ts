import { ComponentFixture, TestBed } from '@angular/core/testing';

import { adminemailComponent } from './adminemail.component';

describe('adminemailComponent', () => {
  let component: adminemailComponent;
  let fixture: ComponentFixture<adminemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ adminemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(adminemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
