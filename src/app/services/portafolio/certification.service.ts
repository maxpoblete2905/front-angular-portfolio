import { Injectable, Inject } from '@angular/core';
import { GenericService } from '../generic.service';
import { Certification } from '../../interfaces/certification.interface';
import { CERTIFICATION_COLLECTION } from '../../core/tokens/collections';

@Injectable({
  providedIn: 'root'
})
export class CertificationService extends GenericService<Certification> {
  constructor(
    @Inject(CERTIFICATION_COLLECTION) collectionName: string
  ) {
    super(collectionName);
  }
}
