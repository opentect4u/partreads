import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherCommissionComponent } from './publisher-commission.component';

describe('PublisherCommissionComponent', () => {
  let component: PublisherCommissionComponent;
  let fixture: ComponentFixture<PublisherCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublisherCommissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
