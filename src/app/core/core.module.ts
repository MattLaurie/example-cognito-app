import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { AuthRequired } from './auth-required.service';

export function _configureAuth(auth: AuthService) {
  return () => auth.configure();
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService,
    AuthRequired,
    {
      provide: APP_INITIALIZER,
      useFactory: _configureAuth,
      deps: [ AuthService ],
      multi: true
    }
  ]
})
export class CoreModule {
}
