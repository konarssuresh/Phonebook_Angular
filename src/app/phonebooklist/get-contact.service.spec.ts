import { TestBed } from '@angular/core/testing';

import { GetContactService } from './get-contact.service';

describe('GetContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetContactService = TestBed.get(GetContactService);
    expect(service).toBeTruthy();
  });
});
