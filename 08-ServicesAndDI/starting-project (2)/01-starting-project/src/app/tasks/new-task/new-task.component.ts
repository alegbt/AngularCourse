import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TaskService} from "../tasks.service";

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  //dependency injection
  constructor(private tasksService: TaskService) {
    this.tasksService = tasksService
  }

  onAddTask(title: string, description: string) {
    this.tasksService.addTasks({title, description});
    this.formEl()?.nativeElement.reset();
  }
}
