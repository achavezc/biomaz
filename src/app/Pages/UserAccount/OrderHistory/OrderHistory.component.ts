import { Component, OnInit } from '@angular/core';
import { EmbryoService } from '../../../Services/Embryo.service';
import { Observable ,  BehaviorSubject, throwError  } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import {ErrorHandling} from '../../../shared/utils/error-handling';
import { catchError, tap } from 'rxjs/operators'
import { ProyectoService } from '../../../Services/proyecto.service';

@Component({
  selector: 'app-OrderHistory',
  templateUrl: './OrderHistory.component.html',
  styleUrls: ['./OrderHistory.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  popupResponse  : any;  

  displayedColumns: string[] = ['imagen','nombre', 'especie', 'cantidad', 'precio', 'action'];

    dataSource = [];   

  
   proyectos = [];



   constructor(public embryoService : EmbryoService, public proyectoService: ProyectoService,private http:HttpClient,private errorHandling: ErrorHandling) { }

   ngOnInit() 
   {
      this.loadProyectos();
   }

   

 

 public getTotalPrice() {
    let total = 0;
    if(this.proyectos && this.proyectos.length>0) {
       for(let product of this.proyectos) {
          total += product.precio;
       }
       // total += (this.embryoService.shipping+this.embryoService.tax);
       return total;
    }

    return total;
    
 }


  

       

   public loadProyectos() 
   {    
    var usuario = this.embryoService.isLoggedIn();
      
    if(usuario.Autenticado)
    {

      this.proyectoService.getProyectosPorMiembro(usuario.MiembroId)
      .subscribe(response => 
        {
          console.log(response);
          response.map(aux => {
            this.proyectos.push({
              proyectoId: aux.ProyectoId,
              imagen: aux.Imagen,
              nombre: aux.Nombre,
              cantidad:1,
              especie: aux.Especie,           
              moneda: aux.MonedaId,
              precio: aux.Precio
            })
          });
          console.log(this.proyectos);
          this.dataSource = this.proyectos;
          console.log(this.dataSource);
          
        }, err => {
          console.error(err);
        }
      );
    }
   }

   private handleError(error: HttpErrorResponse) {
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
