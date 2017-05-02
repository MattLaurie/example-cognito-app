import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SignupService } from '../signup.service';
import { AuthService } from '../../core/auth.service';
import { CustomValidators } from '../../shared/custom-validators';

@Component({
  selector: 'app-signup-register',
  templateUrl: 'signup-register.component.html'
})
export class SignupRegisterComponent implements OnInit {

  busy: boolean;
  error: string;
  registerForm: FormGroup;

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
    this.registerForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, CustomValidators.passwordPolicy()]]
    });
  }

  register() {
    this.busy = true;
    this.error = null;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    this.auth.register(email, password)
      .then(() => {
        this.signup.createSignupDetails(email, password);
        this.busy = false;
        this.error = null;
        this.router.navigate(['confirm'], {relativeTo: this.state});
      })
      .catch((error: any) => {
        this.busy = false;
        this.error = error.message;
      });
  }
}
