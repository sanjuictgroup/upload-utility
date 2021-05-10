import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Service } from '../services/service';

@Component({
  selector: 'app-upload-processing',
  templateUrl: './upload-processing.component.html',
  styleUrls: ['./upload-processing.component.css']
})
export class UploadProcessingComponent implements OnInit {

  @ViewChild('myInput')
  myInputVariable: ElementRef;

  uploadForm: FormGroup;  
  status: boolean = false;
  statusUpload: boolean = false;
  statusError: boolean = false;

  constructor(private formBuilder: FormBuilder, private service: Service) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }

  onFileSelect(event) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);
    this.statusUpload = true;
    this.service.saveImage(formData).subscribe(result => {

        if(result.status == 'success'){
          this.myInputVariable.nativeElement.value = "";
          this.uploadForm.reset();
          this.status = true;
          this.statusUpload = false;
          return console.log("Uploaded file.");
        }
        
        this.statusError = true;
        this.statusUpload = false;
        
    });
  }

}
