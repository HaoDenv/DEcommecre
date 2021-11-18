import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppRoutingApi } from 'src/app/app-routing-api';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService extends BaseService {
  constructor(public http: HttpClient) {
    super(http, AppRoutingApi.Gallery.Router_Prefix);
  }

}
