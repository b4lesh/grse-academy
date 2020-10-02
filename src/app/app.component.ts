import { Component, OnDestroy, OnInit } from '@angular/core';
import { data } from './database/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  todoList = data; // Вопрос! Нормальная ли это практика? p.s.: конструктор закомментирован
  inputId: number;
  inputChangedText: string;
  inputNewText: string;
  inputIsDone: boolean;

  // constructor() {
  //   // this.todoList = data;
  // }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  changeTask(): void {
    const inputId = Number(this.inputId);
    const inputText = this.inputChangedText;
    const inputIsDone = this.inputIsDone;
    let isBe = false;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].id === inputId) {
        this.todoList.splice(i, 1);
        console.log(this.todoList);
        isBe = true;
        break;
      }
    }
    if (isBe) {
      this.todoList.push({ id: inputId, text: inputText, isDone: inputIsDone });
    }
  }

  addTask(): void {
    const inputId = this.todoList.length + 1;
    const inputText = this.inputNewText;
    const inputIsDone = false;
    if (inputText) {
      this.todoList.push({ id: inputId, text: inputText, isDone: inputIsDone });
    }
  }
}
