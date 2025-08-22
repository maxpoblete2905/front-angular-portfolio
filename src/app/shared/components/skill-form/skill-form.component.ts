import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { Technology } from '@app/interfaces';

@Component({
  selector: 'app-skill-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent implements OnInit {
  private destroy$ = new Subject<void>();
  private firestore: Firestore = inject(Firestore);
  private fb = inject(FormBuilder);
  public isLoading = true;
  public selectedTech: string[] = [''];
  public skillForm: FormGroup;
  public technologyURL: Technology[] = [];

  constructor() {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      skills: this.fb.array([])
    });
    this.addSkill(); // Add default skill
    this.selectedTech.push(''); // Inicializar para el primer skill
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.loadGlobalData();
  }

  private loadGlobalData(): void {
    this.isLoading = true;
  }

  get skills(): FormArray {
    return this.skillForm.get('skills') as FormArray;
  }

  createSkill(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      icon: ['', Validators.required],
      technologies: [[]]
    });
  }

  addSkill(): void {
    this.skills.push(this.createSkill());
    this.selectedTech.push(''); // Añadir espacio para la nueva selección
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
    this.selectedTech.splice(index, 1); // Remover la selección correspondiente
  }

  getAvailableTechs(skillIndex: number): Technology[] {
    const currentTechs = this.skills.at(skillIndex).get('technologies')?.value || [];
    return this.technologyURL.filter(tech => !currentTechs.includes(tech.name));
  }

  addTechFromSelect(skillIndex: number): void {
    const selected = this.selectedTech[skillIndex];
    if (selected) {
      const currentTechs = this.skills.at(skillIndex).get('technologies')?.value || [];
      if (!currentTechs.includes(selected)) {
        this.skills.at(skillIndex).get('technologies')?.setValue([...currentTechs, selected]);
        this.selectedTech[skillIndex] = ''; // Resetear la selección

        // Forzar detección de cambios
        setTimeout(() => {
          this.skills.at(skillIndex).get('technologies')?.updateValueAndValidity();
        });
      }
    }
  }

  removeTech(skillIndex: number, tech: string): void {
    const currentTechs = this.skills.at(skillIndex).get('technologies')?.value || [];
    this.skills.at(skillIndex).get('technologies')?.setValue(
      currentTechs.filter((t: string) => t !== tech)
    );

    // Forzar actualización de la vista
    this.skills.at(skillIndex).get('technologies')?.updateValueAndValidity();
  }

  addTechFromInput(skillIndex: number): void {
    const input = document.querySelector(`input[placeholder="Add technology..."]`) as HTMLInputElement;
    const value = input?.value.trim();

    if (value) {
      const currentTechs = this.skills.at(skillIndex).get('technologies')?.value || [];
      if (!currentTechs.includes(value)) {
        this.skills.at(skillIndex).get('technologies')?.setValue([...currentTechs, value]);
      }
      input.value = '';
    }
  }

  async onSubmit(): Promise<void> {
    if (this.skillForm.valid) {
      try {
        const skillData = this.skillForm.value;
        const skillsCollection = collection(this.firestore, 'skillCategories');
        await addDoc(skillsCollection, skillData);

        alert('Skill category added successfully!');
        this.skillForm.reset();
        this.skills.clear();
        this.addSkill();
      } catch (error) {
        console.error('Error adding document: ', error);
        alert('Error adding skill category');
      }
    }
  }
}
