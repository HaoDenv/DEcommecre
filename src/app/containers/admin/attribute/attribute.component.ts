import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Attribute } from 'src/app/core/model/attribute';
import { AttributeService } from 'src/app/core/service/attribule.service';
import { AttributeDetailComponent } from './attribute-detail/attribute-detail.component';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {
  @ViewChild("frmDetail", { static: true }) frmDetail!: AttributeDetailComponent

  datas: Attribute[] = [];

  filter = {
    keySearch: ""
  }

  constructor(
    private attributeService: AttributeService,
    private spinner: NgxSpinnerService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.attributeService.get(this.filter)
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

  delete(attribute: Attribute) {
    this.spinner.show();
    this.attributeService.deleteById(attribute.Id)
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
      Id: 0
    });
  }

  showDetail(attribute: Attribute) {
    this.frmDetail.isAddNew = false;
    this.frmDetail.visible = true;
    this.frmDetail.setForm(attribute);
  }

  onSubmit(attribute: Attribute) {
    if (this.frmDetail.isAddNew) {
      this.spinner.show();
      this.attributeService.post(attribute)
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
      this.attributeService.put(attribute.Id, attribute)
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
