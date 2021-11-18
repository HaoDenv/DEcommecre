import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppRoutingApi } from 'src/app/app-routing-api';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  constructor(public http: HttpClient) {
    super(http, AppRoutingApi.User.Router_Prefix);
  }

  resetPassword(username: string, newPassword: string) {
    return this.http.get(this.routerPrefix + "/reset-passsword", {
      params: {
        username,
        newPassword
      }
    });
  }
}
