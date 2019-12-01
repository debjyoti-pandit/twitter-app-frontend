import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PersonalData } from '../models/personalData';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Tweets } from '../models/tweets';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<[PersonalData, Tweets[]]>  {

  constructor(private httpSErvice: HttpService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): [PersonalData, Tweets[]] | Observable<[PersonalData, Tweets[]]> | Promise<[PersonalData, Tweets[]]> {
    const id = route.paramMap.get('id')
    return this.httpSErvice.getCombinedData(id)
  }

}
