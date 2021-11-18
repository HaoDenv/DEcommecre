import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { AppRoutingApi } from 'src/app/app-routing-api';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(public http: HttpClient) { }

  getGeneralReport(filter: {}) {
    return this.http.get(AppRoutingApi.Report.Router_Prefix + "/general", { params: filter });
  }

  getProductReport(filter: {}) {
    return this.http.get(AppRoutingApi.Report.Router_Prefix + "/product-report", { params: filter });
  }

  getHighlight(date?: Date) {
    return this.http.get(AppRoutingApi.Report.Router_Prefix + "/highlight", {
      params: {
        date: moment(new Date(date ?? new Date())).format("YYYY-MM-DDTHH:mm:ss") ?? ""
      }
    });
  }

  getRevenue(date?: Date) {
    return this.http.get(AppRoutingApi.Report.Router_Prefix + "/revenue", {
      params: {
        date: moment(new Date(date ?? new Date())).format("YYYY-MM-DDTHH:mm:ss") ?? ""
      }
    });
  }
}
