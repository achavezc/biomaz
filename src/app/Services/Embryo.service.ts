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
//import { AlertPopupComponent } from '../Global/AlertPopup/AlertPopup.component';
//import { CarritoService } from '../Services/carrito.service';
import { Router, ActivatedRoute, Params }   from '@angular/router';
interface Response {
  data     : any;
}

@Injectable({
   providedIn: 'root'
})

export class EmbryoService {

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
               private toastyConfig: ToastaConfig) { 

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
      localStorage.setItem("cart_item", JSON.stringify(products));
      this.calculateLocalCartProdCounts();
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

   public getProducts() {
      this.products = this.db.object("products");
      return this.products;
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

   public updateAllLocalCartProduct(products:any) {
      localStorage.removeItem('cart_item');

      localStorage.setItem("cart_item", JSON.stringify(products))
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

      let usuario = this.isLoggedIn();

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
            console.error('service actualizarCarrito correctamente');            

            return true;
          }),
              catchError(this.handleError)
          ); 
  }

   //End Carrito


   //Autenticacion

   public goToHome() {                     
                     this.router.navigate(['/']);
                  }

   public validateLoginUser(userName: string, password: string)
   {
       const url = `${host}Authenticate`;
       const body: any = {
           UserName: userName,
           Password: password,
           Token: '',
         };

       let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       return this.http.post<any>(url, body, { headers: headers })
           .pipe(tap(data =>
           {                    
               if (data.Token != null)
               {                   
                   localStorage.setItem('currentUser', JSON.stringify(data));

                   let products : any;
                   products =  JSON.parse(localStorage.getItem("cart_item")) || [];
                   
                   let productsLength = products.length; 

                   let carrito : any;
                   carrito = [];

                   if(data.CarritoCompra.length)
                   {
                       data.CarritoCompra.map(aux => {
                           carrito.push({
                               
                           id: aux.ProyectoId,
                           carritoid: aux.CarritoCompraId,
                           image: aux.Imagen,
                           price: aux.Precio,      
                           name: aux.NombreProyecto,
                           title: aux.NombreProyecto,
                           quantity: aux.Cantidad        
                           })
                           
                       });                                                
                                       
                       for (let i = 0; i < productsLength; i++) 
                       {
                           let found = carrito.some(function (el, index) 
                           {
                               if(el.id == products[i]['id'])
                               {      
                               carrito[index]['quantity']  = Number(carrito[index]['quantity']) + Number(products[i]['quantity']);
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
                       
                       localStorage.setItem("cart_item", JSON.stringify(products));
                   }      
                   
                    
                   let toastOption: ToastOptions = {
                     title: "Iniciando Sesión",
                     msg: "Usuario auntenticado con exito.",
                     showClose: true,
                     timeout: 1000,
                     theme: "material"
                  };
            
                  this.toastyService.wait(toastOption);

                  this.goToHome();

                   // return true to indicate successful login
                   return data;
               } 
               else 
               {
                  //this.alertPopup("Usuario Incorrecto");
                   // return false to indicate failed login
                   return null;
               }
           }),
               catchError(this.handleError)
           );
   }

   LogoutUser() {
       localStorage.removeItem('currentUser');
   }

   public isLoggedIn() 
   {             
       let currentUser : any;

        localStorage.getItem('currentUser');  

       currentUser = JSON.parse(localStorage.getItem("currentUser"));
       
       let usuario: any = {
           Autenticado: false,
           MiembroId: ""
          };   

       if(currentUser)  
       {            
           usuario.Autenticado=true; 
           usuario.MiembroId=currentUser.MiembroId;             
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



}
