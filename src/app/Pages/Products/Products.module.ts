import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule}    from '@angular/forms';
import { ProductsRoutes } from './Products.routing';
import { DetailPageModule } from '../../Pages/Products/DetailPage/DetailPage.module';
import { ProductListModule } from '../../Pages/Products/ProductsList/ProductList.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(ProductsRoutes),
		FlexLayoutModule,
		FormsModule,
		ProductListModule,
		DetailPageModule
	],
	declarations: [
	]	
})
export class ProductsModule { }
