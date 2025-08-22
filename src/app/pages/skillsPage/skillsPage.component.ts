import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SkillCategory, Technology } from '@interfaces/index';
import { SkillFormComponent } from '@app/shared/components/skill-form/skill-form.component';
import { GenericService } from '@app/services/generic.service'; // Ajusta la ruta

@Component({
  selector: 'portfolio-skills-page',
  templateUrl: './skillsPage.component.html',
  styleUrls: ['./skillsPage.component.css'],
  imports: [CommonModule, SkillFormComponent],
  standalone: true,
  providers: [
    {
      provide: GenericService,
      useFactory: () => new GenericService<SkillCategory>('skills-tech')
    }
  ]
})
export class SkillsPageComponent implements OnInit, OnDestroy {
  public skillCategories: SkillCategory[] = [];
  public isLoading = true;
  private destroy$ = new Subject<void>();
  public technologyURL: Technology[] = [];
  public create: boolean = false;

  constructor(
    @Inject(GenericService) private skillCategoryService: GenericService<SkillCategory>
  ) { }

  ngOnInit(): void {
    this.loadGlobalData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadGlobalData(): void {
    this.isLoading = true;

    this.skillCategoryService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          this.skillCategories = categories;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading skill categories:', error);
          this.isLoading = false;
        }
      });
  }

  getTechnologyByName(techName: string): Technology | undefined {
    if (!this.technologyURL?.length) return undefined;
    return this.technologyURL.find(t =>
      t.name.toLowerCase().includes(techName.toLowerCase())
    );
  }

  createdActive(): void {
    this.create = !this.create;
  }
}
