import { Component, OnInit, AfterViewChecked} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';

import { EmbryoService } from '../../../Services/Embryo.service';
import {CategoriaService} from '../../../Services/categoria.service';
import { CarritoService } from '../../../Services/carrito.service';

@Component({
  selector: 'app-homeone',
  templateUrl: './HomeOne.component.html',
  styleUrls: ['./HomeOne.component.scss']
})
export class HomeoneComponent implements OnInit, AfterViewChecked{
   public slides: any[] = [];
   blogList              : any;
   productReviews        : any;
   productsArray         : any;
   productsSliderData    : any;
   newProductsSliderData : any;
   slideConfig = {
      slidesToShow: 4,
      slidesToScroll:4,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      responsive: [
         {
            breakpoint: 992,
            settings: {
               arrows: false,
               slidesToShow: 2,
               slidesToScroll:1
            }
         },
         {
            breakpoint: 768,
            settings: {
               arrows: false,
               slidesToShow: 2,
               slidesToScroll:2
            }
            },
         {
            breakpoint: 480,
            settings: {
               arrows: false,
               slidesToShow: 1,
               slidesToScroll:1
            }
         }
      ]
   };

   rtlSlideConfig = {
      slidesToShow: 4,
      slidesToScroll:4,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      rtl: true,
      responsive: [
         {
            breakpoint: 992,
            settings: {
               arrows: false,
               slidesToShow: 2,
               slidesToScroll:1
            }
         },
         {
            breakpoint: 768,
            settings: {
               arrows: false,
               slidesToShow: 2,
               slidesToScroll:1
            }
         },
         {
            breakpoint: 480,
            settings: {
               arrows: false,
               slidesToShow: 1,
               slidesToScroll:1
            }
         }
      ]
   };

   constructor(public embryoService: EmbryoService,
               private categoriaService: CategoriaService,private carritoService: CarritoService,
               private cdRef : ChangeDetectorRef) {

        this.getCategorias();
   }

   ngOnInit() {
   }

   ngAfterViewChecked() : void {
      this.cdRef.detectChanges();
   }

   public getCategorias(){
      this.categoriaService.get()
      .subscribe(response => {
          console.log(response);
          response.map(aux => {
            this.slides.push({
               img: aux.ImagenBanner,
               content: aux.Descripcion,
               heading_one: aux.Nombre,
               name: aux.Nombre,
               id: aux.CategoriaId
            });
         });
        }, err => {
          
          console.error(err);
        }
      );
   }



   public addToCart(value) {
      this.carritoService.addToCart(value);
   }


}
