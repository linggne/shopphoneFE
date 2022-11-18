import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/shop-phone/services/storage/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenuProduct: boolean = true;
  showSubmenuUser: boolean = true;
  showSubmenuOrder: boolean = true;
  showSubmenuContact: boolean = true;
  isShowing = false;
  showSubSubMenu: boolean = false;
  isLoginAdmin = new BehaviorSubject<string>('');
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.isLoginAdmin.next(this.storageService.getRole());
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  logout(){
    this.storageService.deleteAll();
    setTimeout(() => {
      window.location.href = '/';
    }, 300);
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

}
