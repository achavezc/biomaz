import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './ProductsList.component';
import { NgAisModule } from 'angular-instantsearch';
import { GlobalModule } from '../../../Global/Global.module';
import { TemplatesModule } from '../../../Templates/Templates.module';

@NgModule({
 imports:      [ CommonModule,NgAisModule,GlobalModule,TemplatesModule],
 declarations: [ ProductsListComponent],
 exports:      [ ProductsListComponent]
})
export class ProductListModule { }