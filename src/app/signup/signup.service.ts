import { Injectable } from '@angular/core';

export interface SignupDetails {
  email: string;
  password: string;
}

@Injectable()
export class SignupService {

  private details: SignupDetails;

  constructor() {
  }

  getSignupDetails() {
    return this.details;
  }

  createSignupDetails(email: string, password: string) {
    this.details = {
      email: email,
      password: password
    };
  }

  resetSignupDetails() {
    this.details = null;
  }
}
