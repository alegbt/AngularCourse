import {Directive, ElementRef, inject} from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onlog()',
  }
})
export class LogDirective {

  constructor() { }

  private elementRef = inject(ElementRef);

  onlog() {
    console.log('CLICKED');
    console.log(this.elementRef.nativeElement);
  }
}
