import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ITask } from '../modules/itask';
import { CrudService } from './crud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  currentUser: string;
  subscription: Subscription; // Подписка для todoList
  todoList: Array<ITask>; // Полный список задач

  searchText = ''; // Поле для поиска задач
  sortOrder: 'text' | 'isDone' = null; // Принимает какое поле сортировать

  sortReverse = null;

  idTaskChange: string; // ID задачи которую хотим изменить
  isUnhideAddChangeTaskContainer = false; // Отвечает за отображение секции для записи/редактировании новой задачи
  addChangeTaskGroup: FormGroup; // Объединяет одно поле ввода или изменения задачи
  btnInputName: 'Добавить' | 'Сохранить'; // Что отображается на кнопке
  action: 'add' | 'change' = null; // Какое действие выполнится при нажатии кнопки

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService
  ) {
    this.currentUser = localStorage.getItem('currentUser').toLowerCase();

    this.addChangeTaskGroup = this.formBuilder.group({
      taskText: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscription = this.crudService
      .getAllTasks(this.currentUser)
      .subscribe((data) => {
        this.todoList = data.map((element) => {
          console.log(element.payload.doc.data());
          return {
            id: element.payload.doc.id,
            text: element.payload.doc.data().text,
            isDone: element.payload.doc.data().isDone,
          };
        });
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  displayInputTaskContainer(
    action: 'add' | 'change',
    id?: string,
    originalText?: string
  ): void {
    this.isUnhideAddChangeTaskContainer = true;
    this.action = action;
    if (action === 'add') {
      this.btnInputName = 'Добавить';
      this.addChangeTaskGroup.patchValue({ taskText: '' });
    } else if (action === 'change') {
      this.btnInputName = 'Сохранить';
      this.idTaskChange = id;
      this.addChangeTaskGroup.patchValue({ taskText: originalText });
    }
  }

  addChangeTextTask(): void {
    if (this.action === 'add') {
      const newTask: ITask = {
        text: this.addChangeTaskGroup.value.taskText,
        isDone: false,
        dateCreated: new Date(),
        username: this.currentUser,
      };
      this.crudService.addTask(newTask).catch((error) => console.log(error));
    } else if (this.action === 'change') {
      // TODO: объявлять конкретно change или можно просто else
      const id = this.idTaskChange;
      const modifiedTextTask = {
        text: this.addChangeTaskGroup.value.taskText,
      };
      this.crudService
        .updateTask(id, modifiedTextTask)
        .catch((error) => console.log(error));
    }
    this.addChangeTaskGroup.patchValue({ taskText: '' });
    this.isUnhideAddChangeTaskContainer = false;
  }

  changeIsDoneTask(id, currentIsDone): void {
    const modifiedIsDoneTask = {
      isDone: !currentIsDone,
    };
    this.crudService
      .updateTask(id, modifiedIsDoneTask)
      .catch((error) => console.log(error));
  }

  deleteTask(id): void {
    this.crudService.deleteTask(id).catch((error) => console.log(error));
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
