import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ListProductComponent } from './components/manager-product/list-product/list-product.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { AddProductComponent } from './components/manager-product/add-product/add-product.component';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditProductComponent } from './components/manager-product/edit-product/edit-product.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { ManagerContactComponent } from './components/manager-contact/manager-contact.component';
import { ListOrderComponent } from './components/manager-order/list-order/list-order.component';
import { OrderDetailComponent } from './components/manager-order/order-detail/order-detail.component';
import { ModalEditStatusComponent } from './components/manager-order/modal-edit-status/modal-edit-status.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ListUserComponent } from './components/manager-user/list-user/list-user.component';
@NgModule({
  declarations: [
    AdminComponent,
    ListProductComponent,
    AddProductComponent,
    EditProductComponent,
    LoginAdminComponent,
    ListOrderComponent,
    ManagerContactComponent,
    OrderDetailComponent,
    ModalEditStatusComponent,
    ListUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatDialogModule
  ]
})
export class AdminModule { }
