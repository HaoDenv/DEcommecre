import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Menu } from 'src/app/core/model/menu';
import { Product } from 'src/app/core/model/product';
import { MenuService } from 'src/app/core/service/menu.service';
import { ProductService } from 'src/app/core/service/product.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild("frmDetail", { static: true }) frmDetail!: ProductDetailComponent

  datas: Product[] = [];
  menus: Menu[] = [];

  filter = {
    keySearch: "",
    menuId: null,
  }

  constructor(
    private menuService: MenuService,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.getData();
    this.getMenu();
  }

  getMenu() {
    this.menuService.getByType(['san-pham'])
      .subscribe((resp: any) => {
        this.menus = JSON.parse(resp["data"]);
      })
  }

  getData() {
    this.spinner.show();
    this.productService.get({
      keySearch: this.filter.keySearch,
      menuId: this.filter.menuId ?? ""
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

  delete(product: Product) {
    this.spinner.show();
    this.productService.deleteById(product.Id)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((resp: any) => {
        this.messageService.success("Xóa thành công");
        this.getData();
      }, error => {
        this.messageService.error(error.error.message);
      })
  }

  addNew() {
    this.frmDetail.isAddNew = true;
    this.frmDetail.visible = true;
    this.frmDetail.setForm({
      Id: 0,
      Index: 1,
      Status: 10,
      Selling: true,
      Price: 0,
      DiscountPrice: 0,
    });
  }

  showDetail(product: Product) {
    this.spinner.show();
    this.productService.getById(product.Id)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((resp: any) => {
        this.frmDetail.isAddNew = false;
        this.frmDetail.visible = true;
        this.frmDetail.setForm(JSON.parse(resp['data']));
      }, error => {
        this.messageService.error(error.error.message);
      })
  }

  onSubmit(product: Product) {
    if (this.frmDetail.isAddNew) {
      this.spinner.show();
      this.productService.post(product)
        .pipe(
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe((resp: any) => {
          this.messageService.success("Thêm mới thành công");
          this.frmDetail.visible = false;
          this.getData();
        }, error => {
          this.messageService.error(error.error.message);
        })
    }
    else {
      this.spinner.show();
      this.productService.put(product.Id, product)
        .pipe(
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe((resp: any) => {
          this.messageService.success("Cập nhật thành công");
          this.frmDetail.visible = false;
          this.getData();
        }, error => {
          this.messageService.error(error.error.message);
        })
    }

  }
}
