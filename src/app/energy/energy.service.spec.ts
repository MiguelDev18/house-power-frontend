import { TestBed, inject } from '@angular/core/testing';

import { EnergyService } from './energy.service';

describe('EnergyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnergyService]
    });
  });

  it('should be created', inject([EnergyService], (service: EnergyService) => {
    expect(service).toBeTruthy();
  }));
});
