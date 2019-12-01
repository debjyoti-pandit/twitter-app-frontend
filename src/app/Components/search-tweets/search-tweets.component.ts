import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-search-tweets',
  templateUrl: './search-tweets.component.html',
  styleUrls: ['./search-tweets.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTweetsComponent implements OnInit {

  queryField: FormControl = new FormControl('');

  change$ = this.queryField.valueChanges
    .pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((query: string) => {
        const a = query.trim()
        if (a.length >= 4) {
          if (a.substr(0, 1) === "#" ) {
            return this.httpService.searchTweetByHasTag(a.substr(1,a.length-1))
          } else {
            return this.httpService.searchTweet(a)
          }
        }
        return []
      }),
    )

  constructor(private httpService: HttpService) { }

  ngOnInit() { }

}
