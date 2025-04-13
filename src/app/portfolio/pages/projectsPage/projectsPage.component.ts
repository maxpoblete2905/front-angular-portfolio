import { Component, OnInit } from '@angular/core';
import { Project } from '../../interfaces';
import { finalize } from 'rxjs';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'portfolio-projects-page',
  templateUrl: './projectsPage.component.html',
  styleUrls: ['./projectsPage.component.css'],
  standalone: false
})
export class ProjectsPageComponent implements OnInit {
  public projects: Project[] = [];
  public isLoading: boolean = true;
  public errorMessage: string | null = null;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.projectService.getAll()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (projects: Project[]) => {
          this.projects = projects.filter((project: Project) => project.state === true);
        },
        error: (error: any) => {
          console.error('Error loading projects:', error);
          this.errorMessage = 'Error al cargar los proyectos. Por favor, inténtalo de nuevo más tarde.';
        }
      });
  }
}