import {
  afterNextRender,
  afterRender,
  Component, contentChild,
  ContentChildren,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  ViewEncapsulation
} from '@angular/core';

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

  //setta host come sopra in host: {.. - maniera legacy
  //@HostBinding('class') className = 'control'

  //funziona come riga 15 - maniera legacy
//   @HostListener('click'), onClick2() {
//   console.log('clicked');
// }

  label = input.required<string>();
  private el = inject(ElementRef)

  //@ContentChildren è un decorator di Angular che serve per ottenere un riferimento ai figli del componente
  // inseriti tramite il meccanismo di ng-content. @ContentChildren('input'): Seleziona tutti gli elementi contrassegnati
  // con il template reference #input all'interno dello slot di ng-content. (2 modi di scriverlo)
  // @ContentChildren('input') private control?: ElementRef<HTMLInputElement> | HTMLTextAreaElement;
  private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input')

  constructor() {
    //triggera ad OGNI cambiamento nell'intera app
    afterRender(() => {
      console.log('afterrender');
    })
    //triggera solo al prossimo cambiamento nell'intera app
    afterNextRender(() => {
      console.log('afterNextrender');
    })

  }


  onClick() {
    console.log('clicked');
    console.log(this.el);
    console.log(this.control());
  }
}
