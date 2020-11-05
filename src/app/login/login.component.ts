import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../modules/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginErrorStatus = false;
  currentUser = localStorage.getItem('currentUser');

  constructor(private fb: FormBuilder) {
    if (this.currentUser) {
      location.href = '/todo-list';
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
          location.href = '/';
        }
      }
    }
    this.loginErrorStatus = !isLogin;
  }
}
