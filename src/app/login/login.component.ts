import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../modules/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginErrorStatus = false;
  currentUser = localStorage.getItem('currentUser');

  constructor(private fb: FormBuilder, private router: Router) {
    if (this.currentUser) {
      setTimeout(() => this.router.navigate(['/todo-list']), 200);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    const users: Array<User> = JSON.parse(localStorage.getItem('user'));
    const username = this.loginForm.value.username.toLowerCase();
    const password = this.loginForm.value.password;

    let isLogin = false;
    if (users) {
      for (const user of users) {
        if (
          user.username.toLowerCase() === username &&
          user.password === password
        ) {
          isLogin = true;
          localStorage.setItem('currentUser', user.username);
          setTimeout(() => this.router.navigate(['/']), 200);
        }
      }
    }
    this.loginErrorStatus = !isLogin;
  }
}
