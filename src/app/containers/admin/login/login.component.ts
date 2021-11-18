import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationAdminService } from '../auth/authentication-admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData!: FormGroup;

  constructor(
    private authenticationAdminService: AuthenticationAdminService,
    private messageService: NzMessageService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      UserName: ["", Validators.required],
      Password: ["", Validators.required],
      Remember: [true]
    });
  }

  onSubmit() {
    for (const i in this.formData.controls) {
      if (this.formData.controls.hasOwnProperty(i)) {
        this.formData.controls[i].markAsDirty();
        this.formData.controls[i].updateValueAndValidity();
      }
    }
    if (this.formData.invalid) {
      return;
    }

    this.authenticationAdminService
      .login(this.formData.getRawValue())
      .subscribe(
        (data) => {
          this.messageService.success("Đăng nhập thành công");
          this.navigate("/admin")
        },
        (error) => {
          this.messageService.error(error.error.message);
        }
      );
  }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigateByUrl(path)).then();
  }

}
