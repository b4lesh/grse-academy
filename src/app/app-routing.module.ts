import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

const routes: Routes = [
  { path: '', component: NavigationBarComponent },
  {
    path: 'todo-list',
    loadChildren: () =>
      import('./todo-list/todo-list.module').then((m) => m.TodoListModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
