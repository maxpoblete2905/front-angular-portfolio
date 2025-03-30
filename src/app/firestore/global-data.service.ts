import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FileData } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  // Datos globales
  private technologyURLSource = new BehaviorSubject<FileData[]>([]);
  private darkModeSource = new BehaviorSubject<boolean>(true);

  // Observables para que otros componentes se suscriban
  public technologyURL$ = this.technologyURLSource.asObservable();
  public darkMode$ = this.darkModeSource.asObservable();

  constructor() { }

  // Métodos para actualizar los datos
  setTechnologyURL(techURLs: FileData[]) {
    this.technologyURLSource.next(techURLs);
  }

  setDarkMode(darkMode: boolean) {
    this.darkModeSource.next(darkMode);
  }

  // Método para obtener las URLs de tecnología actuales
  getTechnologyURL(): FileData[] {
    return this.technologyURLSource.getValue();
  }

  // Método para obtener el modo oscuro actual
  getDarkMode(): boolean {
    return this.darkModeSource.getValue();
  }
}
