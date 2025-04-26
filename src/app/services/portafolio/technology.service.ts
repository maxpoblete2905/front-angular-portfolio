import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../generic.service';
import { Technology } from '../../interfaces/technology.interface';

@Injectable({
    providedIn: 'root'
})
export class TechnologyService extends GenericService<Technology> {
    constructor(
        http: HttpClient,
        @Inject('TECHNOLOGY_API_URL') apiUrl: string
    ) {
        super(http, apiUrl);
    }
}