import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecoverComponent } from './recover.component';
import { RecoverConfirmComponent } from './confirm/recover-confirm.component';
import { RecoverResetComponent } from './reset/recover-reset.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RecoverComponent,
        children: [
          { path: '', component: RecoverConfirmComponent },
          { path: 'reset', component: RecoverResetComponent }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class RecoverRoutingModule { }
