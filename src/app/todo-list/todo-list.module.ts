import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TodoListRoutingModule } from './todo-list-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, TodoListRoutingModule, HttpClientModule],
})
export class TodoListModule {}
