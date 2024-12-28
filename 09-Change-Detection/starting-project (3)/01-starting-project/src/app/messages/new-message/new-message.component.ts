import {Component, inject, output, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MessagesService} from "../messages.service";

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.css',
})
export class NewMessageComponent {
  private messagesService = inject(MessagesService);

  //signal way
  enteredText = signal('');

  onSubmit() {
    this.messagesService.addMessage(this.enteredText())
    this.enteredText.set('');
  }



  //non-signal way
  // enteredText = '';
  // onSubmit() {
  //   this.messagesService.addMessage(this.enteredText)
  //   this.enteredText = '';
  // }



  get debugOutput() {
    console.log('[NewMessage] "debugOutput" binding re-evaluated.');
    return 'NewMessage Component Debug Output';
  }



}
