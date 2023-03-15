import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexNavHeaderComponent } from './index-nav-header.component';

describe('IndexNavHeaderComponent', () => {
  let component: IndexNavHeaderComponent;
  let fixture: ComponentFixture<IndexNavHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexNavHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexNavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
