import { TestBed, inject } from '@angular/core/testing';

import { NurtureService } from './nurture.service';

describe('NurtureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NurtureService]
    });
  });

  it('should be created', inject([NurtureService], (service: NurtureService) => {
    expect(service).toBeTruthy();
  }));
});
