import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SignupService } from '../signup.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-signup-confirm',
  templateUrl: 'signup-confirm.component.html'
})
export class SignupConfirmComponent implements OnInit {

  email: string;
  busy: boolean;
  error: string;
  confirmForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private state: ActivatedRoute,
    private signup: SignupService,
    private auth: AuthService) {
  }

  ngOnInit() {
    this.busy = false;
    this.error = null;
    this.buildForm();
  }

  buildForm() {
    const details = this.signup.getSignupDetails();
    if (details !== null && details !== undefined) {
      this.email = details.email;
    }
    this.confirmForm = this.fb.group({
      'code': ['', [Validators.required]]
    });
  }

  confirm() {
    this.busy = true;
    this.error = null;

    const details = this.signup.getSignupDetails();
    if (details === null || details === undefined) {
      this.busy = false;
      this.error = 'Unable to process signup';
      return;
    }

    const code = this.confirmForm.value.code;
    this.auth.confirmEmail(details.email, code)
      .then(() => this.auth.signin(details.email, details.password))
      .then(() => {
        this.signup.resetSignupDetails();
        this.busy = false;
        this.error = null;
        this.router.navigate(['/dashboard']);
      })
      .catch((error: any) => {
        console.log('error', error);
        this.busy = false;
        this.error = error.message;
      });
  }
}
