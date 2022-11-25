import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from '../services/user-login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {

  errorMessage : string | null = null;

  constructor(
      private userLoginService: UserLoginService,
      private router: Router
    ) {}

  ngOnInit(): void {}

  handleFormSubmit(value: {
    email: string;
    password: string;
    ['remember-me']: boolean;
  }): void {

    if(!value.email || !value.email.includes('@') || !value.password) {
      this.errorMessage = 'Invalid email or password!'
      return;
    }

    this.userLoginService.login({
      email: value.email,
      password: value.password,
    }).subscribe({
      next: (response) => {
        console.log(response.message);
        localStorage.setItem('userId', response.userId);
        this.router.navigate(['/']);
        window.dispatchEvent(new Event('storage'));
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password!'
        console.error(err)
      }
    });
  }
}
