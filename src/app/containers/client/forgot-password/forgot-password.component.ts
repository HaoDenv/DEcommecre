import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';
import { CustomerService } from 'src/app/core/service/customer.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  formData!: FormGroup;
  nzLoading: boolean = false;

  constructor(
    private customerService: CustomerService,
    private messageService: NzMessageService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      Email: [null, [Validators.email, Validators.required]]
    });
  }

  onSubmit(): void {
    for (const i in this.formData.controls) {
      if (this.formData.controls.hasOwnProperty(i)) {
        this.formData.controls[i].markAsDirty();
        this.formData.controls[i].updateValueAndValidity();
      }
    }
    if (this.formData.invalid) {
      return;
    }

    this.nzLoading = true;
    this.customerService.forgotPassword(this.formData.getRawValue().Email)
      .pipe(
        finalize(() => {
          this.nzLoading = false;
        })
      )
      .subscribe((resp: any) => {
        this.messageService.success("Yêu cầu cấp lại mật khẩu thành công. Vui lòng kiểm tra thông tin tại hòm thư của bạn.");
      }, (error: any) => {
        this.messageService.error(error.error.message);
      })
  }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigateByUrl(path)).then();
  }
}
