import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailTemplate } from 'src/app/core/model/email-template';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-email-template-detail',
  templateUrl: './email-template-detail.component.html',
  styleUrls: ['./email-template-detail.component.css']
})
export class EmailTemplateDetailComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<EmailTemplate>();

  formData!: FormGroup;
  visible = false;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '350px',
    minHeight: '5rem',
    placeholder: '',
    translate: 'no',
    defaultParagraphSeparator: 'p'
  };
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      Id: [0],
      Type: [{ value: '', disabled: true }],
      Subject: ["", Validators.required],
      CC: [""],
      BCC: [""],
      KeyGuide: [""],
      Content: [""]
    });
  }

  setForm(emailTemplate: EmailTemplate) {
    this.formData.reset();
    this.formData.patchValue(emailTemplate);
  }

  close() {
    this.visible = false;
  }

  submit() {
    this.onSubmit.emit(this.formData.getRawValue());
  }

}
