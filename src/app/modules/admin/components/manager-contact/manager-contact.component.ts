import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/shop-phone/services/contact/contact.service';

@Component({
  selector: 'app-manager-contact',
  templateUrl: './manager-contact.component.html',
  styleUrls: ['./manager-contact.component.css']
})
export class ManagerContactComponent implements OnInit {
  displayedColumns: string[] = ['username', 'email', 'message', 'createdAt'];
  dataSource: any = [];
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContact().subscribe(
      res => {
        this.dataSource = res;
      }, error => {
        console.log(error);
      }
    )
  }

}
