import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RecoverRoutingModule } from './recover-routing.module';
import { RecoverComponent } from './recover.component';
import { RecoverService } from './recover.service';
import { RecoverConfirmComponent } from './confirm/recover-confirm.component';
import { RecoverResetComponent } from './reset/recover-reset.component';

@NgModule({
  imports: [
    SharedModule,
    RecoverRoutingModule
  ],
  declarations: [
    RecoverComponent,
    RecoverConfirmComponent,
    RecoverResetComponent
  ],
  providers: [
    RecoverService
  ]
})
export class RecoverModule {}
