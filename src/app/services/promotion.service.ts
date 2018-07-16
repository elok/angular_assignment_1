import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { baseURL } from '../shared/baseURL';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular) { }

  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one('promotions', id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({featured: true})
      .pipe(map(promotions => promotions[0]))
  }

  // constructor(private http: HttpClient) { }
  //
  // getPromotions(): Observable<Promotion[]> {
  //   // return Observable.of(PROMOTIONS).delay(2000);
  //   return this.http.get<Promotion[]>(baseURL + 'promotions');
  // }
  //
  // getPromotion(id: number): Observable<Promotion> {
  //   // return Observable.of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).delay(2000);
  //   return this.http.get<Promotion>(baseURL + 'promotions/' + id);
  // }
  //
  // getFeaturedPromotion(): Observable<Promotion> {
  //   // return Observable.of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).delay(2000);
  //   return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]));
  // }

}
