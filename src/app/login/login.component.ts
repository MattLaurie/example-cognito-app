import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  busy: boolean;
  error: string;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.busy = false;
    this.error = null;
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
  }

  login() {
    this.busy = true;
    this.error = null;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.auth.signin(email, password)
      .then(() => {
        this.busy = false;
        this.error = null;
        const redirect = this.auth.redirectUrl ? this.auth.redirectUrl : '/dashboard';
        this.router.navigate([redirect]);
      })
      .catch((error: any) => {
      console.log('error', error);
        this.busy = false;
        this.error = error.message;
      });
  }
}
