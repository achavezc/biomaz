import {Injectable} from '@angular/core';
import {host} from '../shared/hosts/main.host';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorHandling} from '../shared/utils/error-handling';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';

@Injectable()
export class CarritoService 
{

  private url = `${host}Carrito`;

  localStorageCartProducts : any;
  navbarCartCount : number = 0;

  
  constructor(private http: HttpClient,
              private errorHandling: ErrorHandling, 
              private toastyService: ToastaService,
              private toastyConfig: ToastaConfig) {
  }

  
 
    // Adding new Product to cart in localStorage
    public addToCart(data: any, type:any="")
    {
       let products : any;
       products = JSON.parse(localStorage.getItem("cart_item")) || [];
       let productsLength = products.length; 
 
       let toastOption: ToastOptions = {
          title: "Adding Product To Cart",
          msg: "Product adding to the cart",
          showClose: true,
          timeout: 1000,
          theme: "material"
       };
 
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
          toastOption.msg = "You have already added this product to cart list";
       }
 
       
 
       this.toastyService.wait(toastOption);
       setTimeout(() => {
          localStorage.setItem("cart_item", JSON.stringify(products));
          this.calculateLocalCartProdCounts();
       }, 500);
    }
// returning LocalCarts Product Count
public calculateLocalCartProdCounts() {
  this.localStorageCartProducts = null;
  this.localStorageCartProducts = JSON.parse(localStorage.getItem("cart_item")) || [];
  this.navbarCartCount = +((this.localStorageCartProducts).length);
}

  get(): Observable<any> {
    const url = `${this.url}/Get`;
    return this.http.get(url).catch(this.errorHandling.handleError);
  }

}
