import { NgModule } from '@angular/core';
import { UploadProcessingComponent } from './upload-processing.component';
import { UploadProcessingUnitComponent } from './upload-processing-unit/upload-processing-unit.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    UploadProcessingComponent,
    UploadProcessingUnitComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    UploadProcessingComponent,
    UploadProcessingUnitComponent
  ]
})
export class UploadProcessingModule { }