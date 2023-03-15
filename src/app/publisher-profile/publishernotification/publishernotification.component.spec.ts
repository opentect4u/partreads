import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishernotificationComponent } from './publishernotification.component';

describe('PublishernotificationComponent', () => {
  let component: PublishernotificationComponent;
  let fixture: ComponentFixture<PublishernotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishernotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishernotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
