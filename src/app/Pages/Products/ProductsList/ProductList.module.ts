import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './ProductsList.component';
import { NgAisModule } from 'angular-instantsearch';
import { GlobalModule } from '../../../Global/Global.module';
import { TemplatesModule } from '../../../Templates/Templates.module';


import {
    MatButtonModule, 
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
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatPaginatorModule,
    MatSortModule,
  } from '@angular/material';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
 
  /**
  * NgModule that includes all Material modules that are required to serve 
  * the Plunker.
  */
 @NgModule({
    exports: [
      // CDK
      A11yModule,
      BidiModule,
      ObserversModule,
      OverlayModule,
      PlatformModule,
      PortalModule,
      ScrollDispatchModule,
      CdkStepperModule,
      CdkTableModule,
      
      // Material
      MatAutocompleteModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatDatepickerModule,
      MatDialogModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSlideToggleModule,
      MatSliderModule,
      MatSnackBarModule,
      MatStepperModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatSortModule 
    ]
  })
  export class MaterialModule {}
  
@NgModule({
 imports:      [ CommonModule,NgAisModule,GlobalModule,TemplatesModule,MaterialModule],
 declarations: [ ProductsListComponent],
 exports:      [ ProductsListComponent]
})
export class ProductListModule { }