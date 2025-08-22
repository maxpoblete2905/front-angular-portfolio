import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { Academic } from '@app/interfaces';
import { GenericService } from '@app/services/generic.service';
import { Certification } from '@app/interfaces/certification.interface';
import { Timestamp } from '@angular/fire/firestore'; // Importa Timestamp

@Component({
  selector: 'portfolio-education-page',
  templateUrl: './educationPage.component.html',
  styleUrls: ['./educationPage.component.css'],
  imports: [CommonModule],
  providers: [
    DatePipe,
    {
      provide: 'AcademicService',
      useFactory: () => new GenericService<Academic>('academics')
    },
    {
      provide: 'CertificationService',
      useFactory: () => new GenericService<Certification>('certifications')
    }
  ]
})
export class EducationPageComponent implements OnInit, OnDestroy {
  public educations: Academic[] = [];
  public certifications: Certification[] = [];
  public isLoading = true;
  public errorMessage: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private datePipe: DatePipe,
    @Inject('AcademicService') private academicService: GenericService<Academic>,
    @Inject('CertificationService') private certificationService: GenericService<Certification>
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
    this.errorMessage = '';

    combineLatest([
      this.academicService.getAll(),
      this.certificationService.getAll()
    ]).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([academics, certifications]) => {
          // Convertir Timestamps a Dates
          this.educations = this.convertAcademicTimestamps(academics);
          this.certifications = this.convertCertificationTimestamps(certifications);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading education data:', error);
          this.errorMessage = 'Error al cargar los datos de educación';
          this.isLoading = false;
        }
      });
  }

  // Método para convertir Timestamps en objetos Academic
  private convertAcademicTimestamps(academics: Academic[]): Academic[] {
    return academics.map(academic => ({
      ...academic,
      period: {
        ...academic.period,
        start: this.convertToDate(academic.period.start),
        end: this.convertToDate(academic.period.end)
      },
      createdAt: this.convertToDate(academic.createdAt),
      updatedAt: this.convertToDate(academic.updatedAt)
    }));
  }

  // Método para convertir Timestamps en objetos Certification
  private convertCertificationTimestamps(certifications: Certification[]): Certification[] {
    return certifications.map(cert => ({
      ...cert,
      issueDate: this.convertToDate(cert.issueDate),
      expirationDate: cert.expirationDate ? this.convertToDate(cert.expirationDate) : undefined,
      createdAt: cert.createdAt ? this.convertToDate(cert.createdAt) : undefined,
      updatedAt: cert.updatedAt ? this.convertToDate(cert.updatedAt) : undefined
    }));
  }

  // Método genérico para convertir Timestamp a Date
  private convertToDate(value: any): Date {
    if (value instanceof Date) {
      return value;
    }

    // Si es un objeto Timestamp de Firestore
    if (value && typeof value === 'object' && 'seconds' in value && 'nanoseconds' in value) {
      return new Date(value.seconds * 1000 + value.nanoseconds / 1000000);
    }

    // Si es un string de fecha
    if (typeof value === 'string') {
      return new Date(value);
    }

    // Si es un número (timestamp)
    if (typeof value === 'number') {
      return new Date(value);
    }

    console.warn('No se pudo convertir a Date:', value);
    return new Date();
  }

  formatDate(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return 'Fecha inválida';
    }
    return this.datePipe.transform(date, 'MMM yyyy') || '';
  }

  getDuration(start: Date, end: Date, current?: boolean): string {
    const startDate = new Date(start);
    const endDate = current ? new Date() : new Date(end);

    // Validar fechas
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return 'Duración no disponible';
    }

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
    const expDate = new Date(expirationDate);
    return !isNaN(expDate.getTime()) && expDate < new Date();
  }

}
