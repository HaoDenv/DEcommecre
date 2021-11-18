import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { EmailTemplate } from 'src/app/core/model/email-template';
import { EmailTemplateService } from 'src/app/core/service/email-template.service';
import { EmailTemplateDetailComponent } from './email-template-detail/email-template-detail.component';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.css']
})
export class EmailTemplateComponent implements OnInit {
  @ViewChild("frmDetail", { static: true }) frmDetail!: EmailTemplateDetailComponent

  datas: EmailTemplate[] = [];

  filter = {
    keySearch: ""
  }

  constructor(
    private emailTemplateService: EmailTemplateService,
    private spinner: NgxSpinnerService,
    private messageService: NzMessageService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.emailTemplateService.get(this.filter)
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

  showDetail(emailTemplate: EmailTemplate) {
    this.spinner.show();
    this.emailTemplateService.getById(emailTemplate.Id)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((resp: any) => {
        this.frmDetail.visible = true;
        this.frmDetail.setForm(JSON.parse(resp['data']));
      }, error => {
        this.messageService.error(error.error.message);
      })
  }

  onSubmit(emailTemplate: EmailTemplate) {
    this.spinner.show();
    this.emailTemplateService.put(emailTemplate.Id, emailTemplate)
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
