import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { baseURL } from '../shared/baseURL';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  getFeedback(): Observable<Feedback[]> {
    return this.restangular.all('feedback').getList();
  }

  submitFeedback(feedback): Observable<Feedback> {
    // this.restangular.post()
    return this.restangular.all('feedback').post(feedback);
  }

}
