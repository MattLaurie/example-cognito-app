import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RecoverService } from '../recover.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-recover-confirm',
  templateUrl: 'recover-confirm.component.html'
})
export class RecoverConfirmComponent implements OnInit {

  busy: boolean;
  error: string;
  confirmForm: FormGroup;

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
    this.confirmForm = this.fb.group({
      'email': ['', [Validators.required]]
    });
  }

  confirm() {
    this.busy = true;
    this.error = null;
    const email = this.confirmForm.value.email;
    this.auth.forgotPassword(email)
      .then(() => {
        this.recover.createRecoverDetails(email);
        this.busy = false;
        this.error = null;
        this.router.navigate(['../reset'], {relativeTo: this.state});
      })
      .catch((error: any) => {
        this.busy = false;
        this.error = error.message;
      });
  }
}
