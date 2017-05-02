import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SignupRegisterComponent } from './register/signup-register.component';
import { SignupConfirmComponent } from './confirm/signup-confirm.component';
import { SignupSkip } from './signup-skip.service';
import { SignupResendComponent } from './resend/signup-resend.component';
import { SignupRegisterSkip } from './signup-register-skip.service';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
    canActivate: [ SignupSkip ],
    children: [
      { path: '', component: SignupRegisterComponent, canActivate: [ SignupRegisterSkip ]  },
      { path: 'confirm', component: SignupConfirmComponent },
      { path: 'resend-code', component: SignupResendComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
