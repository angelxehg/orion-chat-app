import { Component } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage {

  items = this.contacts.items$;

  constructor(private contacts: ContactsService) { }

  enabled = () => this.contacts.enabled();

  ionViewWillEnter() { }

}
