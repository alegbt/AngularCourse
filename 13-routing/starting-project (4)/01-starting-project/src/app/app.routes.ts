import {Routes} from "@angular/router";
import {NoTaskComponent} from "./tasks/no-task/no-task.component";
import {UserTasksComponent} from "./users/user-tasks/user-tasks.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {routes as userRoutes} from "./users/user-routes";

export const routes: Routes = [
  {
    path: "",
    component: NoTaskComponent// <domain>/
  },
  {
    path: 'users/:userId', // <domain>/users/{u1}
    component: UserTasksComponent,
    children: userRoutes,
  },
  {
    path: '**',
    component: NotFoundComponent
  },

]
