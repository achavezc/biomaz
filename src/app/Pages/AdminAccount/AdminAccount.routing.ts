import { Routes } from '@angular/router';

import { AccountComponent } from './Account/Account.component';
import { ProfileComponent } from './Profile/Profile.component';
import { OrderHistoryComponent } from './OrderHistory/OrderHistory.component';

export const AdminAccountRoutes : Routes = [
   {
      path : '',
      component : AccountComponent,
      children: [ 
         {
            path: 'profile',
            component: ProfileComponent
         },         
         { 
            path: 'order-history', 
            component: OrderHistoryComponent 
         }
      ]
   }
]