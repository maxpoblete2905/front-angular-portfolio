import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { PersonalInformation } from '../portfolio/interfaces/personal.interfece';

@Injectable({
    providedIn: 'root'
})
export class PersonalInformationService extends GenericService<PersonalInformation> {
    constructor(
        http: HttpClient,
        @Inject('PERSONAL_API_URL') apiUrl: string
    ) {
        super(http, apiUrl);
    }
}