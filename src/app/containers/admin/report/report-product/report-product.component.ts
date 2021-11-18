import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Order } from 'src/app/core/model/order';
import { Product } from 'src/app/core/model/product';
import { OrderService } from 'src/app/core/service/order.service';
import { ReportService } from 'src/app/core/service/report.service';

@Component({
  selector: 'app-report-product',
  templateUrl: './report-product.component.html',
  styleUrls: ['./report-product.component.css']
})
export class ReportProductComponent implements OnInit {
  datas: Product[] = [];

  filter = {
    keySearch: "",
    rangeDate: []
  }

  constructor(
    private reportService: ReportService,
    private spinner: NgxSpinnerService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    let fDate: string = "";
    let tDate: string = "";

    if (this.filter.rangeDate != null && this.filter.rangeDate.length == 2) {
      fDate = moment(new Date(this.filter.rangeDate[0])).format("YYYY-MM-DDTHH:mm:ss")
      tDate = moment(new Date(this.filter.rangeDate[1])).format("YYYY-MM-DDTHH:mm:ss")
    }

    this.spinner.show();
    this.reportService.getProductReport({
      keySearch: this.filter.keySearch,
      fDate,
      tDate
    })
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((resp: any) => {
        this.datas = JSON.parse(resp["data"]);
      }, error => {
        this.messageService.error(error.error.message);
      })
  }
}
