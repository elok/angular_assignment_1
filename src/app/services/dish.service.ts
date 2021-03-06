import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseURL';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private restangular: Restangular) { }

  getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
    return  this.restangular.one('dishes', id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({featured: true})
      .pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish.id)),
        catchError(error => error ));
  }

  // constructor(private http: HttpClient,
  //   private processHTTPMsgService: ProcessHTTPMsgService) { }
  //
  // getDishes(): Observable<Dish[]> {
  //   return this.http.get<Dish[]>(baseURL + 'dishes')
  //     .pipe(catchError(this.processHTTPMsgService.handleError));
  // }
  //
  // getDish(id: number): Observable<Dish> {
  //   return this.http.get<Dish>(baseURL + 'dishes/' + id)
  //     .pipe(catchError(this.processHTTPMsgService.handleError));
  // }
  //
  // getFeaturedDish(): Observable<Dish> {
  //   return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
  //     .pipe(catchError(this.processHTTPMsgService.handleError));
  // }
  //
  // getDishIds(): Observable<number[] | any> {
  //   return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
  //     .pipe(catchError(error => error));
  // }
}
