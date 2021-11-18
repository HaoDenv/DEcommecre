import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';
import { CustomerService } from 'src/app/core/service/customer.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  currentStep: number = 0;
  nzLoading: boolean = false;
  formMail!: FormGroup;
  formOTP!: FormGroup;
  formData!: FormGroup;

  constructor(
    private customerService: CustomerService,
    private messageService: NzMessageService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formMail = this.formBuilder.group({
      Email: [null, [Validators.email, Validators.required]],
    });
    this.formOTP = this.formBuilder.group({
      OTP: [null, Validators.required],
    });
    this.formData = this.formBuilder.group({
      Email: [{ value: '', disabled: true }, Validators.required],
      OTP: [{ value: '', disabled: true }, Validators.required],
      Password: [null, Validators.required],
      FullName: [null, Validators.required],
      PhoneNumber: [null, Validators.required]
    });
  }

  requestOTP() {
    for (const i in this.formMail.controls) {
      if (this.formMail.controls.hasOwnProperty(i)) {
        this.formMail.controls[i].markAsDirty();
        this.formMail.controls[i].updateValueAndValidity();
      }
    }
    if (this.formMail.invalid) {
      return;
    }

    this.nzLoading = true;
    this.customerService.requestOTP(this.formMail.getRawValue().Email)
      .pipe(
        finalize(() => {
          this.nzLoading = false;
        })
      )
      .subscribe((resp: any) => {
        this.messageService.success("Mã OTP đã được gửi vào hòm thư của bạn.");
        this.currentStep = 1;
      }, (error: any) => {
        this.messageService.error(error.error.message);
      })
  }

  confirmOTP() {
    for (const i in this.formOTP.controls) {
      if (this.formOTP.controls.hasOwnProperty(i)) {
        this.formOTP.controls[i].markAsDirty();
        this.formOTP.controls[i].updateValueAndValidity();
      }
    }
    if (this.formOTP.invalid) {
      return;
    }

    const email = this.formMail.getRawValue().Email;
    const otp = this.formOTP.getRawValue().OTP;
    this.nzLoading = true;
    this.customerService
      .confirmOTP(email, otp)
      .pipe(
        finalize(() => {
          this.nzLoading = false;
        })
      )
      .subscribe((resp: any) => {
        let data: boolean = JSON.parse(resp['data']);
        if (data == true) {
          this.currentStep = 2;
          this.formData.patchValue({
            Email: email,
            OTP: otp
          })
        }
        else {
          this.messageService.error("Mã OTP không đúng.");
        }
      }, (error: any) => {
        this.messageService.error(error.error.message);
      })
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
    this.customerService.post(this.formData.getRawValue())
      .pipe(
        finalize(() => {
          this.nzLoading = false;
        })
      )
      .subscribe((resp: any) => {
        this.messageService.success("Đăng ký thành công");
        this.navigate("/dang-nhap")
      }, (error: any) => {
        this.messageService.error(error.error.message);
      })
  }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigateByUrl(path)).then();
  }
}
