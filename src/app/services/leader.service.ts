import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { baseURL } from '../shared/baseURL';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }

  getLeaders(): Observable<Leader[]> {
    // return Observable.of(LEADERS).delay(2000);
    return this.http.get<Leader[]>(baseURL + 'leaders');
  }

  getFeaturedLeader(): Observable<Leader> {
    // return Observable.of(LEADERS.filter((leader) => leader.featured)[0]).delay(2000);
    return this.http.get<Leader[]>(baseURL + 'leaders?featured=true').pipe(map(leaders => leaders[0]));
  }

}
