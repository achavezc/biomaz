import { Component, OnInit } from '@angular/core';
import { EmbryoService } from '../../../Services/Embryo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'embryo-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.scss']
})
export class RegisterComponent implements OnInit 
{

  @BlockUI() blockUI: NgBlockUI;

  popupResponse    : any;

    registerForm  : FormGroup;

   emailPattern : any = /\S+@\S+\.\S+/;

   tiposDocumento : any = [
    {
       id: 1,
       name:"Carnet de Extranjeria",       
       checked: true
    },
    {
      id: 2,
      name:"DNI",
      content: "2",
      checked: true
    }
     ]

    bancos : any = [
      {
        id: 1,
        name:"Banco de Crédito del Perú",
        checked: true
      },
      {
        id: 2,
        name:"Interbank",
        checked: true
      }
      ,
      {
        id: 3,
        name:"Scotiabank",
        checked: true
      }
      ,
      {
        id: 4,
        name:"BBVA Continental",
        checked: true
      }
    ]

   

   constructor(private formGroup : FormBuilder, public embryoService: EmbryoService, public router: Router)
   {
     
   }

   ngOnInit() 
   {
     this.registerForm = this.formGroup.group({                
       email      : ['', { validators: [Validators.required, Validators.pattern(this.emailPattern)] }],
       password    : ['', { validators: [Validators.required] }], 
       nombres    : ['', { validators: [Validators.required] }],
       apellidos    : ['', { validators: [Validators.required] }],
       tipoDocumento    : ['', { validators: [Validators.required] }],
       numeroDocumento    : ['', { validators: [Validators.required] }],
       banco    : [''],
       numeroCuentaBancaria    : [''],
       numeroCuentaInterbancaria    : [''] 
    }) 
   }

   

 public getPopupResponse(response:any) 
 {
    if(response)
     {
      this.router.navigate(['/']);  
    }
 }

 
   public submitForm() 
   {
      if(this.registerForm.valid)
      {
          this.blockUI.start("Registrando Cliente...");

           this.embryoService.registrarUsuario(this.registerForm.controls['email'].value,this.registerForm.controls['password'].value,
          this.registerForm.controls['apellidos'].value,this.registerForm.controls['nombres'].value,this.registerForm.controls['tipoDocumento'].value,
          this.registerForm.controls['numeroDocumento'].value,this.registerForm.controls['banco'].value,this.registerForm.controls['numeroCuentaBancaria'].value,
          this.registerForm.controls['numeroCuentaInterbancaria'].value).subscribe(
            response => 
            {     
                this.blockUI.stop();
                console.log(response);

                if (response.StatusCode == "409") 
                {
                  alert('El usuario ya existe.');
                  
                }
                else if (response.StatusCode == "200") 
                {                    
                    this.router.navigate(['/session/register-processsed']);
                }
                
             
               
                /* let message = "Se registró el usuario " + this.registerForm.controls['email'].value + ".";
                this.embryoService.confirmationActionPopup(message).
                   subscribe(res => {this.popupResponse = res},
                             err => console.log(err),
                             ()  => this.getPopupResponse(this.popupResponse)
                            ); */
            });  
      } 
      else 
      {
         for (let i in this.registerForm.controls) 
         {
            this.registerForm.controls[i].markAsTouched();
         }
      }
   }

  


  
}
