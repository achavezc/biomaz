import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-ConfirmationActionPopup',
  templateUrl: './ConfirmationActionPopup.component.html',
  styleUrls: ['./ConfirmationActionPopup.component.scss']
})
export class ConfirmationActionPopupComponent implements OnInit {

   message : string;
  
   constructor(public dialogRef: MatDialogRef<ConfirmationActionPopupComponent>) { }

   ngOnInit() {
   }

}
