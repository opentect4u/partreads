import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubReportsComponent } from './pub-reports.component';

describe('PubReportsComponent', () => {
  let component: PubReportsComponent;
  let fixture: ComponentFixture<PubReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
