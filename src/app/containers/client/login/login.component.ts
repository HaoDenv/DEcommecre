import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData!: FormGroup;
  submitted: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private messageService: NzMessageService,
    private ngZone: NgZone,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      Email: [null, [Validators.email, Validators.required]],
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

    this.authenticationService.login(this.formData.getRawValue())
      .subscribe((resp: any) => {
        this.messageService.success("Đăng nhập thành công");
        this.navigate("/");
      }, (error: any) => {
        this.messageService.error(error.error.message);
      })
  }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigateByUrl(path)).then();
  }

}
