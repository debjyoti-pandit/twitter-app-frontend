import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { map } from 'rxjs/operators';
import { Tweets } from 'src/app/models/tweets';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedsComponent implements OnInit {

  previous: Tweets[] = []
  finished: boolean = true
  tweets$ = this.httpService.getFeed(5, 0)
    .pipe(
      map((tweets) => {
        this.previous = this.previous.concat(tweets)
        return this.previous
      })
    )
  private loadCounter: number = 0
  private previousClickValue: number = 0

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.finished = true
  }

  loadMore() {
    // console.log('**************************')
    // console.log(this.previous.length)
    // console.log(this.previousClickValue)
    // console.log('**************************')
    if(this.previous.length !== this.previousClickValue){
      this.loadCounter += 5
      this.previousClickValue = this.previous.length
      this.tweets$ = this.httpService.getFeed(5, this.loadCounter)
      .pipe(
        map((tweets) => {
          this.previous = this.previous.concat(tweets)
          return this.previous
        })
      )
    }else{
      this.finished = false
    }
  }
}
