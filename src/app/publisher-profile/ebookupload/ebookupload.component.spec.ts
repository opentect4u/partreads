import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookuploadComponent } from './ebookupload.component';

describe('EbookuploadComponent', () => {
  let component: EbookuploadComponent;
  let fixture: ComponentFixture<EbookuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EbookuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
