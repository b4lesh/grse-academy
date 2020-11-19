import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ITask } from '../modules/itask';
import { CrudService } from './crud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  dataValue: Array<any>;
  todoList: Array<ITask> = [
    { id: 1, text: 'Отказаться от Газпромбанка', isDone: false },
    { id: 2, text: 'Отказаться от SkyNet', isDone: false },
    { id: 3, text: 'Скачать видео и перенести их на внешний ЖД', isDone: true },
    { id: 4, text: 'Заказать столик в ресторане', isDone: true },
    { id: 5, text: 'Забрать аттесата из универа', isDone: false },
    { id: 6, text: 'Поменять фильтр', isDone: false },
    { id: 7, text: 'Разобраться с книгой рецептов', isDone: true },
  ];

  searchText = '';
  sortOrder: 'text' | 'isDone' = null;
  sortReverse = null;
  addChangeTaskGroup: FormGroup;
  inputNumber: number;
  isUnhideAddChangeTaskContainer = false;
  btnInputName: string;
  action: 'add' | 'change' = null;

  subscription: Subscription;
  todoList2: Array<ITask>;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private crudService: CrudService
  ) {
    this.addChangeTaskGroup = this.fb.group({
      taskText: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscription = this.crudService.getAllTasks().subscribe((data) => {
      this.todoList2 = data.map((task) => {
        console.log(task);
        return {
          id: task.payload.doc.data().id,
          text: task.payload.doc.data().text,
          isDone: task.payload.doc.data().isDone,
        };
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  displayInputTaskContainer(action: 'add' | 'change', index?: number): void {
    this.isUnhideAddChangeTaskContainer = true;
    if (action === 'add') {
      this.action = 'add';
      this.btnInputName = 'Добавить';
    } else {
      this.action = 'change';
      this.btnInputName = 'Сохранить';
      this.inputNumber = index;
      this.addChangeTaskGroup.patchValue({
        taskText: this.todoList[index].text,
      });
    }
  }

  addChangeTextTask(): void {
    if (this.action === 'add') {
      const taskText = this.addChangeTaskGroup.value.taskText;
      const inputIsDone = false;
      let inputId: number;
      if (this.todoList.length) {
        const lastId = this.todoList[this.todoList.length - 1].id;
        inputId = lastId + 1;
      } else {
        inputId = 0;
      }
      const newTask: ITask = {
        id: inputId,
        text: taskText,
        isDone: inputIsDone,
      };
      this.todoList.push(newTask);
      this.crudService
        .addTask(newTask)
        .then((res) => console.log(res))
        .catch((error) => console.log(error));

      this.addChangeTaskGroup.patchValue({ taskText: '' });
    } else if (this.action === 'change') {
      // TODO: объявлять конкретно change или можно просто else
      const i = this.inputNumber;
      this.todoList[i].text = this.addChangeTaskGroup.value.taskText;

      this.addChangeTaskGroup.patchValue({ taskText: '' });
    }
    this.isUnhideAddChangeTaskContainer = false;
  }

  cancelAddChangeTask(): void {
    this.isUnhideAddChangeTaskContainer = false;
  }

  changeIsDoneTask(inputNumber): void {
    const currentValue = this.todoList[inputNumber].isDone;
    this.todoList[inputNumber].isDone = !currentValue;
  }

  deleteTask(inputNumber): void {
    this.todoList.splice(inputNumber, 1);
    this.isUnhideAddChangeTaskContainer = false;
  }

  sortTable(sortOrder: 'isDone' | 'text'): void {
    if (this.sortOrder === sortOrder) {
      this.sortReverse = !this.sortReverse;
    } else {
      this.sortOrder = sortOrder;
      this.sortReverse = false;
    }
  }
}
