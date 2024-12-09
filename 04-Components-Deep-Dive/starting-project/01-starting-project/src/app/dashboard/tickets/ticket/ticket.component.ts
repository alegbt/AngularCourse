import {Component, input, output, signal} from '@angular/core';
import {Ticket} from "../ticket.model";

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

  data = input.required<Ticket>();
  close = output();
  detailsVisible = signal(false);

  onToggleDetails(){
    //classico x scambiare lo stato
    // this.detailsVisible.set(!this.detailsVisible);
    //qst passa in oldstate lo stato precedente di quel signal
    this.detailsVisible.update((oldState) => !oldState);
  }

  onMarkCompleted(){
    this.close.emit()
  }


}
