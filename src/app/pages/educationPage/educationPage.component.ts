import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { Academic } from '@app/interfaces';
import { Certification } from '@app/interfaces/certification.interface';
import { GlobalDataService } from '@app/services/global-data.service';

@Component({
  selector: 'portfolio-education-page',
  templateUrl: './educationPage.component.html',
  styleUrls: ['./educationPage.component.css'],
  providers: [DatePipe],
  imports: [CommonModule]
})
export class EducationPageComponent implements OnInit, OnDestroy {
  public educations: Academic[] = [];
  public certifications: Certification[] = [];
  public isLoading = true;
  public errorMessages: string[] = [];
  private destroy$ = new Subject<void>();
  public errorMessage: string = ''



  constructor(
    private globalDataService: GlobalDataService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadEducationData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadEducationData(): void {
    this.isLoading = true;
    this.errorMessages = [];

    combineLatest([
      this.globalDataService.academics$,
      this.globalDataService.certifications$
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: ([academics, certifications]) => {
        this.educations = academics.sort((a, b) =>
          new Date(b.period.end).getTime() - new Date(a.period.end).getTime()
        );
        this.certifications = certifications.sort((a, b) =>
          new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading education data:', error);
        this.errorMessages = [
          'Error al cargar los datos académicos.',
          'Error al cargar las certificaciones.'
        ];
        this.isLoading = false;
      }
    });
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'MMM yyyy') || '';
  }

  getDuration(start: Date, end: Date, current?: boolean): string {
    const startDate = new Date(start);
    const endDate = current ? new Date() : new Date(end);

    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();

    const totalMonths = years * 12 + months;
    const displayYears = Math.floor(totalMonths / 12);
    const displayMonths = totalMonths % 12;

    let duration = '';
    if (displayYears > 0) duration += `${displayYears} año${displayYears > 1 ? 's' : ''}`;
    if (displayMonths > 0) {
      if (duration) duration += ' ';
      duration += `${displayMonths} mes${displayMonths > 1 ? 'es' : ''}`;
    }

    return current ? `${duration} (Actualidad)` : duration;
  }

  isCertificationExpired(expirationDate?: Date): boolean {
    if (!expirationDate) return false;
    return new Date(expirationDate) < new Date();
  }
}
