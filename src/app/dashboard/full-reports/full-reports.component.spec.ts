import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullReportsComponent } from './full-reports.component';

describe('FullReportsComponent', () => {
  let component: FullReportsComponent;
  let fixture: ComponentFixture<FullReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
