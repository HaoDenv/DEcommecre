import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppRoutingApi } from 'src/app/app-routing-api';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {
  constructor(public http: HttpClient) {
    super(http, AppRoutingApi.Product.Router_Prefix);
  }

  search(keySearch: string, orderBy: string, price: string, take: number) {
    return this.http.get(this.routerPrefix + "/search", {
      params: {
        keySearch,
        take,
        orderBy,
        price
      }
    });
  }

  getAll() {
    return this.http.get(this.routerPrefix + "/get-all");
  }

  getSelling() {
    return this.http.get(this.routerPrefix + "/get-product-selling");
  }

  getByMenu(menuAlias: string, orderBy: string, price: string, take: number) {
    return this.http.get(this.routerPrefix + "/get-by-menu", {
      params: {
        menuAlias,
        orderBy,
        price,
        take
      }
    });
  }

  getByAlias(alias: string) {
    return this.http.get(this.routerPrefix + "/get-by-alias", {
      params: {
        alias
      }
    });
  }
}
