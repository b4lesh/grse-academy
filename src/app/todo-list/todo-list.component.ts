import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ITask } from '../modules/itask';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  dataValue: Array<any>;
  todoList: Array<ITask> = [];
  inputNumber: number;
  inputIsDone: boolean;
  isDisplayAddTaskContainer = false;
  isDisplayChangeTaskContainer = false;
  addTaskGroup: FormGroup;
  changeTaskGroup: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
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
    setTimeout(() => this.todoList.splice(10, 190), 100);
  }

  ngOnInit(): void {
    this.addTaskGroup = this.fb.group({
      inputText: ['', Validators.required],
    });

    this.changeTaskGroup = this.fb.group({
      inputText: '',
    });
  }

  getData(): void {
    this.http
      .get<any>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((data) => (this.dataValue = Object.values(data)));
  }

  displayAddTaskContainer(): void {
    this.isDisplayAddTaskContainer = !this.isDisplayAddTaskContainer;
    this.isDisplayChangeTaskContainer = false;
  }

  displayChangeTaskContainer(inputNumber): void {
    this.isDisplayChangeTaskContainer = true;
    this.inputNumber = inputNumber;
    this.isDisplayAddTaskContainer = false;
    this.changeTaskGroup.setValue({
      inputText: this.todoList[inputNumber].text,
    });
  }

  addTask(): void {
    const inputText = this.addTaskGroup.value.inputText;
    const inputIsDone = false;
    let inputId: number;
    if (this.todoList.length) {
      const lastId = this.todoList[this.todoList.length - 1].id;
      inputId = lastId + 1;
    } else {
      inputId = 0;
    }

    this.todoList.push({ id: inputId, text: inputText, isDone: inputIsDone });

    this.addTaskGroup.setValue({ inputText: '' }); // Это норма?
    this.isDisplayAddTaskContainer = false;
  }

  changeTextTask(): void {
    const i = this.inputNumber;
    this.todoList[i].text = this.changeTaskGroup.value.inputText;

    this.changeTaskGroup.setValue({ inputText: '' }); // Это норма?
    this.isDisplayChangeTaskContainer = false;
  }

  changeIsDoneTask(inputNumber): void {
    const currentValue = this.todoList[inputNumber].isDone;
    this.todoList[inputNumber].isDone = !currentValue;
  }

  deleteTask(inputNumber): void {
    this.todoList.splice(inputNumber, 1);
    // this.inputText = null;
    this.isDisplayAddTaskContainer = false;
    this.isDisplayChangeTaskContainer = false;
  }
}
