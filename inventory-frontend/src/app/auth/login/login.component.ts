/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-11-03 23:09:09
 * @modify date 2020-11-03 23:09:09
 * @desc Login Operation
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  submitted = false;
  loginSubscription: Subscription;
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) this.submitData(this.loginForm.value);
  }

  submitData(formData: any) {
    this.enableLoading();
    this.loginSubscription = this.authService.login(formData).subscribe(
      (response) => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.disableLoading();
        if (error.error.message === 'FieldException')
          error.error.errors.forEach((element) =>
            this.loginForm.controls[element.field]?.setErrors({
              serverValidationError: element.message,
            })
          );
      }
    );
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  enableLoading() {
    this.loading = true;
  }

  disableLoading() {
    this.loading = false;
  }
}
