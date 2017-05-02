import { Injectable } from '@angular/core';

import * as AWS from 'aws-sdk';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  ISignUpResult
} from 'amazon-cognito-identity-js';

import { environment } from '../../environments/environment';

export interface SigninResult {
  type: string;
  data?: any;
}

@Injectable()
export class AuthService {

  redirectUrl: string;

  userPool: CognitoUserPool = new CognitoUserPool({
    UserPoolId: environment.aws.userPoolId,
    ClientId: environment.aws.clientId
  });

  constructor() {}

  /**
   * Configure the environment before application start.
   */
  configure(): void {
    AWS.config.update({
      region: environment.aws.region,
    });
  }

  /**
   * Determine if the current user is authenticated.  This will update the user session by refresh token if required.
   * @returns {any}
   */
  isAuthenticated(): Promise<boolean> {
    const cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser == null) {
      return Promise.resolve(false);
    }
    return new Promise((resolve, reject) => {
      cognitoUser.getSession((error: Error, session: CognitoUserSession) => {
        if (error) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  /**
   * Sign in to the application.
   *
   * @param email
   * @param password
   * @returns {Promise<SigninResult>}
   */
  signin(email: string, password: string): Promise<SigninResult> {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool
    });
    const details = new AuthenticationDetails({
      Username: email,
      Password: password
    });
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(details, {
        onSuccess: (session: CognitoUserSession) => {
          const logins = {};
          const key = `cognito-idp.${environment.aws.region}.amazonaws.com/${environment.aws.identityPoolId}`;
          logins[key] = session.getIdToken().getJwtToken();
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: environment.aws.identityPoolId,
            Logins: logins
          });
          resolve({
            type: 'SUCCESS'
          });
        },
        onFailure: (error: any) => {
          reject(error);
        },
        newPasswordRequired: (userAttributes: any, requiredAttributes: any) => {
          resolve({
            type: 'NEW_PASSWORD_REQUIRED',
            data: {
              userAttributes: userAttributes,
              requiredAttributes: requiredAttributes
            }
          });
        },
        mfaRequired: (challengeName: any, challengeParameters: any) => {
          resolve({
            type: 'MFA_REQUIRED',
            data: {
              challengeName: challengeName,
              challengeParameters: challengeParameters
            }
          });
        },
        customChallenge: (challengeParameters: any) => {
          resolve({
            type: 'CUSTOM_CHALLENGE',
            data: {
              challengeParameters: challengeParameters
            }
          });
        }
      });
    });
  }

  /**
   * Sign out of the application.  This will clear any cached authentication tokens.
   * @returns {Promise<CognitoUser>}
   */
  signout(): Promise<any> {
    return this.getCurrentUser()
      .then((cognitoUser) => {
        cognitoUser.signOut();
      });
  }

  /**
   * Access the current session id token.  Use this token in `Authorization` headers to API Gateway requests.
   *
   * @returns {Promise<CognitoUserSession>}
   */
  token(): Promise<string> {
    return this.getCurrentSession()
      .then((session: CognitoUserSession) => session.getIdToken().getJwtToken());
  }

  /**
   * Register a new user.
   *
   * @param email
   * @param password
   * @returns {Promise<T>}
   */
  register(email: string, password: string): Promise<any> {
    const attributes = [];
    attributes.push(
      {
        Name: 'email',
        Value: email
      }
    );
    return new Promise((resolve, reject) => {
      this.userPool.signUp(email, password, attributes, null, (error: Error, result: ISignUpResult) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Confirm email ownership of a new user.
   *
   * @param email
   * @param code
   * @returns {Promise<T>}
   */
  confirmEmail(email: string, code: string): Promise<string> {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool
    });
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (error: any, result: string) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Confirm the MFA code required for a new user.
   *
   * See `MFA_REQUIRED` result type from `signin`
   *
   * @param email
   * @param code
   * @returns {Promise<T>}
   */
  confirmMFA(email: string, code): Promise<any> {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool
    });
    return new Promise((resolve, reject) => {
      cognitoUser.sendMFACode(code, {
        onSuccess: (session: CognitoUserSession) => {
          resolve();
        },
        onFailure: (error: any) => {
          reject(error);
        }
      });
    });
  }

  /**
   * Resend email ownership confirmation code to a new user.
   *
   * @param email
   * @returns {Promise<T>}
   */
  resendConfirmCode(email: string): Promise<string> {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool
    });
    return new Promise((resolve, reject) => {
      cognitoUser.resendConfirmationCode((error: any, result: string) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Complete registration of user including changing password and confirming attributes.
   *
   * See `NEW_PASSWORD_REQUIRED` result type from `signin`
   *
   * @param email
   * @param password
   * @param attributes
   * @returns {Promise<T>}
   */
  registerComplete(email: string, password: string, attributes: any[]): Promise<any> {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool
    });
    return new Promise((resolve, reject) => {
      cognitoUser.completeNewPasswordChallenge(password, attributes, {
        onSuccess: (session: CognitoUserSession) => {
          resolve();
        },
        onFailure: (error: any) => {
          reject(error);
        }
      });
    });
  }

  /**
   * Initiate password reset flow by sending a confirmation code for use in `resetPassword`.
   *
   * @param email
   * @returns {Promise<T>}
   */
  forgotPassword(email: string): Promise<any> {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool
    });
    return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: () => {
        },
        onFailure: (error: Error) => {
          reject(error);
        },
        inputVerificationCode: (data: any) => {
          resolve(data);
        }
      });
    });
  }

  /**
   * Reset the password using the confirmation code from `forgotPassword`.
   *
   * @param email
   * @param code
   * @param password
   * @returns {Promise<T>}
   */
  resetPassword(email: string, code: string, password: string): Promise<any> {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool
    });
    return new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(code, password, {
        onSuccess: () => {
          resolve();
        },
        onFailure: (error: Error) => {
          reject();
        }
      });
    });
  }

  /*
   * Helper method to retrieve the current `CognitoUser`.
   *
   * @returns {any}
   */
  private getCurrentUser(): Promise<CognitoUser> {
    const cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser == null) {
      return Promise.reject('NO_USER');
    }
    return new Promise((resolve, reject) => {
      cognitoUser.getSession((error: Error, session: CognitoUserSession) => {
        if (error) {
          reject(error);
        } else {
          resolve(cognitoUser);
        }
      });
    });
  }

  /*
   * Helper method to retrieve the current `CognitoUserSession`.
   * @returns {any}
   */
  private getCurrentSession(): Promise<CognitoUserSession> {
    const cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser == null) {
      return Promise.reject('NO_USER');
    }
    return new Promise((resolve, reject) => {
      cognitoUser.getSession((error: Error, session: CognitoUserSession) => {
        if (error) {
          reject(error);
        } else {
          resolve(session);
        }
      });
    });
  }
}
