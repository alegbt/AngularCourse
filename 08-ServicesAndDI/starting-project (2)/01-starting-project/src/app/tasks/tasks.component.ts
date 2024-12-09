import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import {TaskService} from "./tasks.service";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  // providers: [TaskService] //maniera per injectare il service. hanno accesso ad esso solo il component con providers e i component instanziati in esso (app-new-task e app-task-list che sono presenti nell'html) n.b. ogni service instanziato in component diversi e' un'istanza diversa
})
export class TasksComponent {

}
