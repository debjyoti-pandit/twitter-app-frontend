import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Tweets } from 'src/app/models/tweets';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-my-tweets',
  templateUrl: './my-tweets.component.html',
  styleUrls: ['./my-tweets.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyTweetsComponent implements OnInit {

  previous: Tweets[] = []
  tweets$ = this.httpService.readAllTweets(5, 0)
    .pipe(
      map((tweets) => {
        this.previous = this.previous.concat(tweets)
        return this.previous
      })
    )
  loadMoreBtn: boolean = true
  finished: boolean = true
  private loadCounter: number = 0
  private previousClickValue: number = 0

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.loadCounter = 0
    this.previous = []
    this.finished = true
  }

  load() {
    this.tweets$ = this.httpService.readAllTweets(5, this.loadCounter)
      .pipe(
        map((tweets) => {
          this.previous = this.previous.concat(tweets)
          return this.previous
        })
      )
  }
  loadMore() {
    // console.log('**************************')
    // console.log(this.previous.length)
    // console.log(this.previousClickValue)
    // console.log('**************************')
    if(this.previous.length !== this.previousClickValue){
      this.loadCounter += 5
      this.previousClickValue = this.previous.length
      this.load()
    }else{
      this.finished = false
    }
  }

}
