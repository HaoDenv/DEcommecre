import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/core/model/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  @Input() order!: Order;
  @Output() onChangeStatus = new EventEmitter<number>();

  visible = false;
  constructor() { }

  ngOnInit() { }

  setForm(order: Order | any) {
    this.order = order;
  }

  close() {
    this.visible = false;
  }

  get getTotalAmount(): number {
    let total: number = 0;
    if (this.order != null)
      this.order.OrderDetails.forEach(x => {
        total += x.Qty * x.ProductDiscountPrice;
      })

    return total;
  }

  updateStatus(status: number) {
    this.onChangeStatus.emit(status);
  }
}
