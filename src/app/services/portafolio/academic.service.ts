import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../generic.service';
import { Academic } from '../../interfaces';

@Injectable({
    providedIn: 'root'
})
export class AcademicService extends GenericService<Academic> {
    constructor(
        http: HttpClient,
        @Inject('ACADEMIC_API_URL') apiUrl: string
    ) {
        super(http, apiUrl);
    }
}