import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProcessingUnitComponent } from './upload-processing-unit.component';

describe('UploadProcessingUnitComponent', () => {
  let component: UploadProcessingUnitComponent;
  let fixture: ComponentFixture<UploadProcessingUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadProcessingUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProcessingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
