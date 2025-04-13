import { Component, OnInit } from '@angular/core';
import { Skill } from '../../interfaces';
import { GlobalDataService } from '../../../firestore/global-data.service';
import { finalize } from 'rxjs';
import { SkillService } from '../../../services/skills.service';
import { Technology } from '../../interfaces/technology.interface';

@Component({
  selector: 'portfolio-skills-page',
  templateUrl: './skillsPage.component.html',
  styleUrls: ['./skillsPage.component.css'],
  standalone: false
})
export class SkillsPageComponent implements OnInit {
  public skills: Skill[] = [];
  public technologyURL: Technology[] = [];
  public darkMode: boolean = true;
  public isLoading: boolean = true;
  public errorMessage: string | null = null;

  constructor(
    private globalDataService: GlobalDataService,
    private skillService: SkillService
  ) { }

  transform(value: string): string {
    return value ? value.split('_').join(' ').toLowerCase() : value.toLowerCase();
  }

  namefind(name: string): string {
    const techItem = this.technologyURL.find((item: Technology) => item.name.split('.')[0] === name);
    return techItem ? techItem.url : '';
  }

  ngOnInit(): void {
    this.loadSkills();
    this.loadGlobalData();
  }

  private loadSkills(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.skillService.getAll()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (skills: Skill[]) => {
          this.skills = skills;
        },
        error: (error: unknown) => {
          console.error('Error cargando habilidades:', error);
          this.errorMessage = 'Error al cargar las habilidades. Por favor, inténtalo de nuevo más tarde.';
        }
      });
  }

  private loadGlobalData(): void {
    this.globalDataService.technologyURL$.subscribe(urls => {
      this.technologyURL = urls;
    });
  }
}