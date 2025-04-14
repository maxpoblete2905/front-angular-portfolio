import { Component } from '@angular/core';

@Component({
  selector: 'app-download-cv',
  templateUrl: './download-cv.component.html',
  styleUrl: './download-cv.component.css',
  standalone: false
})
export class DownloadCvComponent {

  constructor() { }

  async downloadPDF() {
    try {
      // Ruta del archivo en la carpeta assets
      const assetPath = 'assets/cv/cv_max_poblete.pdf';

      // Obtener el archivo desde assets
      const response = await fetch(assetPath);
      const blob = await response.blob();

      // Crear el enlace de descarga
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);

      link.href = url;
      const fecha = new Date().toISOString().split('T')[0];
      link.download = `cv_max_poblete_${fecha}.pdf`;

      document.body.appendChild(link);
      link.click();

      // Limpiar
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
      // Puedes agregar aquí manejo de errores o notificaciones al usuario
    }
  }
}
