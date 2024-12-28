import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input} from '@angular/core';
import {MessagesService} from "../messages.service";
import {MessagesComponent} from "../messages.component";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  imports: [
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent {

  private messagesService = inject(MessagesService);

  //con signals
  messages = this.messagesService.allMessages

  //senza signals (piu $ | async in html)
  // messages$ = this.messagesService.messages$;



  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
