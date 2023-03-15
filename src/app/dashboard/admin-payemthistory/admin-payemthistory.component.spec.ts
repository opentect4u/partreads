import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPayemthistoryComponent } from './admin-payemthistory.component';

describe('AdminPayemthistoryComponent', () => {
  let component: AdminPayemthistoryComponent;
  let fixture: ComponentFixture<AdminPayemthistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPayemthistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPayemthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
