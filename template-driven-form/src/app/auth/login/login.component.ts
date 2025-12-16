import { afterNextRender, Component, DestroyRef, inject, OnInit, viewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustConstainQuestionMark(control: AbstractControl){
  if(control.value.includes('?')){
    return null;
  }
  return {desNotContainQuestionMark: true};
}

function emailIsUnique(control: AbstractControl){
  if(control.value !=='test@example.com'){
    return of(null);
  }

  return of({notUnique: true});
}

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');

if(savedForm){
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  // code for reactive forms
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.required],
      asyncValidators: [emailIsUnique]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustConstainQuestionMark]
    })
  });
  
  get emailIsInvalid(){
    return this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid;
  }

  get passwordIsInvalid(){
    return this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid;
  }
  onSubmit(){
    console.log(this.form);
    const email = this.form.value.email;
    const password = this.form.value.password;
    console.log(email, password);
  }

  ngOnInit(): void {
    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: value => {
          window.localStorage.setItem('saved-login-form',
            JSON.stringify({email: value.email})
          );
        }
      });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }


  // code for template driven forms
  // private form = viewChild.required<NgForm>('form');
  // private destroyRef = inject(DestroyRef);


  // constructor(){
  //   afterNextRender(() => {
  //     const savedForm = window.localStorage.getItem('saved-login-form');

  //     if(savedForm){
  //       const loadedForm = JSON.parse(savedForm);
  //       const email = loadedForm.email;
  //       setTimeout(() => {
  //         this.form().controls['email'].setValue(email);
  //       }, 1);
  //     }

  //     const subscription = this.form().valueChanges?.
  //       pipe(debounceTime(500))
  //       .subscribe({
  //         next: (value) => window.localStorage.setItem(
  //           'saved-login-form',
  //           JSON.stringify({email: value.email})
  //         )
  //       })
  //       this.destroyRef.onDestroy(() => subscription?.unsubscribe());
  //   });
    
  // }

  // onSubmit(formData: NgForm){
  //   console.log(formData);
  //   const email = formData.form.value.email;
  //   const password = formData.form.value.password;
  //   console.log(email, password);
  //   formData.reset();
  // }
}
