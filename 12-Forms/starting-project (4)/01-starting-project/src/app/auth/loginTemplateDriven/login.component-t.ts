import {afterNextRender, Component, DestroyRef, inject, viewChild} from '@angular/core';
import {FormGroup, FormsModule, NgForm} from "@angular/forms";
import {formatDate} from "@angular/common";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-login-template',
  standalone: true,
  templateUrl: './login.component-t.html',
  styleUrl: './login.component-t.css',
  imports: [
    FormsModule
  ]
})
export class LoginComponent {

  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {

    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-login-form');

      if(savedForm) {
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
        setTimeout(() =>{
          this.form().controls['email'].setValue(savedEmail);
        },1)
      }

      const sub = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-login-form',
            JSON.stringify({email: value.email})
          );
        },
      })
      this.destroyRef.onDestroy(() => sub?.unsubscribe())
    })
  }




  onSubmit(formData: NgForm){

    if(formData.form.invalid){
      return;
    }

    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    console.log(enteredEmail, enteredPassword);
    console.log(formData);

    formData.form.reset();


  }





}
