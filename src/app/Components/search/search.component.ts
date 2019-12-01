import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap, shareReplay, map } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { PersonalData } from 'src/app/models/personalData';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  queryField: FormControl = new FormControl('');
  userData: PersonalData[] = []

  change$ = this.queryField.valueChanges
    .pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((query: string) => {
        if (query.trim().length >= 4) {
          return this.httpService.search(query.trim()).pipe(
            // tap(console.log),
            map((element) => 
              element.map(a => {
                const  obj = { ...a }
                obj['imageUrl'] = environment.connectionURL + 'users/' + obj._id + '/avatar'
                return obj
              })
            ),
          )
        }
        return []
      }))
      // .subscribe(s => console.log(s))

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {  }

  changeCase(value: string) {
    return value.toUpperCase()
  }

  slectUser(userId: string) {
    this.router.navigateByUrl('users/others/' + userId)
  }
}
