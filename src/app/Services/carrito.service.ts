import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import {host} from '../shared/hosts/main.host';
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import { AutenticacionService } from '../Services/autenticacion.service';


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
              private autenticacionService: AutenticacionService) 
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
 
       let found = products.some(function (el, index) {
          if(el.id == data.id){
             if(!data.quantity) { data.quantity = 1}
             products[index]['quantity'] = data.quantity;
             return  true;
          }
       });
       

       if (!found) 
       { 
          /* let carritoItem: any = {
            id: data.id,
            image: data.image,
            name: data.name,
            quantity: data.quantity,
            price: data.price
           };  

           let x = JSON.stringify(products); */
 
          products.push(data); 
         }

       if(productsLength == products.length) 
       {
          toastOption.title = "Proyecto ya agregado al Carrito";
          toastOption.msg = "Ya ha agregado este proyecto a su lista de compras";
       }

    /*    this.toastyService.wait(toastOption);
      setTimeout(() => {
         localStorage.setItem("cart_item", JSON.stringify(products));
         this.calculateLocalCartProdCounts();
      }, 500); */


      this.toastyService.wait(toastOption);      

      localStorage.setItem("cart_item", JSON.stringify(products));

      this.calculateLocalCartProdCounts();

      let usuario = this.autenticacionService.isLoggedIn();

       if(usuario.Autenticado)
       {   
         this.actualizarCarrito(null,usuario.MiembroId,data.id,1, true).subscribe(
            response => 
            {     
               console.error('actualizarCarrito correctamente'); 
                
            }); 
       }
 
       
 
       
       /*
       this.toastyService.wait(toastOption);
       setTimeout(() => 
       {
          localStorage.setItem("cart_item", JSON.stringify(products));
          let usuario = this.autenticacionService.isLoggedIn();
          if(usuario.Autenticado)
          {
            this.actualizarCarrito(0,usuario.MiembroId,data.id,1, true)

          }
          this.calculateLocalCartProdCounts();
       }, 500); */
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
