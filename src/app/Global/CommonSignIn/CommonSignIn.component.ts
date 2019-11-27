import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmbryoService } from '../../Services/Embryo.service';

@Component({
  selector: 'embryo-SignIn',
  templateUrl: './CommonSignIn.component.html',
  styleUrls: ['./CommonSignIn.component.scss']
})
export class CommonSignInComponent implements OnInit {

   commonSignInForm  : FormGroup;
   emailPattern : any = /\S+@\S+\.\S+/;

   constructor(private formGroup : FormBuilder,public embryoService: EmbryoService) { }

   ngOnInit() {
      this.commonSignInForm = this.formGroup.group({         
         email      : ['', { validators: [Validators.required, Validators.pattern(this.emailPattern)] }],
         password    : ['', { validators: [Validators.required] }]
      })
   }

   public submitForm() {
      if(this.commonSignInForm.valid)
      {
         console.log(this.commonSignInForm.controls['email'])

          this.embryoService.validateLoginUser(this.commonSignInForm.controls['email'].value,this.commonSignInForm.controls['password'].value).subscribe(
            response => 
            {     
                console.log(response);
                if (response.Token == null && response.Token == "") 
                {
                  console.log("no login");
                    // let config = new MatSnackBarConfig();
                    // config.duration = this.setAutoHide ? this.autoHide : 0;
                    // config.verticalPosition = this.verticalPosition;
                  
                    // this.snackBar.open("Invalid Username and Password", this.action ? this.actionButtonLabel : undefined, config);

                    //this._Route.navigate(['Login']);
                }
                else
                {
                  console.log("ok login");
                }
            }); 
      } 
      else 
      {
         for (let i in this.commonSignInForm.controls) 
         {
            this.commonSignInForm.controls[i].markAsTouched();
         }
      }
   }

}
