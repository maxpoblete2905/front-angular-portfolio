import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subject, takeUntil } from 'rxjs'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { Project } from '@app/interfaces'

@Component({
  selector: 'portfolio-projects-page',
  templateUrl: './projectsPage.component.html',
  styleUrls: ['./projectsPage.component.css'],
  imports: [RouterModule, CommonModule]
})
export class ProjectsPageComponent implements OnInit, OnDestroy {
  public projects: Project[] = []
  public groupedProjects: { [companyName: string]: Project[] } = {}
  public isLoading = true
  public errorMessage: string | null = null
  private destroy$ = new Subject<void>()
  defaultCompanyIcon = 'https://dummyimage.com/64x64/777/fff.png&text=?'

  constructor() { }

  ngOnInit(): void {
    this.loadProjects()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  public loadProjects(): void {
    this.isLoading = true
    this.errorMessage = null


  }

  private groupProjectsByCompany(projects: Project[]): void {
    this.groupedProjects = projects.reduce((acc, project) => {
      const company = project.companyName || 'Sin compañía'
      if (!acc[company]) {
        acc[company] = []
      }
      acc[company].push(project)
      return acc
    }, {} as { [key: string]: Project[] })
  }
}
