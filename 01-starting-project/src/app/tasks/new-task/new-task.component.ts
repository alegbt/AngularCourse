import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {type NewTaskData} from "../task/task.model";
import {TaskService} from "../tasks.service";

@Component({
  selector: 'app-new-task',
  standalone: false,
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {

  @Input({required: true}) userId!: string;
  @Output() close = new EventEmitter<void>();

  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  private taskService = inject(TaskService);

  onCancel() {
    this.close.emit();
  }


  onSubmit() {
   this.taskService.addTask({
     title: this.enteredTitle,
     summary: this.enteredSummary,
     date: new Date().toISOString()
   },
     this.userId)
    this.close.emit();
  }
}
