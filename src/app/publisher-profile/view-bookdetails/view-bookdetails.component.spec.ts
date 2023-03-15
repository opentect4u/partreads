import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookdetailsComponent } from './view-bookdetails.component';

describe('ViewBookdetailsComponent', () => {
  let component: ViewBookdetailsComponent;
  let fixture: ComponentFixture<ViewBookdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBookdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBookdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
