export class MockSignupService {
  getSignupDetails = jasmine.createSpy('getSignupDetails');
  createSignupDetails = jasmine.createSpy('createSignupDetails');
  resetSignupDetails = jasmine.createSpy('resetSignupDetails');
}
