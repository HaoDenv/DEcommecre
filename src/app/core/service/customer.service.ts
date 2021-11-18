import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppRoutingApi } from 'src/app/app-routing-api';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {
  constructor(public http: HttpClient) {
    super(http, AppRoutingApi.Customer.Router_Prefix);
  }

  requestOTP(email: string) {
    return this.http.get(this.routerPrefix + "/request-otp", {
      params: {
        email
      }
    })
  }

  confirmOTP(email: string, otp: string) {
    return this.http.get(this.routerPrefix + "/confirm-otp", {
      params: {
        email,
        otp
      }
    })
  }

  forgotPassword(email: string) {
    return this.http.get(this.routerPrefix + "/forgot-password", {
      params: {
        email
      }
    })
  }

  getProfile() {
    return this.http.get(this.routerPrefix + "/get-profile");
  }

  updateProfile(entity: any) {
    return this.http.put(this.routerPrefix + "/update-profile", entity);
  }

  getOrders() {
    return this.http.get(this.routerPrefix + "/get-orders");
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http.get(this.routerPrefix + "/change-password", {
      params: {
        oldPassword,
        newPassword
      }
    });
  }
}
