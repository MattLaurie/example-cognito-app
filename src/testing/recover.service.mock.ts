import { Injectable } from '@angular/core';

@Injectable()
export class MockRecoverService {
  getRecoverDetails = jasmine.createSpy('getRecoverDetails');
  createRecoverDetails = jasmine.createSpy('createRecoverDetails');
  resetRecoverDetails = jasmine.createSpy('resetRecoverDetails');
}
