import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Order } from 'src/app/core/model/order';
import { OrderDetail } from 'src/app/core/model/order-detail';
import { Review } from 'src/app/core/model/review';
import { ReviewService } from 'src/app/core/service/review.service';

@Component({
  selector: 'app-order-template',
  templateUrl: './order-template.component.html',
  styleUrls: ['./order-template.component.css']
})
export class OrderTemplateComponent implements OnInit {
  @Input() order!: Order;

  orderDetailSelected!: OrderDetail;
  isVisibleModal: boolean = false;
  tooltips = ['Rất không hài lòng', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Rất hài lòng'];
  reviewModel!: Review;

  constructor(
    private reivewService: ReviewService,
    private messageService: NzMessageService,
  ) { }

  ngOnInit(): void {
  }

  get getTotalAmount(): number {
    let total: number = 0;
    this.order.OrderDetails.forEach(x => {
      total += x.Qty * x.ProductDiscountPrice;
    })

    return total;
  }

  review(orderDetail: OrderDetail) {
    this.orderDetailSelected = orderDetail;
    this.reivewService.getByOrder(this.orderDetailSelected.Id ?? 0)
      .subscribe((resp: any) => {
        let data: Review = JSON.parse(resp["data"]);
        if (data == null) {
          this.reviewModel = {
            Content: "",
            Star: 0,
            Status: -1
          };
        }
        else {
          this.reviewModel = data;
        }
        this.isVisibleModal = true;
      }, (error: any) => {
        this.messageService.error(error.error.message);
      })

  }

  confirmReview() {
    this.reivewService.review(this.orderDetailSelected.Id ?? 0, this.reviewModel.Star, this.reviewModel.Content)
      .subscribe((resp: any) => {
        this.messageService.success("Thành công");
        this.isVisibleModal = false;
        this.orderDetailSelected.IsReview = true;
      }, (error: any) => {
        this.messageService.error(error.error.message);
      })
  }
}
