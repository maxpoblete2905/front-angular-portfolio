import { Component, OnInit, OnDestroy } from '@angular/core';
import { Skill } from '../../../interfaces';
import { GlobalDataService } from '../../../services/global-data.service';
import { takeUntil, Subject, combineLatest } from 'rxjs';
import { Technology } from '../../../interfaces/technology.interface';

@Component({
  selector: 'portfolio-skills-page',
  templateUrl: './skillsPage.component.html',
  styleUrls: ['./skillsPage.component.css'],
  standalone: false
})
export class SkillsPageComponent implements OnInit, OnDestroy {
  public skills: Skill[] = [];
  public technologyURL: Technology[] = [];
  public isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(private globalDataService: GlobalDataService) { }

  ngOnInit(): void {
    this.loadGlobalData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadGlobalData(): void {
    this.isLoading = true;

    combineLatest([
      this.globalDataService.technologyURL$,
      this.globalDataService.skills$
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: ([technologies, skills]) => {
        this.technologyURL = technologies;
        this.skills = skills;
        this.isLoading = false;
        console.log('Loading completed', {
          skills: this.skills,
          technologies: this.technologyURL,
          isLoading: this.isLoading
        });
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  transform(value: string): string {
    return value ? value.split('_').join(' ').toLowerCase() : '';
  }

  namefind(name: string): string {
    if (!name || !this.technologyURL.length) return '';

    const techItem = this.technologyURL.find(item => {
      const techName = item.name.split('.')[0];
      return techName === name;
    });

    return techItem?.url || '';
  }
}