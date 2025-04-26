import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../../interfaces';
import { GenericService } from '../generic.service';

@Injectable({
    providedIn: 'root'
})
export class ContactService extends GenericService<Contact> {
    constructor(
        http: HttpClient,
        @Inject('CONTACT_API_URL') apiUrl: string
    ) {
        super(http, apiUrl);
    }
}