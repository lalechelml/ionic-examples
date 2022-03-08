import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GetAllPageRoutingModule } from './get-all-routing.module';
import { GetAllPage } from './get-all.page';
import { HeaderModule } from 'src/app/component/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetAllPageRoutingModule,
    HeaderModule,
    ReactiveFormsModule
  ],
  declarations: [GetAllPage]
})
export class GetAllPageModule { }
