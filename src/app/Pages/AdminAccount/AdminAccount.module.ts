import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, 
   MatBadgeModule,
   MatCardModule, 
   MatMenuModule, 
   MatToolbarModule, 
   MatIconModule, 
   MatInputModule, 
   MatDatepickerModule, 
   MatNativeDateModule, 
   MatProgressSpinnerModule,
   MatTableModule, 
   MatExpansionModule, 
   MatSelectModule,
   MatSnackBarModule, 
   MatTooltipModule, 
   MatChipsModule, 
   MatListModule, 
   MatSidenavModule, 
   MatTabsModule, 
   MatProgressBarModule,
   MatCheckboxModule,
   MatSliderModule,
   MatRadioModule,
   MatDialogModule,
   MatGridListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminAccountRoutes } from './AdminAccount.routing';
import { AccountComponent } from './Account/Account.component';
import { ProfileComponent } from './Profile/Profile.component';
import { OrderHistoryComponent } from './OrderHistory/OrderHistory.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminAccountRoutes),
    MatBadgeModule,
    MatButtonModule, 
    FlexLayoutModule,
    MatCardModule, 
    MatMenuModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatProgressSpinnerModule,
    MatTableModule, 
    MatExpansionModule, 
    MatSelectModule, 
    MatSnackBarModule, 
    MatTooltipModule, 
    MatChipsModule, 
    MatListModule, 
    MatSidenavModule, 
    MatTabsModule, 
    MatProgressBarModule,
    MatCheckboxModule,
    MatSliderModule,
    MatRadioModule,
    MatDialogModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
     AccountComponent, 
     ProfileComponent,       
     OrderHistoryComponent
   ]
})
export class AdminAccountModule { }
