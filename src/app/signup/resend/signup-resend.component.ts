import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SignupService } from '../signup.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-signup-resend',
  templateUrl: 'signup-resend.component.html'
})
export class SignupResendComponent implements OnInit {

  busy: boolean;
  error: string;
  resendForm: FormGroup;

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
    this.resendForm = this.fb.group({
      'email': ['', [Validators.required]]
    });
  }

  resend() {
    this.busy = true;
    this.error = null;
    const email = this.resendForm.value.email;
    this.auth.resendConfirmCode(email)
      .then(() => {
        this.busy = false;
        this.error = null;
        this.router.navigate(['../confirm'], {relativeTo: this.state});
      })
      .catch((error: any) => {
        this.busy = false;
        this.error = error.message;
      });
  }
}
