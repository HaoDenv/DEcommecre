import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';
import { Customer } from 'src/app/core/model/customer';
import { Order } from 'src/app/core/model/order';
import { CustomerService } from 'src/app/core/service/customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  formData!: FormGroup;
  formChangePassword!: FormGroup;
  profile!: Customer;
  nzLoading: boolean = false;
  orders: Order[] = [];

  constructor(
    private customerService: CustomerService,
    private messageService: NzMessageService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      Code: [{ value: '', disabled: true }, Validators.required],
      Email: [{ value: '', disabled: true }, Validators.required],
      FullName: [null, Validators.required],
      PhoneNumber: [null, Validators.required],
      Address: [null, Validators.required],
      Dob: [null],
      Gender: [null],
      timePicker: [null]
    });
    this.formChangePassword = this.formBuilder.group({
      OldPassword: [null, Validators.required],
      NewPassword: [null, Validators.required]
    });
    this.getProfile();
    this.getOrders();
  }

  getProfile() {
    this.customerService.getProfile()
      .subscribe((resp: any) => {
        this.profile = JSON.parse(resp["data"]);
        this.formData.patchValue(this.profile)
      }, error => {

      })
  }

  getOrders() {
    this.customerService.getOrders()
      .subscribe((resp: any) => {
        this.orders = JSON.parse(resp["data"]);
      }, error => {

      })
  }

  filterOrderByStatus(status: number): Order[] {
    return this.orders.filter(x => x.Status == status);
  }

  submitForm(): void {
    for (const i in this.formData.controls) {
      if (this.formData.controls.hasOwnProperty(i)) {
        this.formData.controls[i].markAsDirty();
        this.formData.controls[i].updateValueAndValidity();
      }
    }
    if (this.formData.invalid) {
      return;
    }

    let dataPost = this.formData.getRawValue();
    if (dataPost.Dob != null)
      dataPost.Dob = moment(new Date(dataPost.Dob)).format("YYYY-MM-DDTHH:mm:ss")

    this.nzLoading = true;
    this.customerService.updateProfile(dataPost)
      .pipe(
        finalize(() => {
          this.nzLoading = false;
        })
      )
      .subscribe((resp: any) => {
        this.messageService.success("Cập nhật thành công");
        this.getProfile();
      }, (error: any) => {
        this.messageService.error(error.error.message);
      })
  }

  submitChangePassword(): void {
    for (const i in this.formChangePassword.controls) {
      if (this.formChangePassword.controls.hasOwnProperty(i)) {
        this.formChangePassword.controls[i].markAsDirty();
        this.formChangePassword.controls[i].updateValueAndValidity();
      }
    }
    if (this.formChangePassword.invalid) {
      return;
    }

    const dataPost = this.formChangePassword.getRawValue();

    this.nzLoading = true;
    this.customerService.changePassword(dataPost["OldPassword"], dataPost["NewPassword"])
      .pipe(
        finalize(() => {
          this.nzLoading = false;
        })
      )
      .subscribe((resp: any) => {
        this.messageService.success("Cập nhật thành công");
        this.formChangePassword.reset();
      }, (error: any) => {
        this.messageService.error(error.error.message);
      })
  }
}
