import { Injectable, Inject } from '@angular/core';
import { GenericService } from '../generic.service';
import { PersonalInformation } from '../../interfaces/personal.interfece';
import { PERSONAL_COLLECTION } from '../../core/tokens/collections';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService extends GenericService<PersonalInformation> {
  constructor(
    @Inject(PERSONAL_COLLECTION) collectionName: string
  ) {
    super(collectionName);
  }
}
