import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
    selector: 'app-contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

    @Input() contact: Contact;

    @Input() createHandler: Function;
    @Input() updateHandler: Function;
    @Input() deleteHandler: Function;

    constructor(private contactService: ContactService) {}

    ngOnInit() {}


    createContact(contact: Contact): void {
        this.contactService.createContact(contact)
            .then((newContact: Contact) => this.createHandler(newContact));
    }

    updateContact(contact: Contact): void {
        this.contactService.updateContact(contact)
            .then((updatedContact: Contact) => this.updateHandler(updatedContact));
    }

    deleteContact(contactId: String): void {
        this.contactService.deleteContact(contactId)
            .then((deletedContactId: String) => this.deleteHandler(deletedContactId));
    }

}
