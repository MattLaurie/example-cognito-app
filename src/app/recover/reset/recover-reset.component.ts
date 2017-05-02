import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RecoverService } from '../recover.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-recover-reset',
  templateUrl: 'recover-reset.component.html'
})
export class RecoverResetComponent implements OnInit {

  busy: boolean;
  error: string;
  email: string;
  resetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private state: ActivatedRoute,
    private recover: RecoverService,
    private auth: AuthService) {
  }

  ngOnInit() {
    this.busy = false;
    this.error = null;
    this.buildForm();
  }

  buildForm() {
    this.resetForm = this.fb.group({
      'code': ['', [Validators.required]],
      'password': ['', [Validators.required]],
    });
  }

  reset() {
    this.busy = true;
    this.error = null;
    const email = this.recover.getRecoverDetails().email;
    const code = this.resetForm.value.code;
    const password = this.resetForm.value.password;
    this.auth.resetPassword(email, code, password)
      .then(() => this.auth.signin(email, password))
      .then(() => {
        this.recover.resetRecoverDetails();
        this.busy = false;
        this.error = null;
        this.router.navigate(['/dashboard']);
      })
      .catch((error: any) => {
        this.busy = false;
        this.error = error.message;
      });
  }
}
