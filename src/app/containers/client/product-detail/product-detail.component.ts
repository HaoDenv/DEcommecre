import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Product } from 'src/app/core/model/product';
import { ProductAttribute } from 'src/app/core/model/product-attribute';
import { CartService } from 'src/app/core/service/cart.service';
import { ProductService } from 'src/app/core/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productAlias: string = ""
  product!: Product;
  qty: number = 1;
  image: string = "./assets/imgs/tivi.png";

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private messageService: NzMessageService,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.productAlias = this.activatedRoute.snapshot.params.alias;
        this.getData();
      }
    });
  }

  ngOnInit() {
    this.productAlias = this.activatedRoute.snapshot.params.alias;
    this.getData();
  }

  getData() {
    this.productService.getByAlias(this.productAlias)
      .subscribe((resp: any) => {
        this.product = JSON.parse(resp["data"])
      }, error => {

      })
  }

  showImg(src: string) {
    this.product.Image = src;
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

  addToCart() {
    if (this.product.Attributes != null && this.product.Attributes.length > 0) {
      if (!(this.product.Attributes.findIndex(x => x.ProductAttributes.findIndex(y => y.Checked) >= 0) >= 0)) {
        this.messageService.error("Chọn ít nhất một thuộc tính sản phẩm")
        return;
      }
    }

    this.messageService.success(`Đã thêm ${this.product.Name} vào giỏ hàng`);
    this.cartService.addProductToCart(this.product);
  }

  buyNow() {
    if (this.product.Attributes != null && this.product.Attributes.length > 0) {
      if (!(this.product.Attributes.findIndex(x => x.ProductAttributes.findIndex(y => y.Checked) >= 0) >= 0)) {
        this.messageService.error("Chọn ít nhất một thuộc tính sản phẩm")
        return;
      }
    }

    this.cartService.addProductToCart(this.product, this.qty);
    this.navigate("/gio-hang");
  }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigateByUrl(path)).then();
  }
}
