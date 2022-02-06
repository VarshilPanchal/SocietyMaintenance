import { TestBed } from '@angular/core/testing';

import { DashboardServicesService } from './dashboard-services.service';

describe('DashboardServicesService', () => {
  let service: DashboardServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
