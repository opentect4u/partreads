import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickonlinkComponent } from './clickonlink.component';

describe('ClickonlinkComponent', () => {
  let component: ClickonlinkComponent;
  let fixture: ComponentFixture<ClickonlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickonlinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickonlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
