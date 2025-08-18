import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../generic.service';
import { Technology } from '../../interfaces/technology.interface';
import { TECHNOLOGY_COLLECTION } from '../../core/tokens/collections';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService extends GenericService<Technology> {
  constructor(
    @Inject(TECHNOLOGY_COLLECTION) collectionName: string
  ) {
    super(collectionName);
  }
}
