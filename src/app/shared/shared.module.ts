import {NgModule, ErrorHandler} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {IsResponsiveDirective} from './directives/is-responsive.directive';
 import {AppErrorHandler} from './services/app-error-handler';
// import {DateEsPipe} from './pipes/date-es.pipe';
// import {HideZero} from '../hide-zero.pipe';
// import {FormatDecimal} from './pipes/format-decimal.pipe';
import {StorageService} from './storage-service';
// import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
// import {TimeoutComponent} from './components/timeout/timeout.component';
// import {ProductsService} from './products-service';
// import {DatalayerService} from './services/datalayer.service';
// import {TarjetaService} from '../services/tarjeta.service';
// import {AccesoService} from '../services/acceso.service';
// import {UtilsService} from '../services/utils.service';
import {ErrorHandling} from './utils/error-handling';
//import { NoRightClickDirective } from './directives/no-right-click.directive';

@NgModule({
  declarations: [
    // IsResponsiveDirective,
    // DateEsPipe,
    // HideZero,
    // PageNotFoundComponent,
    // TimeoutComponent,
    // FormatDecimal,
    // NoRightClickDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    // IsResponsiveDirective,
    // DateEsPipe,
    // HideZero,
    // TimeoutComponent,
    // FormatDecimal,
    // NoRightClickDirective
  ],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandler},
    StorageService,
    // ProductsService,
    // DatalayerService,
    // TarjetaService,
    // AccesoService,
    // UtilsService,
    ErrorHandling
  ]
})
export class SharedModule {
}
