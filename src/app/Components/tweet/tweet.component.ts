import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() individualTweet;
  
  constructor() { }

  ngOnInit() {
  }

  getDate(){
    return new Date(this.individualTweet.createdAt).toLocaleString()
  }
}
