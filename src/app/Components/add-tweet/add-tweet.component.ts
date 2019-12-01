import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-tweet',
  templateUrl: './add-tweet.component.html',
  styleUrls: ['./add-tweet.component.css']
})
export class AddTweetComponent implements OnInit {

  tweetForm = new FormGroup({
    tweet: new FormControl('', Validators.required)
  })
  hasTags : string [] = []

  constructor(private httpService: HttpService, private router: Router, private loginService: LoginService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  async onSubmit(){
//abc #def abc #def#def fgfgff     #sdsds

    const  tweet : string = this.tweetForm.value.tweet
    // console.log(tweet)
    let str = ''
    let add = false
    for(let i=0; i < tweet.trim().length; i += 1){
      if(add) str += tweet.charAt(i)
      if(tweet.charAt(i) === '#' && !add){
        add = true
        if(add) str += tweet.charAt(i)
      }else if(tweet.charAt(i) === ' '){
        add = false
      }
    }
    let hasTags : string[] = []
    str.trim().split('#').filter(e => {
      if(!hasTags.includes(e) && e != "") hasTags.push(e)
    })
    // console.log(hasTags)
    try {
      await this.httpService.addTweet(tweet, hasTags)
      this.tweetForm.reset()
      this.router.navigate(['feeds'], { relativeTo: this.activatedRoute })
    } catch (e) {
      alert('Something went wrong while adding tweet!')      
    }
    
  }

}
