import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogpubComponent } from './logpub.component';

describe('LogpubComponent', () => {
  let component: LogpubComponent;
  let fixture: ComponentFixture<LogpubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogpubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogpubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
