import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Menu } from 'src/app/core/model/menu';
import { MenuService } from 'src/app/core/service/menu.service';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild("frmDetail", { static: true }) frmDetail!: MenuDetailComponent

  datas: Menu[] = [];

  filter = {
    keySearch: ""
  }

  constructor(
    private menuService: MenuService,
    private spinner: NgxSpinnerService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.menuService.getMainMenu(this.filter)
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

  delete(menu: Menu) {
    this.spinner.show();
    this.menuService.deleteById(menu.Id)
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
      Active: true,
      Index: 1,
      ShowHomePage: true
    });
  }

  showDetail(menu: Menu) {
    this.frmDetail.isAddNew = false;
    this.frmDetail.visible = true;
    this.frmDetail.setForm(menu);
  }

  onSubmit(menu: Menu) {
    if (this.frmDetail.isAddNew) {
      menu.Group = "main";
      this.spinner.show();
      this.menuService.post(menu)
        .pipe(
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe((resp: any) => {
          this.messageService.success("Thêm mới thành công");
          this.getData();
          this.frmDetail.visible = false;
        }, error => {
          this.messageService.error(error.error.message);
        })
    }
    else {
      this.spinner.show();
      this.menuService.put(menu.Id, menu)
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
}
