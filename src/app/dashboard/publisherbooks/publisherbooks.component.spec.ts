import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherbooksComponent } from './publisherbooks.component';

describe('PublisherbooksComponent', () => {
  let component: PublisherbooksComponent;
  let fixture: ComponentFixture<PublisherbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublisherbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
