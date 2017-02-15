import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Contact } from './contact';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContactService {

    private contactsUrl = '/api/contacts';

    constructor(private http: Http) {}

    getContacts(): Promise<Contact[]> {
        return this.http.get(this.contactsUrl)
            .toPromise()
            .then(response => response.json() as Contact[])
            .catch(ContactService.handleError);
    }

    createContact(contact: Contact): Promise<Contact> {
        return this.http.post(this.contactsUrl, contact)
            .toPromise()
            .then(response => response.json() as Contact)
            .catch(ContactService.handleError);
    }

    updateContact(contact: Contact): Promise<Contact> {
        let putUrl = `${this.contactsUrl}/${contact._id}`;
        return this.http.put(putUrl, contact)
            .toPromise()
            .then(response => response.json() as Contact)
            .catch(ContactService.handleError);
    }

    deleteContact(contactId: String): Promise<String> {
        let deleteUrl = `${this.contactsUrl}/${contactId}`;
        return this.http.delete(deleteUrl)
            .toPromise()
            .then(response => response.json() as String)
            .catch(ContactService.handleError);
    }


    private static handleError(error: any) {
        let errorMessage = (error.emssage) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errorMessage);
    }
}
