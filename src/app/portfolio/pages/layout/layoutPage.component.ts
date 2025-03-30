import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from '../../../firestore/firebase.service';
import { FileData } from '../../../firestore/storage.service';
import { DarkMode } from '../../interfaces';
import { GlobalDataService } from '../../../firestore/global-data.service';

@Component({
  selector: 'portfolio-layout-page',
  templateUrl: './layoutPage.component.html',
  styleUrls: ['./layoutPage.component.css'],
})
export class LayoutPageComponent implements OnInit {
  private firebaseDarkMode: FirestoreService<DarkMode>;
  public technologyStorageList: FileData[] = [];
  public technologyURL: Record<string, string> = {};
  public darkMode: boolean = true;
  cargarFirestore: FirestoreService<FileData>;

  constructor(
    private firestore: AngularFirestore,
    private globalDataService: GlobalDataService
  ) {
    this.firebaseDarkMode = new FirestoreService<DarkMode>(this.firestore);
    this.cargarFirestore = new FirestoreService<FileData>(this.firestore);
    this.firebaseDarkMode.setCollection('style');
    this.cargarFirestore.setCollection('icon')

  }

  async ngOnInit(): Promise<void> {
    try {
      this.firebaseDarkMode.getDocuments().subscribe({
        next: (data: DarkMode[]) => {
          this.darkMode = data[0].isStyleOne;
          this.globalDataService.setDarkMode(this.darkMode); // Actualizamos el servicio con el estado de dark mode
        },
        error: (error: unknown) => {
          console.error('Error cargando estilo:', error);
        }
      });

      this.cargarFirestore.getDocuments().subscribe({
        next: (data: FileData[]) => {
          this.globalDataService.setTechnologyURL(data);
        },
        error: (error: unknown) => {
          console.error('Error cargando estilo:', error);
        }
      });

    } catch (error) {
      console.error('Error al cargar tecnologías:', error);
    }
  }
}
