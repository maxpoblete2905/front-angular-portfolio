import { Injectable, Inject } from '@angular/core';
import { GenericService } from '../generic.service';
import { Academic } from '../../interfaces';
import { ACADEMMIC_COLLECTION } from '../../core/tokens/collections';

@Injectable({
  providedIn: 'root'
})
export class AcademicService extends GenericService<Academic> {
  constructor(
    @Inject(ACADEMMIC_COLLECTION) collectionName: string
  ) {
    super(collectionName);
  }
}
