import { TestBed } from '@angular/core/testing';

import { DocOfficalDispatchService } from './doc-offical-dispatch.service';

describe('DocOfficalDispatchService', () => {
  let service: DocOfficalDispatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocOfficalDispatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
