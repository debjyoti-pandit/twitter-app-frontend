import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment.prod'
import { LoginForm } from '../models/loginForm';
import { UserData } from '../models/userData';
import { RegisterForm } from '../models/registerFrom';
import { PersonalData } from '../models/personalData';
import { Observable, combineLatest } from 'rxjs';
import { Tweets } from '../models/tweets';
import { map } from 'rxjs/operators';
import { Followings } from '../models/followings';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  connectionURL = environment.connectionURL

  personalData$ = this.http.get<PersonalData>(this.connectionURL + "users/me")

  readAllTweets$ = this.http.get<Tweets[]>(this.connectionURL + "tweets")

  getFeed$ = this.http.get<Tweets[]>(this.connectionURL + "me/feeds")

  getAllFollowing$ = this.http.get<Followings[]>(this.connectionURL + "me/followings")

  getMyFollower$ = this.http.get<Qwerty>(this.connectionURL + "me/followers")

  myDetailsAppendedWithFollowers$ = combineLatest(
    this.personalData$,
    this.getAllFollowing$,
    this.getMyFollower$
  ).pipe(
    map(([PersonalData, Followings, Qwerty]) => {
      const obj = { ...PersonalData }
      obj['followingCount'] = Followings.length
      obj['followersCount'] = Qwerty.followers
      return obj
    })
  )

  constructor(private http: HttpClient) { }

  async loginUser(loginForm: LoginForm) {
    return await this.http.post<UserData>(this.connectionURL + "users/login", loginForm).toPromise()
  }

  async logoutUser() {
    return await this.http.post<any>(this.connectionURL + "users/logout", undefined).toPromise()
  }

  chechUsername(username: string) {
    return this.http.post<string>(this.connectionURL + "checkUserNameTaken", { username })
  }

  checkEmailAddress(email: string) {
    return this.http.post<string>(this.connectionURL + "checkUserNameTaken", { email })
  }

  async registerUser(registerForm: RegisterForm) {
    return await this.http.post<UserData>(this.connectionURL + "createUser", registerForm).toPromise()
  }

  async addTweet(tweet: string, hasTags: string[]) {
    return await this.http.post<any>(this.connectionURL + "addTweet", { tweet, hasTags }).toPromise()
  }

  async followUser(userID: string) {
    return await this.http.post<boolean>(this.connectionURL + 'users/follow', { userID }).pipe(map(() => true)).toPromise()
  }

  async deleteFollowUser(userID: string) {
    return await this.http.delete<boolean>(this.connectionURL + 'users/follow/' + userID).pipe(map(() => false)).toPromise()
  }

  readAllTweets(limit: number, skip: number): Observable<Tweets[]> {
    return this.http.get<Tweets[]>(this.connectionURL + "tweets?limit=" + limit + "&skip=" + skip)
  }

  getFeed(limit: number, skip: number): Observable<Tweets[]> {
    return this.http.get<Tweets[]>(this.connectionURL + "me/feeds?limit=" + limit + "&skip=" + skip)
  }

  search(pattern: string): Observable<PersonalData[]> {
    const limit = 10
    return this.http.post<PersonalData[]>(this.connectionURL + "search?limit=" + limit, { pattern })
  }

  searchTweet(pattern: string): Observable<Tweets[]> {
    const limit = 10
    return this.http.post<Tweets[]>(this.connectionURL + "tweet/search?limit=" + limit, { pattern })
  }

  searchTweetByHasTag(pattern: string): Observable<Tweets[]> {
    const limit = 10
    return this.http.post<Tweets[]>(this.connectionURL + "tweet/searchByHasTag?limit=" + limit, { pattern })
  }

  getUserByID(id: string): Observable<PersonalData> {
    return this.http.get<PersonalData>(this.connectionURL + 'users/' + id)
      .pipe(
        map((element) => {
          const obj = { ...element }
          obj['name'] = obj['name'].toUpperCase(),
          obj['self'] = false,
          obj['imageUrl'] = environment.connectionURL + 'users/' + element._id + '/avatar'
          return obj
        })
      )
  }

  getTweetsByUserId(id: string, limit: number, skip: number): Observable<Tweets[]> {
    return this.http.get<Tweets[]>(this.connectionURL + 'tweets/user/' + id + '?limit=' + limit + '&skip=' + skip)
  }

  getCombinedData(id: string): Observable<[PersonalData, Tweets[]]> {
    return combineLatest(
      this.getCombinedData2(id),
      this.getTweetsByUserId(id, 10, 0),
    )
  }

  getAllFollowing(): Observable<Followings[]> {
    return this.http.get<Followings[]>(this.connectionURL + "me/followings")
  }

  getCombinedData2(id: string): Observable<PersonalData> {
    return combineLatest(
      this.getUserByID(id),
      this.getAllFollowing()
    ).pipe(
      map(([PersonalData, Followings]) => ({
        ...PersonalData,
        following: Followings.filter(f => f.otherPersonID === PersonalData._id).length !== 0
      } as PersonalData
      ))
    )
  }

  public uploadImage(image: File){
    const formData = new FormData();
    formData.append('avatar', image);
    return this.http.post( this.connectionURL + 'users/me/avatar', formData).toPromise()
  }
}


class Qwerty {
  followers: number
}