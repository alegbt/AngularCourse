import {Component, Input} from '@angular/core';
import {TaskComponent} from "./task/task.component";
import {NewTaskComponent} from "./new-task/new-task.component";
import {NewTaskData} from "./task/task.model";
import {TaskService} from "./tasks.service";

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({required:true}) userId!: string;
  @Input({required:true}) name!: string;
  isAddingTask = false;


  constructor(private taskService: TaskService) {}



  get selectedUserTask(){
    return this.taskService.getUserTasks(this.userId)
  }



  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }


}
