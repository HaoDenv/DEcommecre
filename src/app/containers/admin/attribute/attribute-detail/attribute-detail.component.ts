import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Attribute } from 'src/app/core/model/attribute';

@Component({
  selector: 'app-attribute-detail',
  templateUrl: './attribute-detail.component.html',
  styleUrls: ['./attribute-detail.component.css']
})
export class AttributeDetailComponent implements OnInit {
  @Input() isAddNew: boolean = true;
  @Output() onSubmit = new EventEmitter<Attribute>();

  formData!: FormGroup;
  visible = false;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      Id: [0],
      Name: ["", Validators.required]
    });
  }

  setForm(attribute: Attribute | any) {
    this.formData.reset();
    this.formData.patchValue(attribute);
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
