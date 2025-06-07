import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../../../interfaces';
import { GlobalDataService } from '../../../services/global-data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'portfolio-projects-page',
  templateUrl: './projectsPage.component.html',
  styleUrls: ['./projectsPage.component.css'],
  standalone: false
})
export class ProjectsPageComponent implements OnInit, OnDestroy {
  public projects: Project[] = [];
  public groupedProjects: { [companyName: string]: Project[] } = {};
  public isLoading = true;
  public errorMessage: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private globalDataService: GlobalDataService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public loadProjects(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.globalDataService.projects$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (projects: Project[]) => {
          this.projects = projects.filter(project => project.state === true);
          this.groupProjectsByCompany(this.projects);
          this.isLoading = false;
          console.log('Projects loaded:', this.projects);
        },
        error: (error: any) => {
          console.error('Error loading projects:', error);
          this.errorMessage = 'Error al cargar los proyectos. Por favor, inténtalo de nuevo más tarde.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  private groupProjectsByCompany(projects: Project[]): void {
    this.groupedProjects = projects.reduce((acc, project) => {
      const company = project.companyName || 'Sin compañía';
      if (!acc[company]) {
        acc[company] = [];
      }
      acc[company].push(project);
      return acc;
    }, {} as { [key: string]: Project[] });
  }
}
