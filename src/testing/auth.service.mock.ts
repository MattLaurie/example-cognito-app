import { Injectable } from '@angular/core';

@Injectable()
export class MockAuthService {
  configure = jasmine.createSpy('configure');
  isAuthenticated = jasmine.createSpy('isAuthenticated');
  signin = jasmine.createSpy('signin');
  signout = jasmine.createSpy('signout');
  token = jasmine.createSpy('token');
  register = jasmine.createSpy('register');
  confirmEmail = jasmine.createSpy('confirmEmail');
  confirmMFA = jasmine.createSpy('confirmMFA');
  resendConfirmCode = jasmine.createSpy('resendConfirmCode');
  registerComplete = jasmine.createSpy('registerComplete');
  forgotPassword = jasmine.createSpy('forgotPassword');
  resetPassword = jasmine.createSpy('resetPassword');
}
