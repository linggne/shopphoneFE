import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { TopbarComponent } from './_layout/components/topbar/topbar.component';
import { FooterComponent } from './_layout/components/footer/footer.component';
import {LayoutComponent} from "./_layout/Layout.component";
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    LayoutComponent,
    TopbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ]
})
export class LayoutModule { }
