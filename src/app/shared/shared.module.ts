import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { ContactInformationComponent } from './components/contactInformation/contactInformation.component';
import { DownloadCvComponent } from './components/download-cv/download-cv.component';

@NgModule({
  declarations: [
    InputComponent,
    ContactInformationComponent,
    DownloadCvComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    InputComponent,
    ContactInformationComponent,
    DownloadCvComponent
  ]
})
export class SharedModule { }
