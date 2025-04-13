import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Technology } from "../interfaces/technology.interface";

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  // Datos globales
  private technologyURLSource = new BehaviorSubject<Technology[]>([]);

  // Observables para que otros componentes se suscriban
  public technologyURL$ = this.technologyURLSource.asObservable();

  constructor() { }

  // Métodos para actualizar los datos
  setTechnologyURL(techURLs: Technology[]) {
    this.technologyURLSource.next(techURLs);
  }

  // Método para obtener las URLs de tecnología actuales
  getTechnologyURL(): Technology[] {
    return this.technologyURLSource.getValue();
  }
}
