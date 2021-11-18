import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Product } from 'src/app/core/model/product';
import { CartService } from 'src/app/core/service/cart.service';

@Component({
  selector: 'app-product-template',
  templateUrl: './product-template.component.html',
  styleUrls: ['./product-template.component.css']
})
export class ProductTemplateComponent implements OnInit {
  @Input() product!: Product
  constructor(
    private messageService: NzMessageService,
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  addToCart() {
    if (this.product.Attributes != null) {
      this.product.Attributes.forEach(x => {
        if (x.ProductAttributes.length > 0)
          x.ProductAttributes[0].Checked = true;
      })
    }
    this.messageService.success(`Đã thêm ${this.product.Name} vào giỏ hàng`);
    this.cartService.addProductToCart(this.product);
  }
}
