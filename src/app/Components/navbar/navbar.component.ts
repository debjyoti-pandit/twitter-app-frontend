import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private httpService: HttpService) { }

  ngOnInit() {
  }

  async logoutBtn() {
    console.log('logout clicked')
    try {
      await this.httpService.logoutUser()
      this.loginService.logout()
      this.router.navigateByUrl('login')
    } catch (e) {
      console.log(e)
    }
  }
}
