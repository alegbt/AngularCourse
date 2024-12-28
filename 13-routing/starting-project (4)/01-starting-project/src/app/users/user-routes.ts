import {Route, Routes} from "@angular/router";
import {TasksComponent} from "../tasks/tasks.component";
import {NewTaskComponent} from "../tasks/new-task/new-task.component";


export const routes: Routes = [
  //child routes necessitano di un router-oulet apposito per esse, contenuto dentro il router-outlet del padre
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'prefix'
  },
  {
    path: 'tasks',     // <domain>/users/{u1}/tasks
    component: TasksComponent
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent
  },
]
