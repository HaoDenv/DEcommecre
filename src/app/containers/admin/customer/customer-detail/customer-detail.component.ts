import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/core/model/customer';
import { Order } from 'src/app/core/model/order';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  customer!: Customer;
  visible = false;
  isVisibleModal = false;
  orderSelected!: Order;
  constructor() { }

  ngOnInit() { }

  setForm(customer: Customer | any) {
    this.customer = customer;
  }

  close() {
    this.visible = false;
  }

  showOrderDetail(order: Order) {
    this.orderSelected = order;
    this.isVisibleModal = true;
  }

  get getTotalAmount(): number {
    let total: number = 0;
    if (this.orderSelected != null)
      this.orderSelected.OrderDetails.forEach(x => {
        total += x.Qty * x.ProductDiscountPrice;
      })

    return total;
  }
}
