import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { HttpService } from 'src/app/services/http.service';
import {  map, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  personalData$ = this.httpService.myDetailsAppendedWithFollowers$
  .pipe(
    // tap(console.log),
    shareReplay(),
    map((element) => {
      const obj = { ...element}
      obj['name'] = obj['name'].toUpperCase(),
      obj['self'] = true
      obj['imageUrl'] = environment.connectionURL + 'users/' + element._id + '/avatar'
      return obj
    }),
  )

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit() {
    this.router.navigate(['feeds'], { relativeTo: this.activatedRoute })
  }

}
