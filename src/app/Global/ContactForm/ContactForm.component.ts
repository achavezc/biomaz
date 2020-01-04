import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { EmbryoService } from '../../Services/Embryo.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';

@Component({
  selector: 'embryo-ContactForm',
  templateUrl: './ContactForm.component.html',
  styleUrls: ['./ContactForm.component.scss']
})
export class ContactFormComponent implements OnInit {

   contactForm  : FormGroup;
   emailPattern : any = /\S+@\S+\.\S+/;
   @BlockUI() blockUI: NgBlockUI;
   
   


   constructor(private formGroup : FormBuilder, public embryoService: EmbryoService,private toastyService: ToastaService) { }

   ngOnInit() {
      this.contactForm = this.formGroup.group({
         first_name : ['', { validators: [Validators.required] }],
         last_name  : ['', { validators: [Validators.required] }],
         email      : ['', { validators: [Validators.required, Validators.pattern(this.emailPattern)] }],
         subject    : ['', { validators: [Validators.required] }],
         message    : ['', { validators: [Validators.required] }]
      })
   }

   public submitForm() {
      if(this.contactForm.valid)
      {
         this.blockUI.start("Enviando Mensaje...");

           this.embryoService.contactar(this.contactForm.controls['first_name'].value,this.contactForm.controls['last_name'].value,
          this.contactForm.controls['email'].value,this.contactForm.controls['subject'].value,this.contactForm.controls['message'].value).subscribe(
            response => 
            {     
               

                console.log(response);

                
                let toastOption: ToastOptions = {
                     title: "Contáctanos",
                     msg: "Mensaje enviado con exito.",
                     showClose: true,
                     timeout: 1000,
                     theme: "material"
                  };
            
                  this.toastyService.success(toastOption);       
                  
                  
                  this.contactForm.reset();
                  
                  
                
                  this.blockUI.stop();
            });  
      } 
      else 
      {
         for (let i in this.contactForm.controls) 
         {
            this.contactForm.controls[i].markAsTouched();
         }
      }
   }

}
