import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ListOrderComponent } from './components/list-order/list-order.component';
import { OrderComponent } from './components/order/order.component';
import { ShoppingComponent } from './shopping.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingComponent,
    children: [
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'list-order',
        component: ListOrderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
