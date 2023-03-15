import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivepagesComponent } from './activepages.component';

describe('ActivepagesComponent', () => {
  let component: ActivepagesComponent;
  let fixture: ComponentFixture<ActivepagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivepagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivepagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
