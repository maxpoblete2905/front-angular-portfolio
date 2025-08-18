import { Injectable, Inject } from '@angular/core';
import { Contact } from '../../interfaces';
import { GenericService } from '../generic.service';
import { CONTACT_COLLECTION } from '../../core/tokens/collections';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends GenericService<Contact> {
  constructor(
    @Inject(CONTACT_COLLECTION) collectionName: string
  ) {
    super(collectionName);
  }
}
