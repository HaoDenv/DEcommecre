import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User } from 'src/app/core/model/user';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() isAddNew: boolean = true;
  @Output() onSubmit = new EventEmitter<User>();

  user!: User;
  formData!: FormGroup;
  visible = false;
  constructor(
    private userService: UserService,
    private messageService: NzMessageService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      UserName: ["", Validators.required],
      Password: ["", Validators.required],
      FullName: ["", Validators.required],
      Phone: [null],
      Email: [null],
      Active: [true]
    });
  }

  setForm(user: User | any) {
    this.user = user;
    this.formData.reset();
    this.formData.patchValue(user);
    if (this.isAddNew) {
      this.formData.controls['Password']?.setValidators([Validators.required]);
      this.formData.controls['Password']?.updateValueAndValidity();
    }
    else {
      this.formData.controls['Password']?.clearValidators();
      this.formData.controls['Password']?.updateValueAndValidity();
    }
  }

  close() {
    this.visible = false;
  }

  submit() {
    for (const i in this.formData.controls) {
      if (this.formData.controls.hasOwnProperty(i)) {
        this.formData.controls[i].markAsDirty();
        this.formData.controls[i].updateValueAndValidity();
      }
    }
    if (this.formData.invalid) {
      return;
    }

    this.onSubmit.emit(this.formData.getRawValue());
  }

  resetPassword() {
    let newPassword = prompt("Mật khẩu mới:", "");
    if (newPassword != null && newPassword != "") {
      this.userService.resetPassword(this.user.UserName, newPassword)
        .subscribe((resp: any) => {
          this.messageService.success("Cập nhật thành công");
        }, error => {

        })
    }
  }
}
