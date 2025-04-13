import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Academic } from '../../../interfaces';
import { AcademicService } from '../../../services/academic.service';
import { CertificationService } from '../../../services/certification.service';
import { Certification } from '../../../interfaces/certification.interface';

@Component({
  selector: 'portfolio-education-page',
  templateUrl: './educationPage.component.html',
  styleUrls: ['./educationPage.component.css'],
  standalone: false,
  providers: [DatePipe]
})
export class EducationPageComponent implements OnInit {
  public educations: Academic[] = [];
  public certifications: Certification[] = [];
  public isLoading: boolean = true;
  public errorMessage: string | null = null;
  public loadingEducation: boolean = true;
  public loadingCertifications: boolean = true;

  constructor(
    private academicService: AcademicService,
    private certificationService: CertificationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadEducation();
    this.loadCertifications();
  }

  private loadEducation(): void {
    this.loadingEducation = true;
    this.errorMessage = null;

    this.academicService.getAll()
      .pipe(
        finalize(() => {
          this.loadingEducation = false;
          this.checkAllLoaded();
        })
      )
      .subscribe({
        next: (academics: Academic[]) => {
          this.educations = academics
            .sort((a, b) => new Date(b.period.end).getTime() - new Date(a.period.end).getTime());
        },
        error: (error: unknown) => {
          console.error('Error cargando educación:', error);
          this.errorMessage = 'Error al cargar la información académica. Por favor, inténtalo de nuevo más tarde.';
        }
      });
  }

  private loadCertifications(): void {
    this.loadingCertifications = true;
    this.errorMessage = null;

    this.certificationService.getAll()
      .pipe(
        finalize(() => {
          this.loadingCertifications = false;
          this.checkAllLoaded();
        })
      )
      .subscribe({
        next: (certifications: Certification[]) => {
          this.certifications = certifications
            .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());
        },
        error: (error: unknown) => {
          console.error('Error cargando certificaciones:', error);
          this.errorMessage = 'Error al cargar las certificaciones. Por favor, inténtalo de nuevo más tarde.';
        }
      });
  }

  private checkAllLoaded(): void {
    this.isLoading = this.loadingEducation || this.loadingCertifications;
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