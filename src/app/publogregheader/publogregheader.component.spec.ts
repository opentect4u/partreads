import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublogregheaderComponent } from './publogregheader.component';

describe('PublogregheaderComponent', () => {
  let component: PublogregheaderComponent;
  let fixture: ComponentFixture<PublogregheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublogregheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublogregheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
