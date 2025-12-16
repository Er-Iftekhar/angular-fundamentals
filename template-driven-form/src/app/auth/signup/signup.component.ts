import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

function emailIsUniqueForSignUp(control: AbstractControl) {
  if (control.value !== 'test@gmail.com') {
    return null;
  }
  return { isNotUniqueEmail: true };
}

function equalValues(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirmedPassword = control.get('confirmedPassword')?.value;
  if (password === confirmedPassword) {
    return null;
  }
  return { passwordNotEqual: true };
}

let initialSignUpEmail = '';
const savedSignUpForm = window.localStorage.getItem('saved-signup-form');
if (savedSignUpForm) {
  const loadedSignUpForm = JSON.parse(savedSignUpForm);
  initialSignUpEmail = loadedSignUpForm.email;
}

function equalValuesGeneral(controlName1: string, controlName2: string){
  return (constrol: AbstractControl) => {
    const val1 = constrol.get(controlName1)?.value;
    const val2 = constrol.get(controlName2)?.value;
    if(val1 === val2){
      return null;
    }
    return {valuesNotEqual: true}
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl(initialSignUpEmail, {
      validators: Validators.required,
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: Validators.required,
        }),
        confirmPassword: new FormControl('', {
          validators: Validators.required,
        }),
      },
      {
        validators: [equalValuesGeneral('password', 'confirmPassword')],
      }
    ),
    firstName: new FormControl('', {
      validators: Validators.required,
    }),
    lastName: new FormControl('', {
      validators: Validators.required,
    }),
    address: new FormGroup({
      street: new FormControl('', {
        validators: Validators.required,
      }),
      number: new FormControl('', {
        validators: Validators.required,
      }),
      postalCode: new FormControl('', {
        validators: Validators.required,
      }),
      city: new FormControl('', {
        validators: Validators.required,
      })
    }),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', {
      validators: Validators.required,
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]),
    agree: new FormControl('', {
      validators: Validators.required,
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.passwords.controls.password.touched &&
      this.form.controls.passwords.controls.password.dirty &&
      this.form.controls.passwords.controls.password.invalid
    );
  }
  onSubmit() {
    if (this.form.invalid) {
      console.log('Invalid form submitted');
      return;
    }
    console.log(this.form);
  }

  ngOnInit(): void {
    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-signup-form',
            JSON.stringify({ email: value.email })
          );
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
