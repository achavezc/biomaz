import { Routes } from '@angular/router';

import { ProductsListComponent } from './ProductsList/ProductsList.component';
import { DetailPageComponent } from './DetailPage/DetailPage.component';
import { DetailPageMiembroComponent } from './DetailPageMiembro/DetailPageMiembro.component';

export const ProductsRoutes : Routes = [
	{ 
		path: '', 
		component: ProductsListComponent 
	},
	{
		path: ':type/:id',
		component: DetailPageComponent
	},
   /* { 
      path: ':type', 
      component: ProductsListComponent 
   }, */
   {
	path: ':id',
	component: DetailPageMiembroComponent
}
]