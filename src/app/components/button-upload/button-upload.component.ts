import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { DataHelper } from "src/app/core/util/data-helper";

@Component({
  selector: "button-upload",
  templateUrl: "./button-upload.component.html",
})
export class ButtonUploadComponent implements OnInit {
  @Input()
  srcDefault: string = 'no_img.jpg';
  @Output()
  onload = new EventEmitter<string>();

  @ViewChild('inpFile', { static: true }) inpFileElement!: ElementRef;
  constructor() { }

  ngOnInit() { }

  chooseFile() {
    this.inpFileElement.nativeElement.click()
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length === 0) {
      this.srcDefault = "";
      return;
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      try {
        var bytes = new Uint8Array(e.target.result);
        this.srcDefault = "data:image/png;base64," + DataHelper.toBase64(bytes);
        this.onload.emit(this.srcDefault);
      } catch (error) {
        alert("Lỗi ảnh");
      }
    };
    reader.readAsArrayBuffer(target.files[0]);
  }
}
