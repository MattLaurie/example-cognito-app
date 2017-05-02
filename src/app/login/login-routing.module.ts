import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginSkip } from './login-skip.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [ LoginSkip ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LoginRoutingModule { }
