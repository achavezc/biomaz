import { BrowserModule} from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, /*HttpClient*/} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgAisModule } from 'angular-instantsearch';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ToastaModule } from 'ngx-toasta';
import { BidiModule } from '@angular/cdk/bidi';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {Platform} from '@angular/cdk/platform';
import { environment } from '../environments/environment';
import { AppRoutes } from './app-routing';
import { GlobalModule } from './Global/Global.module';
import { TemplatesModule } from './Templates/Templates.module';
import { MenuItems } from './Core/menu/menu-items/menu-items';
import { EmbryoService } from './Services/Embryo.service';
//import { CarritoService } from './Services/carrito.service';
import { AppComponent } from './app.component';
import { MainComponent } from './Main/Main.component';
import { HeaderOneComponent } from './Layouts/Header/HeaderOne/HeaderOne.component';
import { HeaderTwoComponent } from './Layouts/Header/HeaderTwo/HeaderTwo.component';
import { HeaderThreeComponent } from './Layouts/Header/HeaderThree/HeaderThree.component';
import { FooterOneComponent } from './Layouts/Footer/FooterOne/FooterOne.component';
import { FooterTwoComponent } from './Layouts/Footer/FooterTwo/FooterTwo.component';
import { MenuComponent } from './Layouts/Menu/Menu/Menu.component';
import { HomeoneComponent } from './Pages/Home/HomeOne/HomeOne.component';
import { HomeTwoComponent } from './Pages/Home/HomeTwo/HomeTwo.component';
import { HomeThreeComponent } from './Pages/Home/HomeThree/HomeThree.component';
import { CartComponent } from './Pages/Cart/Cart.component';
import { NotFoundComponent } from './Pages/NotFound/NotFound.component';
import { SideBarMenuComponent } from './Layouts/Menu/SidebarMenu/SidebarMenu.component';
import { PaymentDetailSideBarComponent } from './Layouts/PaymentDetailSideBar/PaymentDetailSideBar.component';
import { FixedHeaderComponent } from './Layouts/Header/FixedHeader/FixedHeader.component';
import { ProductListModule } from './Pages/Products/ProductsList/ProductList.module';
import {HttpInterceptorImpl} from './shared/http-interceptor-impl';
import { CategoriaService } from './Services/categoria.service';
import { ProyectoService } from './Services/proyecto.service';
import {SharedModule} from './shared/shared.module';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {A11yModule} from '@angular/cdk/a11y';
import {ObserversModule} from '@angular/cdk/observers';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';



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
  declarations: [
    AppComponent,
    MainComponent,
    HomeoneComponent,
    HeaderOneComponent,
    FooterOneComponent,
    MenuComponent,
    SideBarMenuComponent,
    CartComponent,
    NotFoundComponent,
    PaymentDetailSideBarComponent,
    HomeTwoComponent,
    HeaderTwoComponent,
    FooterTwoComponent,
    HomeThreeComponent,
    HeaderThreeComponent,
    FixedHeaderComponent
  ],
  imports: [

    BrowserModule.withServerTransition({appId: 'embryo-seo-pre'}),
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {onSameUrlNavigation: 'reload'}),
    GlobalModule,
    TemplatesModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingBarRouterModule,
    LoadingBarModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'embryo'),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ToastaModule.forRoot(),
    SlickCarouselModule,
    NgAisModule,
    ProductListModule,
    SharedModule,
    CommonModule,
    DragDropModule,
    MaterialModule
    
  ],
   providers: [
      MenuItems,
      EmbryoService,
      CategoriaService,
      ProyectoService,
      Platform,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptorImpl,
        multi: true
      }
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
