import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { CartComponent } from './components/cart/cart.component';
import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { OrderComponent } from './components/order/order.component';
import {MatRadioModule} from '@angular/material/radio';
import { ListOrderComponent } from './components/list-order/list-order.component';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    ShoppingComponent,
    CartComponent,
    OrderComponent,
    ListOrderComponent
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule
  ]
})
export class ShoppingModule { }
