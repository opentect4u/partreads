import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSideBarComponent } from './site-side-bar.component';

describe('SiteSideBarComponent', () => {
  let component: SiteSideBarComponent;
  let fixture: ComponentFixture<SiteSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
