import { Component, OnInit } from '@angular/core';
import { EmbryoService } from '../../Services/Embryo.service';

@Component({
  selector: 'embryo-HeaderUserProfileDropdown',
  templateUrl: './HeaderUserProfileDropdown.component.html',
  styleUrls: ['./HeaderUserProfileDropdown.component.scss']
})
export class HeaderUserProfileDropdownComponent implements OnInit {

   constructor(public embryoService: EmbryoService) { }

   ngOnInit() {
   }

}
