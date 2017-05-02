import { Injectable } from '@angular/core';

export interface RecoverDetails {
  email: string;
}

@Injectable()
export class RecoverService {

  private details: RecoverDetails;

  constructor() {
  }

  getRecoverDetails() {
    return this.details;
  }

  createRecoverDetails(email: string) {
    this.details = {
      email: email
    };
  }

  resetRecoverDetails() {
    this.details = null;
  }
}
