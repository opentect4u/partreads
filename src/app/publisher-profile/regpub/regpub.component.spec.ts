import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegpubComponent } from './regpub.component';

describe('RegpubComponent', () => {
  let component: RegpubComponent;
  let fixture: ComponentFixture<RegpubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegpubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegpubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
