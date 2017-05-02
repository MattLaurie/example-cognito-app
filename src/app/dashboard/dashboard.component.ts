import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent {

  constructor(private auth: AuthService, private router: Router) {}

  signOut() {
    this.auth.signout()
      .then(() => this.router.navigate(['/']));
  }
}
