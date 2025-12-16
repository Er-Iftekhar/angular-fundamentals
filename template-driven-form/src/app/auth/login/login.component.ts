import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {


  
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
