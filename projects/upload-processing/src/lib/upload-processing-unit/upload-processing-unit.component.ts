import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { UploadProcessingService } from '../upload-processing.service';

@Component({
  selector: 'lib-upload-processing-unit',
  templateUrl: './upload-processing-unit.component.html',
  styleUrls: ['./upload-processing-unit.component.css']
})

export class UploadProcessingUnitComponent implements OnInit {

  @ViewChild('myInput')
  myInputVariable: ElementRef;

  uploadForm: FormGroup;  
  status: boolean = false;
  public statusUpload: boolean = false;
  constructor(private formBuilder: FormBuilder, private service: UploadProcessingService) { }

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
    this.service.saveImage(formData).subscribe(result=>{
       this.myInputVariable.nativeElement.value = "";
       this.uploadForm.reset();
        this.status = true;
        this.statusUpload = false;
    });


  }

}

