import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Order } from 'src/app/core/model/order';
import { OrderService } from 'src/app/core/service/order.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @ViewChild("frmDetail", { static: true }) frmDetail!: OrderDetailComponent
  datas: Order[] = [];
  orderSelected!: Order;

  filter = {
    keySearch: "",
    status: null,
    rangeDate: []
  }

  constructor(
    private orderService: OrderService,
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
    this.orderService.get({
      keySearch: this.filter.keySearch,
      status: this.filter.status ?? -1,
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

  showOrderDetail(order: Order) {
    this.orderSelected = order;
    this.spinner.show();
    this.orderService.getById(order.Id)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((resp: any) => {
        this.frmDetail.visible = true;
        this.frmDetail.setForm(JSON.parse(resp['data']));
      }, error => {
        this.messageService.error(error.error.message);
      })
  }

  onChangeStatus(status: number) {
    this.spinner.show();
    this.orderService.changeStatus(this.orderSelected.Id, status)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((resp: any) => {
        this.messageService.success("Cập nhật thành công");
        this.showOrderDetail(this.orderSelected);
        this.getData();
      }, error => {
        this.messageService.error(error.error.message);
      })
  }
}
