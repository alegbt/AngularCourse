import {Directive, effect, inject, input, TemplateRef, ViewContainerRef} from '@angular/core';
import {Permission} from "./auth.model";
import {AuthService} from "./auth.service";

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required<Permission>({alias: 'appAuth'});
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef); //reference to the palce in the dom where this is used

  constructor() {
    //effect ri evaluta la funzione se i signal all'interno cambiano (activepermission e userType)
    effect(() => {
      if(this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef)
        console.log('show elelemtn')
      }else{
        this.viewContainerRef.clear()
        console.log('hide elelemtn')
      }
    })
  }

}
