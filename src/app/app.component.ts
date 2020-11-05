import { Component, OnDestroy, OnInit } from '@angular/core';
// import { User } from './modules/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor() {
    // const users: Array<User> = [
    //   { id: 1, username: 'George', password: 'Qwerty12' },
    // ];
    // localStorage.setItem('user', JSON.stringify(users));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
