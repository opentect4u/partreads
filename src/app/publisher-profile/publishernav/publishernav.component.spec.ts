import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishernavComponent } from './publishernav.component';

describe('PublishernavComponent', () => {
  let component: PublishernavComponent;
  let fixture: ComponentFixture<PublishernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishernavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
