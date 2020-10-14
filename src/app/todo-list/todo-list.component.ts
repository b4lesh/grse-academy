@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  dataValue: Array<any>;
  todoList: Array<ITask> = [];
  inputNumber: number;
  inputText: string;
  inputIsDone: boolean;
  isDisplayAddTaskContainer = false;
  isDisplayChangeTaskContainer = false;

  constructor(private http: HttpClient) {
    this.getData();
    setTimeout(
      () =>
        this.dataValue.forEach((value, i) =>
          this.todoList.push({
            id: i,
            text: value.title,
            isDone: value.completed,
          })
        ),
      100
    );
  }

  ngOnInit(): void {
    console.log('Init');
  }

  ngOnDestroy(): void {
    console.log('Destroy');
  }

  getData(): void {
    this.http
      .get<any>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((data) => (this.dataValue = Object.values(data)));
  }

  displayAddTaskContainer(): void {
    console.log(this.todoList);

    this.isDisplayAddTaskContainer = !this.isDisplayAddTaskContainer;
    this.isDisplayChangeTaskContainer = false;
  }

  displayChangeTaskContainer(inputNumber): void {
    this.isDisplayChangeTaskContainer = true;
    this.inputNumber = inputNumber;
    this.isDisplayAddTaskContainer = false;
    this.inputText = this.todoList[inputNumber].text;
  }

  addTask(): void {
    const inputText = this.inputText;
    const inputIsDone = false;
    let inputId: number;
    if (this.todoList.length) {
      const lastId = this.todoList[this.todoList.length - 1].id;
      inputId = lastId + 1;
    } else {
      inputId = 0;
    }

    if (inputText) {
      this.todoList.push({ id: inputId, text: inputText, isDone: inputIsDone });
    }

    this.inputText = null;
    this.isDisplayAddTaskContainer = false;
  }

  changeTextTask(): void {
    const i = this.inputNumber;
    this.todoList[i].text = this.inputText;

    this.inputText = null;
    this.isDisplayChangeTaskContainer = false;
  }

  changeIsDoneTask(inputNumber): void {
    const currentValue = this.todoList[inputNumber].isDone;
    this.todoList[inputNumber].isDone = !currentValue;
  }

  deleteTask(inputNumber): void {
    this.todoList.splice(inputNumber, 1);
    this.inputText = null;
    this.isDisplayAddTaskContainer = false;
    this.isDisplayChangeTaskContainer = false;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ITask } from '../modules/itask';
