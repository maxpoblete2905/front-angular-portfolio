import { Component, OnInit } from '@angular/core';
import { Project } from '../../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { GlobalDataService } from '../../../services/global-data.service';
import { Timestamp } from 'firebase/firestore';
import { ProjectService } from '../../../services/project.service';
import { Technology } from '../../../interfaces/technology.interface';

@Component({
  selector: 'portfolio-project-page',
  templateUrl: './projectPage.component.html',
  styleUrl: './projectPage.component.css',
  standalone: false
})
export class ProjectPageComponent implements OnInit {
  public id: number = 0;
  isLoading: boolean = true;
  public project: Project = {
    title: '',
    description: '',
    imageUrl: '',
    companyName: '',
    position: '',
    client: '',
    technologies: [],
    views: [],
    state: false,
    creationDate: Timestamp.now(),
    completedProfile: false
  };
  public currentIndex: number = 0;
  public technologyURL: Technology[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private globalDataService: GlobalDataService,
    private projectService: ProjectService
  ) { }

  transform(value: string): string {
    return value ? value.split('_').join(' ') : value;
  }

  namefind(name: string): string {
    const techItem = this.technologyURL.find((item: Technology) => item.name.split('.')[0] === name);
    if (techItem) {
      return techItem.url;
    }
    return '';
  }

  ngOnInit(): void {
    this.globalDataService.technologyURL$.subscribe(urls => {
      this.technologyURL = urls;
    });

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.projectService.getById(id)))
      .subscribe((project) => {
        if (!project) {
          this.router.navigateByUrl('portfolio/projects');
          return;
        }
        this.project = project;
        this.isLoading = false;
      });
  }

  nextImage(): void {
    if (this.currentIndex < this.project.views.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  previousImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.project.views.length - 1;
    }
  }
}
