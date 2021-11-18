import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';
import { OrderDetail } from 'src/app/core/model/order-detail';
import { ProductAttribute } from 'src/app/core/model/product-attribute';
import { CartService } from 'src/app/core/service/cart.service';
import { CustomerService } from 'src/app/core/service/customer.service';
import { OrderService } from 'src/app/core/service/order.service';
import { DataHelper } from 'src/app/core/util/data-helper';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  formData!: FormGroup;
  orderDetail: OrderDetail[] = [];
  nzLoading: boolean = false;

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService,
    private cartService: CartService,
    private messageService: NzMessageService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      FullName: [{ value: '', disabled: true }, Validators.required],
      PhoneNumber: [null, Validators.required],
      Address: [null, Validators.required],
      Note: [null]
    });
    this.getCart();
    this.getProfile();
  }

  getProfile() {
    this.customerService.getProfile()
      .subscribe((resp: any) => {
        let profile = JSON.parse(resp["data"]);
        this.formData.patchValue(profile)
      }, error => {

      })
  }

  getCart() {
    this.orderDetail = this.cartService.getCart();
  }

  get getTotalAmount(): number {
    let total: number = 0;
    this.orderDetail.forEach(x => {
      total += x.Qty * x.ProductDiscountPrice;
    })

    return total;
  }

  updateCart() {
    this.orderDetail = this.orderDetail.filter(x => x.Qty > 0);
    this.cartService.updateCart(this.orderDetail);
  }

  chooseAttribute(attributes: ProductAttribute[], index: number) {
    for (let i = 0; i < attributes.length; i++) {
      if (i == index) {
        if (attributes[i].Checked == true)
          attributes[i].Checked = false;
        else
          attributes[i].Checked = true;
      }
      else
        attributes[i].Checked = false;
    }
  }

  submitForm(): void {
    for (const i in this.formData.controls) {
      if (this.formData.controls.hasOwnProperty(i)) {
        this.formData.controls[i].markAsDirty();
        this.formData.controls[i].updateValueAndValidity();
      }
    }
    if (this.formData.invalid) {
      return;
    }

    let orderDetailPost: OrderDetail[] = DataHelper.clone(this.orderDetail);
    orderDetailPost.forEach(x => {
      x.Attribute = "";
      if (x.Attributes != null && x.Attributes.length > 0) {
        x.Attributes.forEach(y => {
          x.Attribute += ('<b>' + y.Name + "</b>: " + y.ProductAttributes.find(z => z.Checked == true)?.Value + "<br>");
        })
      }
      x.Attributes = [];
    });

    this.nzLoading = true;
    this.orderService.post({
      Customer: this.formData.getRawValue(),
      OrderDetails: orderDetailPost
    })
      .pipe(
        finalize(() => {
          this.nzLoading = false;
        })
      )
      .subscribe((resp: any) => {
        this.cartService.clearCart();
        this.navigate("/dat-hang-thanh-cong");
      }, (error: any) => {
        this.messageService.error(error.error.message);
      })
  }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigateByUrl(path)).then();
  }
}
