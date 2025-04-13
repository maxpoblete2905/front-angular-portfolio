import { Component, Input, OnInit } from '@angular/core';
import { PersonalInformation } from '../../interfaces/personal.interfece';
import { GlobalDataService } from '../../../firestore/global-data.service';
import { PersonalInformationService } from '../../../services/personal.service';

@Component({
  selector: 'portfolio-experience-page',
  templateUrl: './experiencePage.component.html',
  styleUrls: ['./experiencePage.component.css'],
  standalone: false
})
export class ExperiencePageComponent implements OnInit {
  public personalInformation: PersonalInformation = {
    description: '',
    name: '',
    university_title: '',
    update: '',
    descriptionPosition: ''
  };
  public isLoading: boolean = true;
  public errorMessage: string | null = null;
  @Input() description: string = '';

  constructor(
    private personalInformationService: PersonalInformationService
  ) { }

  ngOnInit(): void {
    this.loadPersonalInformation();
  }

  private loadPersonalInformation(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.personalInformationService.getAll().subscribe({
      next: (data: PersonalInformation[]) => {
        this.personalInformation = data[0];
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Error cargando información personal:', error);
        this.errorMessage = 'Error al cargar la información personal. Por favor, inténtalo de nuevo más tarde.';
        this.isLoading = false;
      }
    });
  }
}