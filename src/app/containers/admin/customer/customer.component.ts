import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Customer } from 'src/app/core/model/customer';
import { CustomerService } from 'src/app/core/service/customer.service';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @ViewChild("frmDetail", { static: true }) frmDetail!: CustomerDetailComponent

  datas: Customer[] = [];

  filter = {
    keySearch: ""
  }

  constructor(
    private customerService: CustomerService,
    private spinner: NgxSpinnerService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.customerService.get(this.filter)
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

  showDetail(customer: Customer) {
    this.spinner.show();
    this.customerService.getById(customer.Code)
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
}
