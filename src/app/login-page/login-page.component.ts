import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  email: string = '';
  password: string = '';

  constructor(public router: Router) {  }
  onSubmit() {
    this.router.navigate(['/dashboard'])
  }
}
