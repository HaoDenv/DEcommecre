import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppRoutingApi } from 'src/app/app-routing-api';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService extends BaseService {
  constructor(public http: HttpClient) {
    super(http, AppRoutingApi.Review.Router_Prefix);
  }

  getByOrder(orderDetailId: number) {
    return this.http.get(this.routerPrefix + "/get-by-order/" + orderDetailId);
  }

  updateStatus(id: number, status: number) {
    return this.http.get(this.routerPrefix + "/update-status/" + id, {
      params: {
        status
      }
    });
  }

  review(orderDetailId: number, rate: number, comment: string) {
    return this.http.get(this.routerPrefix + "/review", {
      params: {
        orderDetailId,
        rate,
        comment
      }
    });
  }
}
