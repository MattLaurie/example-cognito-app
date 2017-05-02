import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { SignupRegisterComponent } from './register/signup-register.component';
import { SignupConfirmComponent } from './confirm/signup-confirm.component';
import { SignupResendComponent } from './resend/signup-resend.component';
import { SignupService } from './signup.service';
import { SignupSkip } from './signup-skip.service';
import { SignupRegisterSkip } from './signup-register-skip.service';

@NgModule({
  imports: [
    SharedModule,
    SignupRoutingModule
  ],
  declarations: [
    SignupComponent,
    SignupRegisterComponent,
    SignupConfirmComponent,
    SignupResendComponent
  ],
  providers: [
    SignupService,
    SignupSkip,
    SignupRegisterSkip
  ]
})
export class SignupModule {}
