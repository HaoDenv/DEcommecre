import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppRoutingApi } from 'src/app/app-routing-api';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EmailRegistrationService extends BaseService {
  constructor(public http: HttpClient) {
    super(http, AppRoutingApi.EmailRegistration.Router_Prefix);
  }

}
