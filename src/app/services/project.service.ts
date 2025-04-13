import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../portfolio/interfaces';
import { GenericService } from './generic.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectService extends GenericService<Project> {
    constructor(
        http: HttpClient,
        @Inject('PROJECTS_API_URL') apiUrl: string
    ) {
        super(http, apiUrl);
    }
}