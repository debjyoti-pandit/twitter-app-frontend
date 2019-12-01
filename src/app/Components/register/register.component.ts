import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { map } from 'rxjs/operators';
import { RegisterForm } from 'src/app/models/registerFrom';
import { UserData } from 'src/app/models/userData';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(7)],
      asyncValidators: this.usernameNotTaken.bind(this)
    }),
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', {
      validators: Validators.required,
      updateOn: 'blur',
      asyncValidators: this.emailNotTaken.bind(this)
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7)
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(7)
    ])
  })

  constructor(private router: Router, private httpService: HttpService, private loginService: LoginService) { }

  ngOnInit() {
  }

  switchToLogin() {
    this.router.navigateByUrl('login')
  }

  async onRegister() {
    if (this.registerForm.get('password').value === this.registerForm.get('confirmPassword').value) {
      try {
        const { username, password, email, name } = this.registerForm.value
        const registerData = new RegisterForm(username, password, name, email)
        const userData : UserData = await  this.httpService.registerUser(registerData)
        this.loginService.setCookie(userData.token)
        this.router.navigateByUrl('users/me')
      } catch (e) {
        console.log(e)
        alert('Something went wrong while creating user.')
      }
    } else {
      alert('Password and Confirm Password has to same.')
    }
  }

  usernameNotTaken(control: AbstractControl) {
    return this.httpService.chechUsername(control.value).pipe(
      map(res => {
        return res ? { usernameTaken: true } : null;
      })
    )
  }

  emailNotTaken(control: AbstractControl) {
    return this.httpService.checkEmailAddress(control.value).pipe(
      map(res => {
        return res ? { emailTaken: true } : null;
      })
    )
  }
}
