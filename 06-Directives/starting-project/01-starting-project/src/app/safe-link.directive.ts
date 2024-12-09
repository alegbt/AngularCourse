import {Directive, ElementRef, inject, input} from "@angular/core";
import {LogDirective} from "./log.directive";

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
  hostDirectives: [LogDirective],
})
export class SafeLinkDirective{

  queryParam = input('myapp', {alias: 'appSafeLink'});
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor(){}

  onConfirmLeavePage(event: MouseEvent){
    const wantsToLeave = window.confirm('Are you sure you want to leave this project?');
    if(wantsToLeave){
      //stessa cosa ma con una variabile che lo contiene nel 2 caso
      // const address = (event.target as HTMLAnchorElement).href;
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href = address + '?from=' +this.queryParam();
      return;
    }
    event.preventDefault();
  }




}
