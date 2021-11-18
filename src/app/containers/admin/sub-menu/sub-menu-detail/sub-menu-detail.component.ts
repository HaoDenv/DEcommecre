import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Menu } from 'src/app/core/model/menu';
import { MenuService } from 'src/app/core/service/menu.service';
import { DataHelper } from 'src/app/core/util/data-helper';

@Component({
  selector: 'app-sub-menu-detail',
  templateUrl: './sub-menu-detail.component.html',
  styleUrls: ['./sub-menu-detail.component.css']
})
export class SubMenuDetailComponent implements OnInit {
  @Input() isAddNew: boolean = true;
  @Output() onSubmit = new EventEmitter<Menu>();

  formData!: FormGroup;
  parentMenus: Menu[] = [];
  visible = false;
  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      Id: [0],
      Name: ["", Validators.required],
      Alias: ["", Validators.required],
      Type: ["", Validators.required],
      ParentMenu: [null],
      Index: [1],
      ShowHomePage: [true],
      Active: [true]
    });
  }

  setForm(menu: Menu | any) {
    this.formData.reset();
    this.formData.patchValue(menu);
    this.getParentMenu();
  }

  getParentMenu() {
    this.menuService.getParentSubMenu()
      .subscribe(
        (resp: any) => {
          this.parentMenus = JSON.parse(resp["data"]);
        })
  }

  changeMenuName(e: any) {
    this.formData.patchValue({
      Alias: DataHelper.unsign(this.formData.get("Name")?.value ?? "")
    })
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
}
