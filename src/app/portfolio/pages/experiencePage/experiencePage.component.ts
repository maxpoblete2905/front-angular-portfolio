import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonalInformation } from '../../../interfaces/personal.interfece';
import { GlobalDataService } from '../../../services/global-data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'portfolio-experience-page',
  templateUrl: './experiencePage.component.html',
  styleUrls: ['./experiencePage.component.css'],
  standalone: false
})
export class ExperiencePageComponent implements OnInit, OnDestroy {
  public personalInformation: PersonalInformation = {
    description: '',
    name: '',
    university_title: '',
    update: '',
    descriptionPosition: ''
  };
  public isLoading = true;
  public errorMessage: string | null = null;
  private destroy$ = new Subject<void>();
  particleStyles: any[] = [];

  constructor(
    private globalDataService: GlobalDataService
  ) { }

  ngOnInit(): void {
    this.loadPersonalInformation();
    this.generateParticleStyles();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  generateParticleStyles(): void {
    this.particleStyles = Array(10).fill(0).map(() => ({
      width: `${Math.random() * 20 + 5}px`,
      height: `${Math.random() * 20 + 5}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 20 + 10}s`
    }));
  }

  private loadPersonalInformation(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.globalDataService.personalInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: PersonalInformation[] | null) => {
          if (data) {
            this.personalInformation = data[0];
          }
          this.isLoading = false;
        },
        error: (error: unknown) => {
          console.error('Error loading personal information:', error);
          this.errorMessage = 'Error al cargar la información personal. Por favor, inténtalo de nuevo más tarde.';
          this.isLoading = false;
        }
      });
  }
}