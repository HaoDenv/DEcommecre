import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Article } from 'src/app/core/model/article';
import { ArticleService } from 'src/app/core/service/article.service';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @ViewChild("frmDetail", { static: true }) frmDetail!: ArticleDetailComponent

  datas: Article[] = [];

  filter = {
    keySearch: ""
  }

  constructor(
    private articleService: ArticleService,
    private spinner: NgxSpinnerService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.articleService.get(this.filter)
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

  delete(article: Article) {
    this.spinner.show();
    this.articleService.deleteById(article.Id)
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
      Active: true
    });
  }

  showDetail(article: Article) {
    this.spinner.show();
    this.articleService.getById(article.Id)
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

  onSubmit(article: Article) {
    if (this.frmDetail.isAddNew) {
      this.spinner.show();
      this.articleService.post(article)
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
      this.articleService.put(article.Id, article)
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
