import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from "./_layout/Layout.component";


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../modules/welcome/welcome.module').then((m) => m.WelcomeModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('../modules/auth/auth.module').then((m) => m.AuthModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../modules/products/products.module').then((m) => m.ProductsModule)
      },
      {
        path: 'shopping',
        loadChildren: () => import('../modules/shopping/shopping.module').then((m) => m.ShoppingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
