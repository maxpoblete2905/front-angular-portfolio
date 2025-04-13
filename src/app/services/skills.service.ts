import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Skill } from '../portfolio/interfaces';

@Injectable({
    providedIn: 'root'
})
export class SkillService extends GenericService<Skill> {
    constructor(
        http: HttpClient,
        @Inject('SKILLS_API_URL') apiUrl: string
    ) {
        super(http, apiUrl);
    }
}