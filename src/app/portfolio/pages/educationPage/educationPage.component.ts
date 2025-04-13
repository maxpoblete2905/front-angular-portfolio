import { Component } from '@angular/core';

@Component({
  selector: 'portfolio-education-page',
  templateUrl: './educationPage.component.html',
  styleUrls: ['./educationPage.component.css'],
  standalone: false
})
export class EducationPageComponent {
  title: string = 'Educación';

  // Array de educación
  educations = [
    {
      institution: 'Intituto Profesional AIEP',
      startYear: 2016,
      endYear: 2018,
      title: 'Programador Computacional',
      description: 'Especialización en desarrollo de software y sistemas de información.'
    },
    {
      institution: 'Intituto Profesional AIEP',
      startYear: 2019,
      endYear: 2020,
      title: 'Análisis de Sistemas',
      description: 'Especialización en análisis de sistemas.'
    }
  ];

  // Array de certificaciones
  certifications = [
    {
      name: 'Database Administration',
      year: 2019
    },
    {
      name: 'SCRUM FUNDAMENTAL CERTIFIED (SFC)',
      year: 2019
    }
  ];
}
