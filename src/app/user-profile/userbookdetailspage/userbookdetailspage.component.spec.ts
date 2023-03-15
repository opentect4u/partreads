import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbookdetailspageComponent } from './userbookdetailspage.component';

describe('UserbookdetailspageComponent', () => {
  let component: UserbookdetailspageComponent;
  let fixture: ComponentFixture<UserbookdetailspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserbookdetailspageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserbookdetailspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
