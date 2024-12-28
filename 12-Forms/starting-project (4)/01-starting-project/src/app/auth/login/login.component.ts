import {Component, DestroyRef, inject} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, of} from "rxjs";

//custom validators
function mustContainQuestionMark(control: AbstractControl){
  if(control.value.includes('?')){    //logica di success
    return null
  }
  return { doesNotContainQuestionMark: true} //ritorna l'error se non passa il check
}

//async validator
function emailIsUnique(control: AbstractControl){
  if(control.value != 'prova@example.it'){
    return of(null)
  }
  return of({notUnique:true})
}

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm){
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    ReactiveFormsModule
  ]
})
export class LoginComponent {

  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
    }),
  })

  get isEmailInvalid() {
      return this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
  }

  get isPasswordInvalid() {
      return this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
  }

  ngOnInit(){

    const savedForm = window.localStorage.getItem('saved-login-form');

    if(savedForm) {
      const loadedFormData = JSON.parse(savedForm);
      this.form.patchValue({
        email: loadedFormData.email,
      })

    }

    const sub = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => {
        window.localStorage.setItem(
          'saved-login-form',
          JSON.stringify({email: value.email})
        );
      },
    })
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }




  onSubmit() {
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
  }




}
