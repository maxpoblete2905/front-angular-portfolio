import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subject, takeUntil, combineLatest } from 'rxjs'
import { GlobalDataService } from '../../../services/global-data.service'
import { SkillCategory, Technology } from '../../../interfaces'

@Component({
  selector: 'portfolio-skills-page',
  templateUrl: './skillsPage.component.html',
  styleUrls: ['./skillsPage.component.css'],
  standalone: false,
})
export class SkillsPageComponent implements OnInit, OnDestroy {
  public skillCategories: SkillCategory[] = []
  public isLoading = true
  private destroy$ = new Subject<void>()
  public technologyURL: Technology[] = []

  constructor(private globalDataService: GlobalDataService) {}

  ngOnInit(): void {
    this.loadGlobalData()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private loadGlobalData(): void {
    this.isLoading = true

    combineLatest([
      this.globalDataService.technologyURL$,
      this.globalDataService.skills$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([technologies, skillCategories]) => {
          this.technologyURL = technologies
          this.skillCategories = skillCategories
          this.isLoading = false
          console.log('Loading completed', {
            skills: this.skillCategories,
            technologies: this.technologyURL,
            isLoading: this.isLoading,
          })
        },
        error: (error) => {
          console.error('Error loading data:', error)
          this.isLoading = false
        },
        complete: () => {
          this.isLoading = false
        },
      })
  }

  transform(value: string): string {
    return value ? value.split('_').join(' ').toLowerCase() : ''
  }

  namefind(name: string): string {
    if (!name || !this.technologyURL?.length) return ''

    const cleanInputName = name.trim().toLowerCase()

    const techItem = this.technologyURL.find((item) => {
      const fileName = item.name.split('.')[0].trim().toLowerCase()
      // Comparación más flexible
      return (
        fileName.includes(cleanInputName) || cleanInputName.includes(fileName)
      )
    })

    return techItem?.url || ''
  }
}
