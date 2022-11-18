import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { ManagerContactComponent } from './components/manager-contact/manager-contact.component';
import { ListOrderComponent } from './components/manager-order/list-order/list-order.component';
import { OrderDetailComponent } from './components/manager-order/order-detail/order-detail.component';
import { AddProductComponent } from './components/manager-product/add-product/add-product.component';
import { EditProductComponent } from './components/manager-product/edit-product/edit-product.component';
import { ListProductComponent } from './components/manager-product/list-product/list-product.component';
import { ListUserComponent } from './components/manager-user/list-user/list-user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'manager-list-product',
        component: ListProductComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent
      },
      {
        path: 'edit-product/:productId',
        component: EditProductComponent
      },
      {
        path: 'login',
        component: LoginAdminComponent
      },
      {
        path: 'manager-list-order',
        component: ListOrderComponent
      },
      {
        path: 'order-detail/:orderId',
        component: OrderDetailComponent
      },
      {
        path: 'contacts',
        component: ManagerContactComponent
      },
      {
        path: 'list-user',
        component: ListUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
