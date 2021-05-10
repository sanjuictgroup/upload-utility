import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProcessingComponent } from './upload-processing.component';

describe('UploadProcessingComponent', () => {
  let component: UploadProcessingComponent;
  let fixture: ComponentFixture<UploadProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadProcessingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
