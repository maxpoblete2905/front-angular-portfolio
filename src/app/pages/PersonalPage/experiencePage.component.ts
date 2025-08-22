import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PersonalInformation } from '@app/interfaces/personal.interfece';
import { GenericService } from '@app/services/generic.service';

@Component({
  selector: 'portfolio-experience-page',
  templateUrl: './experiencePage.component.html',
  styleUrls: ['./experiencePage.component.css'],
  imports: [CommonModule],
  providers: [
    {
      provide: GenericService,
      useFactory: () => new GenericService<PersonalInformation>('personal-information')
    }
  ]
})
export class ExperiencePageComponent implements OnInit, OnDestroy {
  public personalInformation!: PersonalInformation;
  public isLoading = true;
  public errorMessage: string | null = null;
  private destroy$ = new Subject<void>();
  particleStyles: any[] = [];

  constructor(@Inject(GenericService) private personalInformationService: GenericService<PersonalInformation>
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

    this.personalInformationService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (personalInformation) => {
          this.personalInformation = personalInformation[1];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading skill categories:', error);
          this.isLoading = false;
        }
      });
  }
}
