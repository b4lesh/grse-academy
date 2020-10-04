import { Component, OnInit } from '@angular/core';
import { data } from '../database/data';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todoList = data; // Вопрос! Нормальная ли это практика? p.s.: конструктор закомментирован
  inputNumber: number;
  inputText: string;
  inputIsDone: boolean;
  isDisplayAddTaskContainer = false;
  isDisplayChangeTaskContainer = false;

  constructor() {}

  ngOnInit(): void {}

  displayAddTaskContainer(): void {
    this.isDisplayAddTaskContainer = !this.isDisplayAddTaskContainer;
  }

  displayChangeTaskContainer(inputNumber): void {
    this.isDisplayChangeTaskContainer = true;
    this.inputNumber = inputNumber;
  }

  addTask(): void {
    const inputText = this.inputText;
    const inputIsDone = false;
    const lastId = this.todoList[this.todoList.length - 1].id;
    const inputId = lastId + 1;

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
}
