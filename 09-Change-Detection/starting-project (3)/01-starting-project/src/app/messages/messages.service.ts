import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {


  //maniera con signal
  private messages = signal<string[]>([]);
  allMessages = this.messages.asReadonly();
  addMessage(message: string) {
    this.messages.update((prevMessages) => [...prevMessages, message]);
  }



  //senza signal - senza signals, se updati un valore in un ts che usa onPush angular potrebbe non accorgersi del cambiamento
  //quindi si usa rxjs con BehaviourSubject per notificarlo
  // messages$ = new BehaviorSubject<string[]>([])
  // private messages: string[] = [];
  // get allMessages() {
  //   return this.messages
  // }
  // addMessage(message: string) {
  //   this.messages = [...this.messages, message];
  //   this.messages$.next([...this.messages]);
  // }








}
