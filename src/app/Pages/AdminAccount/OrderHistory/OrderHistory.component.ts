import { Component, OnInit } from '@angular/core';
import { EmbryoService } from '../../../Services/Embryo.service';
import {host} from '../../../shared/hosts/main.host';
import { Observable ,  BehaviorSubject, throwError  } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import {ErrorHandling} from '../../../shared/utils/error-handling';
import { catchError, tap } from 'rxjs/operators'
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-OrderHistory',
  templateUrl: './OrderHistory.component.html',
  styleUrls: ['./OrderHistory.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  popupResponse  : any;

  displayedColumns: string[] = ['ordenId', 'propietario', 'fechaOperacion', 'moneda', 'monto','action'];

   dataSource = []; 
  
   order_history = [];



   constructor(public embryoService : EmbryoService,private http:HttpClient,private errorHandling: ErrorHandling) { }

   ngOnInit() 
   {
      this.loadPendientes();
   }

   public confirmarOperacion(ordenId:number)
  {
        let message = "¿Está seguro de querer confirmar el Pago de la Operación Nro:" +  String(ordenId) +  "?";
        this.embryoService.confirmationPopup(message).subscribe(res => {this.popupResponse = res},
          err => console.log(err),
        ()  => this.getPopupResponse(this.popupResponse, ordenId)
        );
  }

       public getPopupResponse(response, value) 
       {
        if(response)
        {
            this.blockUI.start("Confirmando Pago...");
            this.actualizarOperacion(value,"01").subscribe(
            response => 
            {   
              this.blockUI.stop(); 
              this.order_history = this.order_history.filter(obj => obj.ordenId !== value);
              this.dataSource =  this.order_history; 
               console.log('actualizarOperacion correctamente'); 
                
            });          
         }
        }
     
     private actualizarOperacion(ordenId: number,estado: string)
    {
        const url = `${host}OperacionPago` + '/ActualizarOperacionPago';
        const body: any = {
          OperacionPagoId: ordenId,
          Estado:estado,
          };    

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(url, body, { headers: headers })
            .pipe(tap(data =>
            {           

              return data;
            }),
                catchError(this.handleError)
            ); 
    }

   public loadPendientes() 
   {
      var usuario = this.embryoService.isLoggedIn();

      if(usuario.Autenticado)
      {
          this.embryoService.getOperacionPagoPorEstado('01')
          .subscribe(response => 
            {
              console.log(response);
              response.map(aux => {
                this.order_history.push({
                  ordenId: aux.OperacionPagoId,
                  propietario: aux.Nombres + ' ' + aux.Apellidos,
                  fechaOperacion: aux.FechaConfirmacionOperacion,
                  moneda: aux.MonedaId,
                  monto: aux.Monto,
                  action:''
                })      
              });
              
              
              this.dataSource = this.order_history;

              // this.dataSource = new MatTableDataSource<any>(this.DATA);
              // this.changeDetectorRef.detectChanges();
              // this.dataSource.paginator = this.paginator;
              // this.obs = this.dataSource.connect();
            }, err => {
              console.error(err);
            }
          );
        }
   }

   private handleError(error: HttpErrorResponse) 
   {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
};
}
