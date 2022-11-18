import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CardProductComponent } from 'src/app/core-ui/card-product/card-product.component';
import {MatButtonModule} from '@angular/material/button';
import { ContactComponent } from './components/contact/contact.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WelcomeComponent,
    HomeComponent,
    CardProductComponent,
    ContactComponent
  ],
  exports: [
    CardProductComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    CarouselModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class WelcomeModule { }
