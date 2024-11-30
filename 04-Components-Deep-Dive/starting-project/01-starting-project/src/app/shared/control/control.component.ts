import {Component, ElementRef, HostBinding, HostListener, inject, input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  // applica qst class a tutte le instanziazioni di qst component
  // lo sto applicando tramite ts sotto con @HostBinding
  host: {
    class: 'control',
    //questo setta in modo che cliccando appcontrol si attiva onClick
  '(click)':'onClick()',
  }
})
export class ControlComponent {

  //setta host come sopra a riga 12 - maniera legacy
  //@HostBinding('class') className = 'control'

  //funziona come riga 15 - maniera legacy
//   @HostListener('click'), onClick2() {
//   console.log('clicked');
// }

  label = input.required<string>();

  private el = inject(ElementRef)

  onClick() {
    console.log('clicked');
  }
}
