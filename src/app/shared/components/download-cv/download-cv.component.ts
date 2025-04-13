import { Component } from '@angular/core';
import { StorageService } from '../../../firestore/storage.service';

@Component({
  selector: 'app-download-cv',
  templateUrl: './download-cv.component.html',
  styleUrl: './download-cv.component.css',
  standalone: false
})
export class DownloadCvComponent {

  constructor(
    private storageService: StorageService
  ) { }

  async downloadPDF() {
    const fileUrl = await this.storageService.getFileUrl('portfolio/cv/cv_max_poblete.pdf');
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';
    const fecha = new Date().toISOString().split('T')[0];
    link.download = `cv_max_poblete_${fecha}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
