import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shop-phone/models/user.model';
import { StorageService } from 'src/app/shop-phone/services/storage/storage.service';
import { UserService } from 'src/app/shop-phone/services/user/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  displayedColumns: string[] = ['username', 'email', 'firstName', 'lastName', 'phone'];
  dataSource: UserModel[] = [];
  constructor(private userService: UserService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.loadUsers();
    if (this.storageService.getRole() !== 'admin'){
      window.location.href = '/admin/login';
    }
  }
  loadUsers(): void {
    this.userService.getUserAll().subscribe(
      res => {
        this.dataSource = res;
      }, error => {
        console.log(error);
        
      }
    )
  }



}
