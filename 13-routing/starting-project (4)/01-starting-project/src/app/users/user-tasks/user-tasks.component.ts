import {Component, ComponentRef, computed, DestroyRef, inject, input} from '@angular/core';
import {UsersService} from "../users.service";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [
    RouterOutlet,
    RouterLink
  ]
})
export class UserTasksComponent {

  private usersService = inject(UsersService);

  //retrieve userId with signals()
  // userId = input.required<string>();
  // userName = computed(() => this.usersService.users.find(user => user.id === this.userId())?.name);

  //retrieve userId with old angular
  userName = ''
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    console.log(this.activatedRoute);
    const sub = this.activatedRoute.paramMap.subscribe({
      next: paramMap => {
        this.userName = this.usersService.users.find( u => u.id === paramMap.get('userId')
        )?.name || '';
      }
    })
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }





}
