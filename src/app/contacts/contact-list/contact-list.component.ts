import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { ContactService } from '../contact.service';

@Component({
    selector: 'lst-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css'],
    providers: [ContactService]
})
export class ContactListComponent implements OnInit {

    contacts: Contact[];
    selectedContact: Contact;

    constructor(private contactService: ContactService) {}

    ngOnInit() {
        this.contactService
            .getContacts()
            .then((contacts: Contact[]) => {
                this.contacts = contacts.map((contact) => {
                    if (!contact.phone) {
                        contact.phone = {
                            mobile: '',
                            work: ''
                        };
                    }
                    return contact;
                });
            });
    }

    private getIndexOfContact = (contactId: String) => {
        return this.contacts.findIndex((contact) => {
            return contact._id === contactId;
        });
    }

    selectContact(contact: Contact) {
        this.selectedContact = contact;
    }

    createNewContact() {
        const contact: Contact = {
            name: '',
            email: '',
            phone: {
                mobile: '',
                work: ''
            }
        };

        this.selectContact(contact);
    }

    deleteContact = (contactId: String) => {
        const index = this.getIndexOfContact(contactId);
        if (index !== -1) {
            this.contacts.splice(index, 1);
            this.selectContact(null);
        }
        return this.contacts;
    }

    addContact = (contact: Contact) => {
        this.contacts.push(contact);
        this.selectContact(contact);
        return this.contacts;
    }

    updateContact = (contact: Contact) => {
        const index = this.getIndexOfContact(contact._id);
        if (index !== -1) {
            this.contacts[index] = contact;
            this.selectContact(contact);
        }
        return this.contacts;
    }

}
