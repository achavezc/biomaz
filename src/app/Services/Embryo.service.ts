import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable ,  BehaviorSubject, throwError  } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig, MatSidenav } from '@angular/material';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "@angular/fire/database";
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import { catchError, tap } from 'rxjs/operators'
import 'rxjs/Rx';
import {host} from '../shared/hosts/main.host';
import { ReviewPopupComponent } from '../Global/ReviewPopup/ReviewPopup.component';
import { ConfirmationPopupComponent } from '../Global/ConfirmationPopup/ConfirmationPopup.component';

import { ConfirmationActionPopupComponent } from '../Global/ConfirmationActionPopup/ConfirmationActionPopup.component';

//import { AlertPopupComponent } from '../Global/AlertPopup/AlertPopup.component';
//import { CarritoService } from '../Services/carrito.service';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import {ErrorHandling} from '../shared/utils/error-handling';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

interface Response {
  data     : any;
}

@Injectable({
   providedIn: 'root'
})

export class EmbryoService
 {

   @BlockUI() blockUI: NgBlockUI;
   sidenavOpen                 : boolean = false;
   paymentSidenavOpen          : boolean = false;
   isDirectionRtl              : boolean = false;
   esUsuarioAutenticado              : boolean = false;
   featuredProductsSelectedTab : any = 0;
   newArrivalSelectedTab       : any = 0;
   

   /**** Get currency code:- https://en.wikipedia.org/wiki/ISO_4217 *****/
   currency  : string = 'PEN ';
   language  : string = 'english';     

   shipping  : number = 12.95;
   tax       : number = 27.95;

   products  : AngularFireObject<any>;

   localStorageCartProducts : any;
   localStorageWishlist : any;
   navbarCartCount : number = 0;
   navbarWishlistProdCount = 0;
   buyUserCartProducts : any;
   
   constructor(private http:HttpClient, 
               private dialog: MatDialog, 
               private db: AngularFireDatabase,
               private toastyService: ToastaService,   
               private router: Router,         
               private toastyConfig: ToastaConfig,
               private errorHandling: ErrorHandling) { 

      this.toastyConfig.position = "top-right";
      this.toastyConfig.theme = "material";
      this.calculateLocalWishlistProdCounts();
      localStorage.removeItem("user");
      localStorage.removeItem("byProductDetails");

      this.db.object("products").valueChanges().subscribe(res =>
          {
             this.setCartItemDefaultValue()
           }
          ); 
   }

   public setCartItemDefaultValue() 
   {
      let products : any;
      products = JSON.parse(localStorage.getItem("cart_item")) || [];  

      if(products.length>0)
      {
         localStorage.setItem("cart_item", JSON.stringify(products));
         this.calculateLocalCartProdCounts();
      }
   }

   public reviewPopup(singleProductDetails, reviews)
   {
      let review: MatDialogRef<ReviewPopupComponent>;
      const dialogConfig = new MatDialogConfig();
      if(this.isDirectionRtl) {
         dialogConfig.direction = 'rtl';
      } else {
         dialogConfig.direction = 'ltr';
      }

      review = this.dialog.open(ReviewPopupComponent, dialogConfig);
      review.componentInstance.singleProductDetails = singleProductDetails;
      review.componentInstance.reviews = reviews;

      return review.afterClosed();
   }

   /* public alertPopup(message:string)
   {
      let alertPopup: MatDialogRef<AlertPopupComponent>;
      alertPopup = this.dialog.open(AlertPopupComponent);
      alertPopup.componentInstance.message = message;

      return alertPopup.afterClosed();
   } */
   
   public confirmationPopup(message:string)
   {
      let confirmationPopup: MatDialogRef<ConfirmationPopupComponent>;
      confirmationPopup = this.dialog.open(ConfirmationPopupComponent);
      confirmationPopup.componentInstance.message = message;

      return confirmationPopup.afterClosed();
   }

  


   public confirmationActionPopup(message:string)
   {
      let confirmationPopup: MatDialogRef<ConfirmationActionPopupComponent>;
      confirmationPopup = this.dialog.open(ConfirmationActionPopupComponent);
      confirmationPopup.componentInstance.message = message;

      return confirmationPopup.afterClosed();
   }

   public getProducts() {
      this.products = this.db.object("products");
      return this.products;
   }

   public checkout() 
   {

      var usuario = this.isLoggedIn();

      if(usuario.Autenticado)
      {
         this.updateAllLocalCartProduct(this.localStorageCartProducts,usuario.MiembroId);         
      }
      else
      {
         this.router.navigate(['/checkout'])
      }
   }

   public buyNow(data:any) {
      let products : any;
      products = JSON.parse(localStorage.getItem("cart_item")) || [];

      let found = products.some(function (el, index) {
         if(el.name == data.name){
            if(!data.quantity) { data.quantity = 1}
            products[index]['quantity'] = data.quantity;
            return  true;
         }
      });
      if (!found) { products.push(data); }

      localStorage.setItem("cart_item", JSON.stringify(products));
      this.calculateLocalCartProdCounts();
   }

   public updateAllLocalCartProduct(products:any,miembroId:number) 
   {
      let productsCar : any;
      productsCar = JSON.parse(localStorage.getItem("cart_item")) || [];

      let productsLength = products.length;
      
      var carritoActualizado:any =[];

      if(productsLength > 0)
      {
         for(let i = 0; i < productsLength; i++) 
         {
               let found = productsCar.some(function (el, index) 
               {
                  if(el.id == products[i]['id'] && el.quantity != Number(products[i]['quantity']))
                  {   
                     carritoActualizado.push(
                        {
                       
                        ProyectoId: el.id,
                        CarritoCompraId : el.carritoid,
                        MiembroId: miembroId,
                        Cantidad: Number(products[i]['quantity']),      
                        Estado: true
                        }) 
                     return  true;
                  }
               });            
         }   
         
         if(carritoActualizado.length > 0)
         {
            this.actualizarCarritoMasivo(miembroId,carritoActualizado).subscribe(
               response => 
               {     
                  localStorage.removeItem('cart_item');

                  localStorage.setItem("cart_item", JSON.stringify(products))
                  
                  this.router.navigate(['/checkout/final-receipt']);
                  
               }); 
            
         }
         else
         {
            this.router.navigate(['/checkout/final-receipt']);
         }
        
      }
   }

   

  
 
   // Adding new Product to Wishlist in localStorage
   public addToWishlist(data: any){
      let toastOption: ToastOptions = {
         title: "Adding Product To Wishlist",
         msg: "Product adding to the wishlist",
         showClose: true,
         timeout: 1000,
         theme: "material"
      };

      let products : any;
      products = JSON.parse(localStorage.getItem("wishlist_item")) || [];
      let productsLength = products.length;

      let found = products.some(function (el, index) {
         if(el.name == data.name){
            if(!data.quantity) { data.quantity = 1}
            products[index]['quantity'] = data.quantity;
            return  true;
         }
      });
      if (!found) { products.push(data); }

      if(productsLength == products.length) {
         toastOption.title = "Product Already Added";
         toastOption.msg = "You have already added this product to wishlist";
      }

      this.toastyService.wait(toastOption);
      setTimeout(() => {
         localStorage.setItem("wishlist_item", JSON.stringify(products));
         this.calculateLocalWishlistProdCounts();
      }, 500);
      
   }

   // returning LocalWishlist Product Count
   public calculateLocalWishlistProdCounts() {

      this.localStorageWishlist = null;
      this.localStorageWishlist = JSON.parse(localStorage.getItem("wishlist_item")) || [];
      this.navbarWishlistProdCount = +((this.localStorageWishlist).length);
   }

   // Removing Wishlist from local
   public removeLocalWishlistProduct(product: any) {
      let products: any = JSON.parse(localStorage.getItem("wishlist_item"));

      for (let i = 0; i < products.length; i++) {
         if (products[i].productId === product.productId) {
           products.splice(i, 1);
           break;
         }
      }

      const toastOption: ToastOptions = {
         title: "Remove Product From Wishlist",
         msg: "Product removing from wishlist",
         showClose: true,
         timeout: 1000,
         theme: "material"
      };


      this.toastyService.wait(toastOption);
      setTimeout(() => {
         // ReAdding the products after remove
         localStorage.setItem("wishlist_item", JSON.stringify(products));
         this.calculateLocalWishlistProdCounts();
      }, 500);
      
   }

   public addAllWishListToCart(dataArray:any) {
      let a : any;
      a = JSON.parse(localStorage.getItem("cart_item")) || [];

      for(let singleData of dataArray) {
         a.push(singleData);
      }

      let toastOption: ToastOptions = {
         title: "Adding All Product To Cart",
         msg: "Products adding to the cart",
         showClose: true,
         timeout: 1000,
         theme: "material"
      };

      this.toastyService.wait(toastOption);
      setTimeout(() => {
         localStorage.removeItem('wishlist_item');
         localStorage.setItem("cart_item", JSON.stringify(a));
         this.calculateLocalCartProdCounts();
         this.calculateLocalWishlistProdCounts();
      }, 500);

   }
  
   /**
    * getBlogList used to get the blog list. 
    */
   public getBlogList()
   {
      let blogs : any;
      blogs = this.db.list("blogs");
      return blogs;
   }

   /**
    * getContactInfo used to get the contact infomation. 
    */
   public getContactInfo()
   {
      let contact : any;
      contact = this.db.object("contact");
      return contact;
   }

   /**
    * getTermCondition used to get the term and condition. 
    */
   public getTermCondition()
   {
      let termCondition : any;
      termCondition = this.db.list("term_condition");
      return termCondition;
   }

   /**
    * getPrivacyPolicy used to get the privacy policy.
    */
   public getPrivacyPolicy()
   {
      let privacyPolicy : any;
      privacyPolicy = this.db.list("privacy_policy");
      return privacyPolicy;
   }

   /**
    * getFaq used to get the faq.
    */
   public getFaq()
   {
      let faq : any;
      faq = this.db.object("faq");
      return faq;
   }

   /**
    * getProductReviews used to get the product review.
    */
   public getProductReviews()
   {
      let review : any;
      review = this.db.list("product_reviews");
      return review;
   }

   /**
    * Buy Product functions 
    */
   public addBuyUserDetails(formdata) {
      localStorage.setItem("user", JSON.stringify(formdata));
      
      let product = JSON.parse(localStorage.getItem("cart_item"))
      localStorage.setItem("byProductDetails", JSON.stringify(product));
      this.buyUserCartProducts = JSON.parse(localStorage.getItem("byProductDetails"))

      localStorage.removeItem("cart_item");
      this.calculateLocalCartProdCounts();
   }

   public removeBuyProducts() {
      localStorage.removeItem("byProductDetails");
      this.buyUserCartProducts = JSON.parse(localStorage.getItem("byProductDetails"))
   }

   /**
    * getTeam used to get the team data.
    */
   public getTeam()
   {
      let team : any;
      team = this.db.list("team");
      return team;
   }

   /**
    * getTestimonial used to get the testimonial data.
    */
   public getTestimonial() {
      let testimonial : any;
      testimonial = this.db.object("testimonial");
      return testimonial;
   }

   /**
    * getMissionVision used to get the Mission and Vision data.
    */
   public getMissionVision() {
      let mission_vision : any;
      mission_vision = this.db.list("mission_vision");
      return mission_vision;
   }

   /**
    * getAboutInfo used to get the about info data.
    */
   public getAboutInfo() {
      let about_info : any;
      about_info = this.db.object("about_info");
      return about_info;
   }
   
 
   //Carrito

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

       let found = products.some(function (el, index) 
       {
          if(el.id == data.id)
          {      
             products[index]['quantity'] = Number(data.quantity);
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
            quantity: Number(data.quantity),
            price: data.price,
            state:true
           } 
        
          products.push(carritoItem); 
         }



       if(productsLength == products.length) 
       {
          toastOption.title = "Proyecto ya agregado al Carrito";
          toastOption.msg = "Ya ha agregado este proyecto a su lista de compras";
       }


      this.toastyService.wait(toastOption);         

      let usuario = this.isLoggedIn();

      localStorage.setItem("cart_item", JSON.stringify(products));

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

               let products : any;
               products = JSON.parse(localStorage.getItem("cart_item")) || [];
               

               let found = products.some(function (el, index) 
               {
                  if(el.id == response.ProyectoId)
                  {      
                     products[index]['carritoid'] =response.CarritoCompraId;
                     localStorage.setItem("cart_item", JSON.stringify(products));
                     return  true;
                  }
               });

               localStorage.setItem("cart_item", JSON.stringify(products));

               this.calculateLocalCartProdCounts();

               console.log('actualizarCarrito correctamente'); 
                
            }); 
       }
       else
       {
         localStorage.setItem("cart_item", JSON.stringify(products));

         this.calculateLocalCartProdCounts();
       }
       
    }

    public removeLocalBuyProduct() 
    {
      localStorage.removeItem("cart_item");
      this.calculateLocalCartProdCounts();
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

      let usuario = this.isLoggedIn();

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
      const url = `${host}CarritoCompra` + '/ActualizarCarritoCompra';
      const body: any = {
         CarritoCompraId: carritoCompraId,
         MiembroId: miembroId,
         ProyectoId: proyectoId,
         Cantidad: cantidad,
         Estado: estado,
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

  private actualizarCarritoMasivo(miembroId:number, carritoCompra: any)
  {
      const url = `${host}CarritoCompra` + '/ActualizarCarritoCompraMasivo';
     /*  let body:any =[];

        carritoCompra.map(itemCarrito => {
         body.push({
             
         ProyectoId: itemCarrito.id,
         CarritoCompraId : itemCarrito.carritoid,
         MiembroId: miembroId,
         Cantidad: itemCarrito.quantity,      
         Estado: itemCarrito.state
         })
         
     });      */


      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<any>(url, carritoCompra, { headers: headers })
          .pipe(tap(data =>
          {        

            return true;
          }),
              catchError(this.handleError)
          ); 
  }

   //End Carrito


   //Autenticacion

  /*  public goToHome() {                     
                     this.router.navigate(['/']).then(() => {
                        window.location.reload();
                      });
                  } */

                
                  public goToHome() 
                  {                     
                     //this.router.navigate(['/']);

                     this.router.navigate(['/']).then(() => {
                        window.location.reload();
                      });
                      
                  }



   public registrarUsuario(userName: string,password: string,apellidos: string,nombres: string, tipoDocumentoId: string,numeroDocumento: string, bancoId: number, numeroCuentaBancaria: string,numeroCuentaInterBancaria: string)
   {
         const url = `${host}User`;
         const body: any = {
            UserName: userName,
            Apellidos: apellidos,
            Nombres: nombres,
            Password: password,          
            TipoDocumentoId: tipoDocumentoId,
            NumeroDocumento: numeroDocumento,
            BancoId: bancoId,
            NumeroCuentaBancaria: numeroCuentaBancaria,
            NumeroCuentaInterBancaria: numeroCuentaInterBancaria,
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

   public contactar(nombres: string,apellidos: string,email: string, asunto: string,mensaje: string)
   {
      const url = `${host}Contacto` + '/Contactar';
         const body: any = {
            Apellidos: apellidos,
            Nombres: nombres,
            Email: email,          
            Asunto: asunto,
            Mensaje: mensaje
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


   public validateLoginUser(userName: string, password: string)
   {
       const url = `${host}Authenticate`;
       const body: any = {
           UserName: userName,
           Password: password,
           Token: '',
         };
      
         this.blockUI.start("Iniciando Sesión...");

       let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       return this.http.post<any>(url, body, { headers: headers })
           .pipe(tap(data =>
           {                    
               if (data.Token != null)
               {   
                  let toastOption: ToastOptions = {
                     title: "Iniciando Sesión",
                     msg: "Usuario auntenticado con exito.",
                     showClose: true,
                     timeout: 1000,
                     theme: "material"
                  };
            
                  this.toastyService.wait(toastOption);

                   localStorage.setItem('currentUser', JSON.stringify(data));

                  

                  //  var products : any;
                  //  products =  JSON.parse(localStorage.getItem("cart_item")) || [];
                  
                  var products : any;
                  products =  this.localStorageCartProducts || [];

                   let productsLength = products.length;                                    

                   if(data.CarritoCompra.length)
                   {
                     var carrito : any;  
                     carrito = [];
                       data.CarritoCompra.map(aux => {
                           carrito.push({
                               
                           id: aux.ProyectoId,
                           carritoid: aux.CarritoCompraId,
                           image: aux.Imagen,
                           price: aux.Precio,      
                           name: aux.NombreProyecto,
                           title: aux.NombreProyecto,
                           quantity: aux.Cantidad, 
                           state: null      
                           })
                           
                       });                                                
                                       
                       for (let i = 0; i < productsLength; i++) 
                       {
                           let found = carrito.some(function (el, index) 
                           {
                               if(el.id == products[i]['id'])
                               {      
                               carrito[index]['quantity']  = Number(carrito[index]['quantity']) + Number(products[i]['quantity']);
                               carrito[index]['state'] = true;
                               return  true;
                               }
                           });   

                           if (!found) 
                           { 
                               carrito.push(products[i]); 
                           }                  
                       }    
                       
                       localStorage.setItem("cart_item", JSON.stringify(carrito));

                       this.calculateLocalCartProdCounts();
                       
                   }
                   else //no existe carrito en el servidor
                   {     
                     //carrito.push(products);

                     /* products.map(aux => {
                        carrito.push({
                            
                        ProyectoId: aux.id,
                        CarritoCompraId: aux.carritoid, 
                        Cantidad: aux.quantity
                        })
                        
                    });   */

                       localStorage.setItem("cart_item", JSON.stringify(products));
                   }      
                   
                    var carritoActualizar = products.filter(item=> (item.carritoid ==null)|| (item.carritoid != null && item.state) );
                  
                   if(carritoActualizar.length>0)
                   {                      
                     var body:any =[];

                     for (let index = 0; index < carritoActualizar.length; index++) 
                       {
                        body.push(
                           {
                          
                           ProyectoId: carritoActualizar[index]['id'],
                           CarritoCompraId : carritoActualizar[index]['carritoid'],
                           MiembroId: data.MiembroId,
                           Cantidad: carritoActualizar[index]['quantity'],      
                           Estado: carritoActualizar[index]['state']
                           }) 
                       }    

                     this.actualizarCarritoMasivo(data.MiembroId,body).subscribe(
                        response => 
                        {     
                           let responseLength = response.length;

                           if(responseLength>0)
                           {   
                              var products : any;
                              products =  JSON.parse(localStorage.getItem("cart_item")) || [];

                              let productsLength = products.length;

                              if(productsLength>0)
                              {
                                 for(let i = 0; i < responseLength; i++) 
                                 {
                                     let found = products.some(function (el, index) 
                                     {
                                         if(el.id == response[i]['ProyectoId'])
                                         {      
                                          products[index]['carritoid']  = response[i]['CarritoCompraId'];
                                         
                                         return  true;
                                         }
                                     });            
                                 }     
                                 
                              }

                              localStorage.setItem("cart_item", JSON.stringify(products));

                              console.log(response); 
                              console.log('actualizarCarrito correctamente'); 
                           }
                           this.blockUI.stop();
                           this.goToHome();
                            
                        }); 

                   } 
                   else
                   {
                     this.blockUI.stop();
                     this.goToHome();
                   }

                  

                   // return true to indicate successful login
                   return data;
               } 
               else 
               {
                  this.blockUI.stop();
                  //this.alertPopup("Usuario Incorrecto");
                   // return false to indicate failed login
                   let toastOption: ToastOptions = {
                     title: "Iniciando Sesión",
                     msg: "Usuario o Password incorrecto",
                     showClose: true,
                     timeout: 1000,
                     theme: "material"
                  };
            
                  this.toastyService.wait(toastOption);
                   return null;
               }
           }),
               catchError(this.handleError)
           );
   }

   LogoutUser() {
       localStorage.removeItem('currentUser');
       localStorage.removeItem('cart_item');
       this.calculateLocalCartProdCounts();
       this.goToHome();
   }

   public isLoggedIn() 
   {             
       let currentUser : any;

        localStorage.getItem('currentUser');  

       currentUser = JSON.parse(localStorage.getItem("currentUser"));
       
       let usuario: any = {
           Autenticado: false,
           RoleId:0,
           MiembroId: "",
           FullName:"",
           UserName:""
          };   

       if(currentUser)  
       {            
           usuario.Autenticado=true; 
           usuario.MiembroId=currentUser.MiembroId;  
           usuario.RoleId =     currentUser.RoleId;
           usuario.FullName =     currentUser.FullName;
           usuario.UserName =     currentUser.UserName;   
       }          

         return usuario;
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
   //

   public getOperacionPagoPorMiembroIdEstado(miembroId: number, estado: string): Observable<any> 
   {  
      const url = `${host}OperacionPago` + '/GetOperacionPagoPorMiembroIdEstado';
  
      const body: any = {
         MiembroId: miembroId,
         Estado: estado
      };
  
      return this.http.post<any>(url, body).catch(this.errorHandling.handleError);
    }

    public getOperacionPagoPorEstado(estado: string): Observable<any> 
    {  
       const url = `${host}OperacionPago` + '/GetOperacionPagoPorEstado';
   
       const body: any = {        
          Estado: estado
       };
   
       return this.http.post<any>(url, body).catch(this.errorHandling.handleError);
     }

  
    
    
  
    


}
