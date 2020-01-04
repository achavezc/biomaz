import { Component, OnInit } from '@angular/core';
import { EmbryoService } from '../../../Services/Embryo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.scss']
})
export class ContactComponent implements OnInit {

   contactInfo  : any;
   emailPattern : any = /\S+@\S+\.\S+/;

   constructor(public embryoService : EmbryoService) {
      //this.embryoService.getContactInfo().valueChanges().subscribe(res => {this.contactInfo = res});
      this.contactInfo = 
   {
      "address":"Carretera Iquitos Nauta Km 8.2 Iquitos – Loreto – Perú",
      "mail" : "contacto@bioamaz.com",
      "call" : "+51 954828488",
      "info" : "Si tiene algún problema, sugerencia o comentario, no dude en contactarnos."
   };
}

   ngOnInit() {
      
   }
}

