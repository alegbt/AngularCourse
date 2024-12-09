import {Component, EventEmitter, Input, model, Output} from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {

  //  CUSTOM 2 WAY BINDING

  //  CON INPUT-OUTPUT (legacy way)
  //2 way binding attraverso componenets, chiamando l'output *nome dell'input* +change posso bindare l'emit ad app component, il quale
  //dovra essere scritto cosi: <app-rect [(size)]="rectSize"/> e lo stato di size in app component si comportera come in un 2 way binding
  // @Input({required:true}) size!: {width: string, height: string};
  // @Output() sizeChange = new EventEmitter<{width: string, height: string}>();
  // onReset() {
  //   this.sizeChange.emit({width: '200', height: '100'});
  // }


  //17.2+ Angular - maniera + odierna
  size = model.required<{width: string, height: string}>()
  onReset() {
    this.size.set({width: '200', height: '100'})
  }



}
