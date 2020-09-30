import { Component } from '@angular/core';

interface ITask {
  id: number;
  text: string;
  isDone: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todoList: Array<ITask> = [
    { id: 1, text: 'Сходить в магазин', isDone: false },
  ];
  inputId: number;
  inputChangedText: string;
  inputNewText: string;
  inputIsDone: boolean;

  changeTask(): void {
    const inputId: number = Number(this.inputId);
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
