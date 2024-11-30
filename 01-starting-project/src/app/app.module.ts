import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {UserComponent} from "./user/user.component";
import {TaskComponent} from "./tasks/task/task.component";
import {BrowserModule} from "@angular/platform-browser";
import {CardComponent} from "./shared/card/card.component";
import {NewTaskComponent} from "./tasks/new-task/new-task.component";
import {FormsModule} from "@angular/forms";
import {TasksComponent} from "./tasks/tasks.component";
import {SharedModule} from "./shared/shared.module";
import {TasksModule} from "./tasks/tasks.module";

  @NgModule({
    declarations:
      [
        AppComponent,
        HeaderComponent,
        UserComponent,
         ],
    bootstrap: [AppComponent],
    imports:
      [
        BrowserModule,
        SharedModule,
        TasksModule,
      ]
  })
  export class AppModule {}

