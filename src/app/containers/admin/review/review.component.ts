import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Review } from 'src/app/core/model/review';
import { ReviewService } from 'src/app/core/service/review.service';
import { ReviewDetailComponent } from './review-detail/review-detail.component';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @ViewChild("frmDetail", { static: true }) frmDetail!: ReviewDetailComponent

  datas: Review[] = [];

  filter = {
    keySearch: "",
    status: null
  }

  constructor(
    private reviewService: ReviewService,
    private spinner: NgxSpinnerService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.reviewService.get({
      keySearch: this.filter.keySearch,
      status: this.filter.status ?? -1,
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

  showDetail(review: Review) {
    this.frmDetail.visible = true;
    this.frmDetail.setForm(review);
  }

  onSubmit(review: Review) {
    this.spinner.show();
    this.reviewService.updateStatus(review.Id ?? 0, review.Status)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((resp: any) => {
        this.messageService.success("Cập nhật thành công");
        this.getData();
        this.frmDetail.visible = false;
      }, error => {
        this.messageService.error(error.error.message);
      })
  }
}
