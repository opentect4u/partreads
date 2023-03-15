import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdnminnotificationComponent } from './adnminnotification.component';

describe('AdnminnotificationComponent', () => {
  let component: AdnminnotificationComponent;
  let fixture: ComponentFixture<AdnminnotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdnminnotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdnminnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
