import { Component, OnInit } from '@angular/core';
import { PersonalData } from 'src/app/models/personalData';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { Tweets } from 'src/app/models/tweets';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {

  otherProfile: PersonalData  

  constructor(private route: ActivatedRoute, private router: Router, private httpService: HttpService) { }

  ngOnInit() {
    this.otherProfile = this.route.snapshot.data['others']
  }

}
