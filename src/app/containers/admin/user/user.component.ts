import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/service/user.service';
import { UserDetailComponent } from './user-detail/user-detail.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild("frmDetail", { static: true }) frmDetail!: UserDetailComponent

  datas: User[] = [];

  filter = {
    keySearch: ""
  }

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.userService.get(this.filter)
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

  delete(user: User) {
    this.spinner.show();
    this.userService.deleteById(user.UserName)
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
      Active: true
    });
  }

  showDetail(user: User) {
    this.frmDetail.isAddNew = false;
    this.frmDetail.visible = true;
    this.frmDetail.setForm(user);
  }

  onSubmit(user: User) {
    if (this.frmDetail.isAddNew) {
      this.spinner.show();
      this.userService.post(user)
        .pipe(
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe((resp: any) => {
          this.messageService.success("Thêm mới thành công");
          this.getData();
          this.frmDetail.close()
        }, error => {
          this.messageService.error(error.error.message);
        })
    }
    else {
      this.spinner.show();
      this.userService.put(user.UserName, user)
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
