import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'acc-agg-web';

  constructor(public router: Router) {

  }






  OnDashboardClick(): void {
    this.router.navigate(['/dashboard']);
  }
  OnConsentsClick(): void {
    this.router.navigate(['/consents']);
  }
  OnAccountsClick(): void {
    this.router.navigate(['/accounts']);
  }
}
