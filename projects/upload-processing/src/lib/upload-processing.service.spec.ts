import { TestBed } from '@angular/core/testing';

import { UploadProcessingService } from './upload-processing.service';

describe('UploadProcessingService', () => {
  let service: UploadProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
