import { Component } from '@angular/core'
import {
  personalInformation,
  PersonalInformation,
} from './interfaces/personal.interfece'
import { PersonalInformationService } from './services/portafolio/personal.service'
import { AcademicService } from './services/portafolio/academic.service'
import { GlobalDataService } from './services/global-data.service'
import { ProjectService } from './services/portafolio/project.service'
import { SkillService } from './services/portafolio/skills.service'
import { TechnologyService } from './services/portafolio/technology.service'
import { forkJoin, catchError, finalize, Observable, of } from 'rxjs'
import { CertificationService } from './services/portafolio/certification.service'
import { ContactService } from './services/portafolio/contact.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  public isLoading: boolean = true
  public errorMessage: string | null = null
  public errorMessages: string[] = []
  public personalInformation: PersonalInformation = personalInformation
  isMobileMenuOpen = true

  constructor(
    private globalDataService: GlobalDataService,
    private technologyService: TechnologyService,
    private projectService: ProjectService,
    private skillService: SkillService,
    private personalInformationService: PersonalInformationService,
    private academicService: AcademicService,
    private certificationService: CertificationService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.loadAllData()
  }

  private loadAllData(): void {
    this.isLoading = true
    this.errorMessages = []

    forkJoin({
      technologies: this.technologyService
        .getAll()
        .pipe(catchError((error) => this.handleError(error, 'icon'))),
      projects: this.projectService
        .getAll()
        .pipe(catchError((error) => this.handleError(error, 'projects'))),
      skills: this.skillService
        .getAll()
        .pipe(catchError((error) => this.handleError(error, 'skills'))),
      personalInfo: this.personalInformationService
        .getAll()
        .pipe(
          catchError((error) => this.handleError(error, 'personal-information'))
        ),
      academics: this.academicService
        .getAll()
        .pipe(catchError((error) => this.handleError(error, 'academics'))),
      certifications: this.certificationService
        .getAll()
        .pipe(catchError((error) => this.handleError(error, 'certifications'))),
      contacts: this.contactService
        .getAll()
        .pipe(catchError((error) => this.handleError(error, 'contacts'))),
    })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (responses) => {
          if (responses.technologies) {
            this.globalDataService.setTechnologyURL(responses.technologies)
          }
          if (responses.projects) {
            this.globalDataService.setProjects(responses.projects)
          }
          if (responses.skills) {
            this.globalDataService.setSkills(responses.skills)
          }
          if (responses.personalInfo) {
            this.globalDataService.setPersonalInformation(
              responses.personalInfo
            )
            this.personalInformation = responses.personalInfo[0]
          }
          if (responses.academics) {
            this.globalDataService.setAcademics(responses.academics)
          }
          if (responses.certifications) {
            this.globalDataService.setCertifications(responses.certifications)
          }
          if (responses.contacts) {
            this.globalDataService.setContacts(responses.contacts)
          }
        },
      })
  }

  private handleError(error: any, context: string): Observable<null> {
    console.error(`Error cargando ${context}:`, error)
    this.errorMessages.push(`Error al cargar ${context}.`)
    return of(null)
  }

  menuItems = [
    {
      label: 'Inicio',
      link: '/portfolio/experience',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
      label: 'Proyectos',
      link: '/portfolio/projects',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
      label: 'Habilidades',
      link: '/portfolio/skills',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
      label: 'Educación',
      link: '/portfolio/education',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    },
    {
      label: 'Contacto',
      link: '/portfolio/contact',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
  ]

  socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/maxpoblete2905',
      icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile',
      icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM6 4a2 2 0 11-4 0 2 2 0 014 0z',
    },
  ]
}
