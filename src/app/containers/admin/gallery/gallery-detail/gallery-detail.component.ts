import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Gallery } from 'src/app/core/model/gallery';

@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.css']
})
export class GalleryDetailComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Gallery>();

  formData!: FormGroup;
  visible = false;
  srcBanner: string = "no_img.jpg";
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      Id: [0],
      Type: [1, Validators.required],
      Image: [""],
    });
  }

  setForm(gallery: Gallery | any) {
    this.formData.reset();
    this.srcBanner = gallery.Image;
    this.formData.patchValue(gallery);
  }

  onloadBanner(src: string) {
    this.srcBanner = src;
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
