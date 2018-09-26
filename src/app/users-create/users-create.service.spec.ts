import { TestBed, inject } from '@angular/core/testing';

import { UsersCreateService } from './users-create.service';

describe('UsersCreateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersCreateService]
    });
  });

  it('should be created', inject([UsersCreateService], (service: UsersCreateService) => {
    expect(service).toBeTruthy();
  }));
});
