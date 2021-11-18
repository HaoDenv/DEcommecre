import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Gallery } from 'src/app/core/model/gallery';
import { Menu } from 'src/app/core/model/menu';
import { Website } from 'src/app/core/model/website';
import { CartService } from 'src/app/core/service/cart.service';
import { EmailRegistrationService } from 'src/app/core/service/email-registration.service';
import { GalleryService } from 'src/app/core/service/gallery.service';
import { MenuService } from 'src/app/core/service/menu.service';
import { WebsiteService } from 'src/app/core/service/website.service';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements OnInit {
  formRegistration!: FormGroup;
  website!: Website;
  mainMenus: Menu[] = [];
  subMenus: Menu[] = [];
  subBanner: Gallery[] = [];
  keySearch: string = "";

  constructor(
    private websiteService: WebsiteService,
    private galleryService: GalleryService,
    private emailRegistrationService: EmailRegistrationService,
    private menuService: MenuService,
    private cartService: CartService,
    private messageService: NzMessageService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
    this.formRegistration = this.formBuilder.group({
      Email: [null, [Validators.email, Validators.required]],
    });

    this.getWebsiteInfo();
    this.getMainMenuActive();
    this.getSubMenuActive();
    this.getBanner();
  }

  getWebsiteInfo() {
    this.websiteService.get({})
      .subscribe(
        (resp: any) => {
          this.website = JSON.parse(resp["data"]);
        }, (error: any) => {
        })
  }

  getMainMenuActive() {
    this.menuService.getMainMenuActive()
      .subscribe((resp: any) => {
        this.mainMenus = JSON.parse(resp["data"]);
      }, error => {

      })
  }

  getSubMenuActive() {
    this.menuService.getSubMenuActive()
      .subscribe((resp: any) => {
        this.subMenus = JSON.parse(resp["data"]);
      }, error => {

      })
  }

  getBanner() {
    this.galleryService.get({})
      .subscribe((resp: any) => {
        let datas: Gallery[] = JSON.parse(resp["data"]);
        this.subBanner = datas.filter(x => x.Type == 2);
      }, error => {

      })
  }

  get getQtyItemInCart(): number {
    let sum: number = 0;
    this.cartService.getCart().forEach(x => sum += x.Qty);
    return sum;
  }

  submitRegistration() {
    for (const i in this.formRegistration.controls) {
      if (this.formRegistration.controls.hasOwnProperty(i)) {
        this.formRegistration.controls[i].markAsDirty();
        this.formRegistration.controls[i].updateValueAndValidity();
      }
    }
    if (this.formRegistration.invalid) {
      return;
    }

    this.emailRegistrationService.post(this.formRegistration.getRawValue())
      .subscribe((resp: any) => {
        this.messageService.success("Đăng ký thành công.");
        this.formRegistration.reset();
      }, error => {

      })
  }

  search() {
    if (this.keySearch != null && this.keySearch != '') {
      this.navigate("/tim-kiem/" + this.keySearch)
    }
  }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigateByUrl(path)).then();
  }
}
