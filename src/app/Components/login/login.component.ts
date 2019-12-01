import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginForm } from 'src/app/models/loginForm';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment.prod';
import { UserData } from 'src/app/models/userData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  loginError: Boolean = false

  constructor(private httpService: HttpService, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    if(this.loginService.checkLoggedIn()){
      console.log('navigating dirrectly')
      this.router.navigateByUrl('users/me')
    }
  }

  async onSubmit() {
    const { username, password } = this.loginForm.value
    const loginData = new LoginForm(username,password)
    try {
      const data : UserData = await this.httpService.loginUser(loginData)
      this.loginError = false
      // this.loginService.setCookie(data.token)
      this.loginService.setLoginUser(data)
      this.router.navigateByUrl('users/me')
    } catch (e) {
      this.loginError = true
      setTimeout(() => {
        this.loginError = false
      }, 10000)
      
    }
    this.loginForm.reset()
  }

  switchToRegister(){
    this.router.navigateByUrl('register')
  }
  
}
