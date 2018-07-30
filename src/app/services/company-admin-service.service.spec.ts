import { TestBed, inject } from '@angular/core/testing';

import { CompanyAdminServiceService } from './company-admin-service.service';

describe('CompanyAdminServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyAdminServiceService]
    });
  });

  it('should be created', inject([CompanyAdminServiceService], (service: CompanyAdminServiceService) => {
    expect(service).toBeTruthy();
  }));
});
