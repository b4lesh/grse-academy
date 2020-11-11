import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../modules/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  registrationErrorStatusLogin = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password1: ['', Validators.required],
        password2: ['', [Validators.required]],
      },
      {
        validators: (group: FormGroup) =>
          group.value.password1 === group.value.password2
            ? null
            : { mismatch: true },
      }
    );
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
    setTimeout(() => this.router.navigate(['/login']), 250);
  }
}
