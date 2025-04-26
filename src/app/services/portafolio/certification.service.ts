import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../generic.service';
import { Certification } from '../../interfaces/certification.interface';

@Injectable({
    providedIn: 'root'
})
export class CertificationService extends GenericService<Certification> {
    constructor(
        http: HttpClient,
        @Inject('CERTIFICATION_API_URL') apiUrl: string
    ) {
        super(http, apiUrl);
    }
}