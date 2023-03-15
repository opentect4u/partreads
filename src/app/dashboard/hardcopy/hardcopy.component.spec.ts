import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardcopyComponent } from './hardcopy.component';

describe('HardcopyComponent', () => {
  let component: HardcopyComponent;
  let fixture: ComponentFixture<HardcopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardcopyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardcopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
