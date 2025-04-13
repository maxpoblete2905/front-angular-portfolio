import { Component, OnInit } from '@angular/core';
import { DarkMode } from '../../interfaces';
import { GlobalDataService } from '../../../firestore/global-data.service';
import { finalize } from 'rxjs';
import { TechnologyService } from '../../../services/technology.service';
import { Technology } from '../../interfaces/technology.interface';

@Component({
  selector: 'portfolio-layout-page',
  templateUrl: './layoutPage.component.html',
  styleUrls: ['./layoutPage.component.css'],
  standalone: false
})
export class LayoutPageComponent implements OnInit {
  public isLoading: boolean = true;
  public errorMessage: string | null = null;

  constructor(
    private globalDataService: GlobalDataService,
    private technologyService: TechnologyService,
  ) { }

  ngOnInit(): void {
    this.loadTechnologies();
  }

  private loadTechnologies(): void {
    this.isLoading = true;
    this.technologyService.getAll()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (technologies: Technology[]) => {
          this.globalDataService.setTechnologyURL(technologies);
        },
        error: (error: unknown) => {
          console.error('Error cargando tecnologías:', error);
          this.errorMessage = 'Error al cargar las tecnologías.';
        }
      });
  }
}