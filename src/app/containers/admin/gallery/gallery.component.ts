import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Gallery } from 'src/app/core/model/gallery';
import { Menu } from 'src/app/core/model/menu';
import { GalleryService } from 'src/app/core/service/gallery.service';
import { GalleryDetailComponent } from './gallery-detail/gallery-detail.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  @ViewChild("frmDetail", { static: true }) frmDetail!: GalleryDetailComponent

  datas: Gallery[] = [];

  constructor(
    private galleryService: GalleryService,
    private spinner: NgxSpinnerService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.galleryService.get({})
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

  delete(menu: Menu | any) {
    this.spinner.show();
    this.galleryService.deleteById(menu.Id)
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
    this.frmDetail.visible = true;
    this.frmDetail.setForm({
      Id: 0,
      Type: 1,
      Image: "no_img.jpg"
    });
  }

  onSubmit(gallery: Gallery | any) {
    this.spinner.show();
    this.galleryService.post(gallery)
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
}
