/* import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import {host} from '../shared/hosts/main.host';
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';

import { EmbryoService } from '../Services/Embryo.service';

@Injectable({
   providedIn: 'root'
})

export class CarritoService 
{

  //private url = `${host}CarritoCompra`;
  private url = `${host}CarritoCompra`;

  localStorageCartProducts : any;
  navbarCartCount : number = 0;

  
  constructor(private _http: HttpClient,
               private _Route: Router,
              private toastyService: ToastaService,
              private toastyConfig: ToastaConfig,
              private embryoService: EmbryoService) 
              {
  }

  
 
    // Adding new Product to cart in localStorage
    public addToCart(data: any, type:any="")
    {
       let products : any;
       products = JSON.parse(localStorage.getItem("cart_item")) || [];
       let productsLength = products.length; 
 
       let toastOption: ToastOptions = {
          title: "Agregando Proyecto al Carrito",
          msg: "Proyecto agregado al Carrito",
          showClose: true,
          timeout: 1000,
          theme: "material"
       };
 
       if(!data.quantity)
       {
         data.quantity = 1
       }

       let found = products.some(function (el, index) {
          if(el.id == data.id)
          {      
             products[index]['quantity'] = data.quantity;
             return  true;
          }
       });
             

       if (!found) 
       { 
           let carritoItem: any = 
           {
            id: data.id,
            carritoid: null,
            image: data.image,
            name: data.name,
            title: data.name,
            quantity: data.quantity,
            price: data.price
           } 
        
          products.push(carritoItem); 
         }



       if(productsLength == products.length) 
       {
          toastOption.title = "Proyecto ya agregado al Carrito";
          toastOption.msg = "Ya ha agregado este proyecto a su lista de compras";
       }



      this.toastyService.wait(toastOption);      

      localStorage.setItem("cart_item", JSON.stringify(products));

      this.calculateLocalCartProdCounts();

      let usuario = this.embryoService.isLoggedIn();

       if(usuario.Autenticado)
       {             
         let codigoCarritoCompra : number;

          if(found) //Actualizacioón
          {
            codigoCarritoCompra = 1;
          }

         this.actualizarCarrito(codigoCarritoCompra,usuario.MiembroId,data.id,data.quantity, true).subscribe(
            response => 
            {     
               console.log('actualizarCarrito correctamente'); 
                
            }); 
       }
       
    }


    // Removing cart from local
   public removeLocalCartProduct(data: any) 
   {
      let products: any = JSON.parse(localStorage.getItem("cart_item"));

      for (let i = 0; i < products.length; i++) 
      {
         if (products[i].id === data.id) 
         {
           products.splice(i, 1);
           break;
         }
      }

      let toastOption: ToastOptions = {
         title: "Removiendo Proyecto del Carrito",
         msg: "Proyecto removido del carrito",
         showClose: true,
         timeout: 1000,
         theme: "material"
      };

      this.toastyService.wait(toastOption);

      localStorage.setItem("cart_item", JSON.stringify(products));

      this.calculateLocalCartProdCounts();

      let usuario = this.embryoService.isLoggedIn();

       if(usuario.Autenticado)
       {
         this.actualizarCarrito(0,usuario.MiembroId,data.id,data.quantity, false).subscribe(
            response => 
            {     
               console.log('actualizarCarrito correctamente'); 
                
            }); 
       }
      
   }


// returning LocalCarts Product Count
public calculateLocalCartProdCounts() {
  this.localStorageCartProducts = null;
  this.localStorageCartProducts = JSON.parse(localStorage.getItem("cart_item")) || [];
  this.navbarCartCount = +((this.localStorageCartProducts).length);
} 

 


  private actualizarCarrito(carritoCompraId: number, miembroId: number,proyectoId: number, cantidad: number, estado: boolean)
  {
      const url = `${this.url}` + '/ActualizarCarritoCompra';
      const body: any = {
         CarritoCompraId: carritoCompraId,
         MiembroId: miembroId,
         ProyectoId: proyectoId,
         Cantidad: cantidad,
         Estado: estado,
        };    


      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this._http.post<any>(url, body, { headers: headers })
          .pipe(tap(data =>
          {              
            console.error('service actualizarCarrito correctamente');            

            return true;
          }),
              catchError(this.handleError)
          ); 
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
 */