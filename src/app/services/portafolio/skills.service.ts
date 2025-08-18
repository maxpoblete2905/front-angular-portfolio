import { Injectable, Inject } from '@angular/core';
import { GenericService } from '../generic.service';
import { SkillCategory } from '../../interfaces';
import { SKILLS_COLLECTION } from '../../core/tokens/collections';

@Injectable({
  providedIn: 'root'
})
export class SkillService extends GenericService<SkillCategory> {
  constructor(
    @Inject(SKILLS_COLLECTION) collectionName: string
  ) {
    super(collectionName);
  }
}
