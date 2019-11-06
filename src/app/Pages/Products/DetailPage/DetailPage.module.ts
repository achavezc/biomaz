import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsRoutes } from './../Products.routing';
import { DetailPageComponent } from './DetailPage.component';
import { NgAisModule } from 'angular-instantsearch';
import { GlobalModule } from '../../../Global/Global.module';
import { TemplatesModule } from '../../../Templates/Templates.module';


@NgModule({
 imports:      [ CommonModule,NgAisModule,GlobalModule,TemplatesModule,RouterModule.forChild(ProductsRoutes),],
 declarations: [ DetailPageComponent],
 exports:      [ DetailPageComponent]
})
export class DetailPageModule { }