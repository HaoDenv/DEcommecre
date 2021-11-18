import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppRoutingApi } from 'src/app/app-routing-api';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends BaseService {
  constructor(public http: HttpClient) {
    super(http, AppRoutingApi.Article.Router_Prefix);
  }

  getHighlight() {
    return this.http.get(this.routerPrefix + "/get-highlight")
  }

  getByMenu(menuAlias: string, take: number) {
    return this.http.get(this.routerPrefix + "/get-by-menu", {
      params: {
        menuAlias,
        take
      }
    })
  }

  getByAlias(alias: string) {
    return this.http.get(this.routerPrefix + "/get-by-alias/" + alias)
  }
}
