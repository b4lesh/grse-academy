import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../modules/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  registrationErrorStatusLogin = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }

  registration(): void {
    // TODO:можно ли сократить запись?
    let usersArray: Array<User> = JSON.parse(localStorage.getItem('user'));
    if (!usersArray) {
      usersArray = [];
    }
    const newUsername = this.registrationForm.value.username;
    const newPassword1 = this.registrationForm.value.password1;
    // const newPassword2 = this.registrationForm.value.password2;
    const newId = usersArray.length
      ? usersArray[usersArray.length - 1].id + 1
      : 1;

    for (const user of usersArray) {
      if (user.username.toLowerCase() === newUsername.toLowerCase()) {
        this.registrationErrorStatusLogin = true;
        return;
      }
    }

    usersArray.push({
      id: newId,
      username: newUsername,
      password: newPassword1,
    });

    localStorage.setItem('user', JSON.stringify(usersArray));
    location.href = '/login';
  }
}
