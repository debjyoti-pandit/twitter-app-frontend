import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './Components/register/register.component';
import { FeedsComponent } from './Components/feeds/feeds.component';
import { MyTweetsComponent } from './Components/my-tweets/my-tweets.component';
import { SearchComponent } from './Components/search/search.component';
import { MeComponent } from './Components/me/me.component';
import { OthersComponent } from './Components/others/others.component';
import { ShellComponent } from './Components/shell/shell.component';
import { DataResolverService } from './services/data-resolver.service';
import { SearchTweetsComponent } from './Components/search-tweets/search-tweets.component';


const routes: Routes = [{
  path: '',
  component: LoginComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'users',
  component: ShellComponent,
  canActivate: [AuthGuard],
  children: [{
      path: 'me',
      component: MeComponent,
      children: [{
          path: 'feeds',
          component: FeedsComponent
        },{
          path: 'myTweets',
          component: MyTweetsComponent
        },{
          path: 'search',
          component: SearchComponent
        },{
          path: 'searchTweet',
          component: SearchTweetsComponent
        }
      ]
    },{
      path: 'others/:id',
      resolve: { others: DataResolverService },
      component: OthersComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
