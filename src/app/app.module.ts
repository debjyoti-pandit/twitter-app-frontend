import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  }    from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { TweetComponent } from './Components/tweet/tweet.component';
import { BioComponent } from './Components/bio/bio.component';
import { AddTweetComponent } from './Components/add-tweet/add-tweet.component';
import { FeedsComponent } from './Components/feeds/feeds.component';
import { MyTweetsComponent } from './Components/my-tweets/my-tweets.component';
import { SearchComponent } from './Components/search/search.component';
import { MeComponent } from './Components/me/me.component';
import { OthersComponent } from './Components/others/others.component';
import { ShellComponent } from './Components/shell/shell.component';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { SearchTweetsComponent } from './Components/search-tweets/search-tweets.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    TweetComponent,
    BioComponent,
    AddTweetComponent,
    FeedsComponent,
    MyTweetsComponent,
    SearchComponent,
    MeComponent,
    OthersComponent,
    ShellComponent,
    SearchTweetsComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    AppRoutingModule, ReactiveFormsModule
  ],
  providers: [
    CookieService, 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
