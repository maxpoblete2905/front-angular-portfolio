import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Technology } from "../interfaces/technology.interface";
import { Project } from "../interfaces";
import { Skill, SkillCategory } from "../interfaces/skill.interface";
import { Academic } from "../interfaces/academic.interface";
import { Certification } from "../interfaces/certification.interface";
import { Contact } from "../interfaces/contact.interface";
import { PersonalInformation } from "../interfaces/personal.interfece";

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  // Subjects para cada tipo de dato
  private technologyURLSource = new BehaviorSubject<Technology[]>([]);
  private projectsSource = new BehaviorSubject<Project[]>([]);
  private skillsSource = new BehaviorSubject<SkillCategory[]>([]);
  private personalInfoSource = new BehaviorSubject<PersonalInformation[]>([]);
  private academicsSource = new BehaviorSubject<Academic[]>([]);
  private certificationsSource = new BehaviorSubject<Certification[]>([]);
  private contactsSource = new BehaviorSubject<Contact[]>([]);

  // Observables públicos
  public technologyURL$ = this.technologyURLSource.asObservable();
  public projects$ = this.projectsSource.asObservable();
  public skills$ = this.skillsSource.asObservable();
  public personalInfo$ = this.personalInfoSource.asObservable();
  public academics$ = this.academicsSource.asObservable();
  public certifications$ = this.certificationsSource.asObservable();
  public contacts$ = this.contactsSource.asObservable();

  constructor() { }

  // Métodos para actualizar los datos
  setTechnologyURL(techURLs: Technology[]) {
    this.technologyURLSource.next(techURLs);
  }

  setProjects(projects: Project[]) {
    this.projectsSource.next(projects);
  }

  setSkills(skills: SkillCategory[]) {
    this.skillsSource.next(skills);
  }

  setPersonalInformation(info: PersonalInformation[]) {
    this.personalInfoSource.next(info);
  }

  setAcademics(academics: Academic[]) {
    this.academicsSource.next(academics);
  }

  setCertifications(certifications: Certification[]) {
    this.certificationsSource.next(certifications);
  }

  setContacts(contacts: Contact[]) {
    this.contactsSource.next(contacts);
  }

  // Métodos para obtener el valor actual
  getCurrentTechnology(): Technology[] {
    return this.technologyURLSource.getValue();
  }

  getCurrentProjects(): Project[] {
    return this.projectsSource.getValue();
  }

  getCurrentSkills(): SkillCategory[] {
    return this.skillsSource.getValue();
  }

  getCurrentPersonalInformation(): PersonalInformation[] {
    return this.personalInfoSource.getValue();
  }

  getCurrentAcademics(): Academic[] {
    return this.academicsSource.getValue();
  }

  getCurrentCertifications(): Certification[] {
    return this.certificationsSource.getValue();
  }

  getCurrentContacts(): Contact[] {
    return this.contactsSource.getValue();
  }
}
