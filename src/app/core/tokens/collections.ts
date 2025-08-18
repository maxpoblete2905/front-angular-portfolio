// src/app/core/tokens/collections.ts
import { InjectionToken } from '@angular/core';

export const SKILLS_COLLECTION = new InjectionToken<string>('skills');
export const PROJECTS_COLLECTION = new InjectionToken<string>('projects');
export const ACADEMMIC_COLLECTION = new InjectionToken<string>('academics');
export const PERSONAL_COLLECTION = new InjectionToken<string>('personal-information');
export const CONTACT_COLLECTION = new InjectionToken<string>('contacts');
export const CERTIFICATION_COLLECTION = new InjectionToken<string>('certifications');
export const TECHNOLOGY_COLLECTION = new InjectionToken<string>('icon');

// Add more tokens as needed
