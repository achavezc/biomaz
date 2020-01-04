import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { EmbryoService } from '../../../Services/Embryo.service';

declare var $: any;

@Component({
  selector: 'app-RegisterProcesssed',
  templateUrl: './RegisterProcesssed.component.html',
  styleUrls: ['./RegisterProcesssed.component.scss']
})
export class RegisterProcesssedComponent implements OnInit {

   

   constructor(public embryoService: EmbryoService, public router: Router) {
      
      
   }

   ngOnInit() 
   {
      
      
   }

   

   

   

   

   public goToHome() {
      
      this.router.navigate(['/']);
   }

   
}
