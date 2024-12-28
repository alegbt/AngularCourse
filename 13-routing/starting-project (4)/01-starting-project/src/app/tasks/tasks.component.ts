import {Component, computed, DestroyRef, inject, input} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import {TasksService} from "./tasks.service";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {

  userId = input.required<string>();    //qui riesce a prendere userId come param dall'url x la configurazione in app.config di withRouterConfig

  // order = input<'asc' | 'desc'>();
  order? : 'asc' | 'desc';

  private tasksService = inject(TasksService);

  userTasks = computed(() => this.tasksService.allTasks().filter((t) => t.userId === this.userId()));

  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    const sub = this.activatedRoute.queryParams.subscribe({
      next: params => this.order = params['order']
    });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }





}
