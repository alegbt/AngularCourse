import {Component, computed, DestroyRef, inject, input, signal} from '@angular/core';

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

  // order = input<'asc' | 'desc'>('desc');
  order = signal<'asc' | 'desc'>('desc')


  private tasksService = inject(TasksService);

  //listadi task che si ordinano grazie al computed in base a order() desc or asc
  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((t) => t.userId === this.userId())
      .sort((a, b) => {
        if (this.order() === 'desc'){
          return a.id > b.id ? -1 : 1;
        }else{
          return a.id > b.id ? 1 : -1;
        }
      })
  );

  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    const sub = this.activatedRoute.queryParams.subscribe({
      next: (params) => (this.order.set(params['sort'])),
    });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }





}
