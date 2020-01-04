import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { EmbryoService } from '../../../Services/Embryo.service';

declare var $: any;

@Component({
  selector: 'app-PaymentProcesssed',
  templateUrl: './PaymentProcesssed.component.html',
  styleUrls: ['./PaymentProcesssed.component.scss']
})
export class PaymentProcesssedComponent implements OnInit {

   

   constructor(public embryoService: EmbryoService, public router: Router) {
      
      
   }

   ngOnInit() 
   {
      this.embryoService.removeLocalBuyProduct();
      
   }

   

   

   

   

   public goToHome() {
      
      this.router.navigate(['/']);
   }

   
}
