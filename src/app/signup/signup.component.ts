import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  passwordVisible = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    let passwordInput = document.getElementById('password') as HTMLInputElement;
    let confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;

    passwordInput.type = this.passwordVisible ? 'text' : 'password';
    confirmPasswordInput.type = this.passwordVisible ? 'text' : 'password';
  }

  onSubmit() {
    // Implement signup logic here
  }
}
