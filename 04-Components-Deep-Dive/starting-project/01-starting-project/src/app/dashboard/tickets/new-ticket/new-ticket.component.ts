import {AfterViewInit, Component, ElementRef, output, viewChild, ViewChild} from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {ControlComponent} from "../../../shared/control/control.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [
    ButtonComponent,
    ControlComponent,
    FormsModule
  ],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements AfterViewInit {

  //2 modi di scrivere - prende l'elemento con #form nello stesso component
   @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
  //private form = viewChild.required<ElementRef<HTMLFormElement>>('form')

  enteredTitle = ''
  enteredText = ''

  add = output<{title: string; text: string}>()

  //in questo punto del lifecycle il template has been initialized and angualar is able to selected elements quindi posso selzionare il form (se usassi @Viewchild dovrei usare qst x selezionarlo xke in ngonInit non sarebbe disponibile, usando il signal invece e' disponibile anche in ngoninit
  ngAfterViewInit() {
    console.log('afterviewinit');
    console.log(this.form?.nativeElement);
  }

  onSubmit() {
    this.add.emit({title: this.enteredTitle, text: this.enteredText});
    //this.form?.nativeElement.reset();
    this.enteredText = ''
    this.enteredTitle = ''
  }



}
