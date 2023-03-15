import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesubcateComponent } from './updatesubcate.component';

describe('UpdatesubcateComponent', () => {
  let component: UpdatesubcateComponent;
  let fixture: ComponentFixture<UpdatesubcateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatesubcateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesubcateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
