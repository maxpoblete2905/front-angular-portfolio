import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../generic.service';
import { Skill, SkillCategory } from '../../interfaces';

@Injectable({
    providedIn: 'root'
})
export class SkillService extends GenericService<SkillCategory> {
    constructor(
        http: HttpClient,
        @Inject('SKILLS_API_URL') apiUrl: string
    ) {
        super(http, apiUrl);
    }
}