import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../interfaces';
import { GenericService } from '../generic.service';
import { PROJECTS_COLLECTION } from '../../core/tokens/collections';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends GenericService<Project> {
  constructor(
    @Inject(PROJECTS_COLLECTION) collectionName: string
  ) {
    super(collectionName);
  }
}
