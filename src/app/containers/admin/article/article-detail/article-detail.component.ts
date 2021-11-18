import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Article } from 'src/app/core/model/article';
import { Menu } from 'src/app/core/model/menu';
import { MenuService } from 'src/app/core/service/menu.service';
import { DataHelper } from 'src/app/core/util/data-helper';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  @Input() isAddNew: boolean = true;
  @Output() onSubmit = new EventEmitter<Article>();

  menus: Menu[] = [];
  formData!: FormGroup;
  visible = false;
  srcImage: string = "no_img.jpg";
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '350px',
    minHeight: '5rem',
    placeholder: '',
    translate: 'no',
    defaultParagraphSeparator: 'p',
  };
  constructor(
    private menuService: MenuService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      Id: [0],
      MenuId: [0, Validators.required],
      Title: ["", Validators.required],
      Alias: ["", Validators.required],
      Image: [""],
      Index: [1],
      ShortDescription: [""],
      Description: [""],
      Active: [true]
    });
  }

  setForm(article: Article | any) {
    this.formData.reset();
    this.srcImage = article.Image;
    this.formData.patchValue(article);
    this.getMenu();
  }

  getMenu() {
    this.menuService.getByType(['bai-viet', 'chi-tiet-bai-viet'])
      .subscribe((resp: any) => {
        this.menus = JSON.parse(resp["data"]);
      })

  }

  changeTitle(e: any) {
    this.formData.patchValue({
      Alias: DataHelper.unsign(this.formData.get("Title")?.value ?? "")
    })
  }

  onloadImage(src: string) {
    this.srcImage = src;
    this.formData.get("Image")?.setValue(src);
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
