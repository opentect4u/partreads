import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnSubscribeComponent } from './un-subscribe.component';

describe('UnSubscribeComponent', () => {
  let component: UnSubscribeComponent;
  let fixture: ComponentFixture<UnSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnSubscribeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
