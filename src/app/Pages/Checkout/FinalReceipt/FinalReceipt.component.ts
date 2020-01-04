import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { EmbryoService } from '../../../Services/Embryo.service';
/* import { FormGroup, FormBuilder, Validators } from '@angular/forms'; */
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $: any;
declare var Culqi: any;

@Component({
  selector: 'app-FinalReceipt',
  templateUrl: './FinalReceipt.component.html',
  styleUrls: ['./FinalReceipt.component.scss']
})
export class FinalReceiptComponent implements OnInit 
{
   // finalReceiptForm  : FormGroup;

   @BlockUI() blockUI: NgBlockUI;


   deliveryDate : any;
   products     : any;
   userDetails  : any;
   todayDate    : any = new Date();
   miembroId : number = 0;

   public myVar : string = "PEN";

   mediosPago : any = [
      {
         id: 1,
         name:"Tarjeta de Debito/Credito",
         content: "Tarjeta de Debito/Credito",
         checked: true,
         disabled:false
      },
      {
         id: 2,
         name:"Deposito/Transferencia",
         content: "Deposito/Transferencia",
         checked: false,
         disabled:true
      }
   ]

   constructor(/* private formGroup : FormBuilder, */public embryoService: EmbryoService, public router: Router) {
      // this.getDeliveryDate();
      // this.userDetails = JSON.parse(localStorage.getItem("user"));
   }

   ngOnInit() 
   {
      window['angularComponentReference'] = { component: this, mostrarBlockFunction: () => this.Mostrarblock(), 
         ocultarBlockFunction: () => this.Ocultarblock(), obtenerUsuarioFunction: () => this.ObtenerUsuario()  }; 
      
      /* this.finalReceiptForm = this.formGroup.group({         
         medioPago    : ['', { validators: [Validators.required] }]
      }) */
      Culqi.publicKey = 'pk_test_w5yyIOl952WhHSQ1';

      let tmpThis = this
      
      var usuario = this.embryoService.isLoggedIn();

       if(usuario.Autenticado)
       {  
         this.miembroId = usuario.MiembroId;
       }
       

      $(document).ready(function()  
      {
         $('#buyButton').on('click', function (e) 
         {
            let montoTotal: number;
            montoTotal = tmpThis.getTotalPrice();
            
            Culqi.settings(
               {
               title: 'BEE QUEEN COIN - Pago',
               currency: "PEN",
               description: 'Proyectos',
               amount: montoTotal.toFixed(2).split('.').join("")
         });

            Culqi.open();
            e.preventDefault();

         });   
         
      });
      

   }

   ObtenerUsuario() 
   {
      var miembroId = 0;
      
      var usuario = this.embryoService.isLoggedIn();

      if(usuario.Autenticado)
      {
         miembroId = usuario.MiembroId;         
      }
     return miembroId;
   }

   Mostrarblock() 
   {
     this.blockUI.start("Procesando Pago...");
   }
 
   Ocultarblock() 
   {
     this.blockUI.stop();
   }


   /* ngAfterViewInit(): void 
   {
      Culqi.publicKey = 'pk_test_w5yyIOl952WhHSQ1';

      $(document).ready(() =>
       {
         $('#buyButton').on('click', function (e) {
         
            Culqi.settings(
               {
               title: 'BEE QUEEN COIN - Pago',
               currency: this.myVar,
               description: 'Proyectos',
               amount: 3500
         });

            Culqi.open();
            e.preventDefault();

         });  
        });
} */


   public getDeliveryDate() {
      this.deliveryDate = new Date();
      this.deliveryDate.setDate(this.deliveryDate.getDate() + 5); 
   }

   public calculateProductSinglePrice(product:any, value: any) {
      let price = 0;
      if(!value) {
         value = 1;
      }
      price = product.price*value;
      return price;
   }

   public calculateTotalPrice() {
      let subtotal = 0;
      if(this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length>0) {
         for(let product of this.embryoService.localStorageCartProducts) {
            subtotal += (product.price *product.quantity);
         }
         return subtotal;
      }
      return subtotal;
      
   }

   public getTotalPrice() {
      let total = 0;
      if(this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length>0) {
         for(let product of this.embryoService.localStorageCartProducts) {
            total += (product.price*product.quantity);
         }
         // total += (this.embryoService.shipping+this.embryoService.tax);
         return total;
      }

      return total;
      
   }

   public getQuantityValue(product) {
      if(product.quantity) {
         return product.quantity
      } else {
         return 1;
      }
   }

   public goToHome() {
      // this.embryoService.removeBuyProducts();
      this.router.navigate(['/']);
   }

   public printDiv() 
   {
      var printContents = $( $('#payment-receipt').html() );
      var originalContents = $('body > *').hide();
      $('body').append( printContents );
      window.print();
      printContents.remove();
      originalContents.show();
   }

   public procesarOrden() 
   {
      /* if(this.finalReceiptForm.valid)
      {
         var idMedioPago = this.finalReceiptForm.controls['medioPago'].value
          
      } 
      else 
      {
         for (let i in this.finalReceiptForm.controls) 
         {
            this.finalReceiptForm.controls[i].markAsTouched();
         }
      } */
     

   }
}
