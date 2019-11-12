import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {CategoriaService} from '../../../Services/categoria.service';

@Component({
  selector: 'embryo-HomePageThreeSlider',
  templateUrl: './HomePageThreeSlider.component.html',
  styleUrls: ['./HomePageThreeSlider.component.scss']
})
export class HomePageThreeSliderComponent implements OnInit, OnChanges {
   public slides: any[] = [];

   @Input() isRTL : boolean = false;

   slideConfig : any;
   /*
   slides : any = [
      {
         img         : "assets/images/h-slider-1.jpg",
         content     : "2018 Latest Collection",
         heading_one : "New Fashion Collection",
        
      },
      {
         img         : "assets/images/h-slider-2.jpg",
         content     : "2018 Latest Collection",
         heading_one : "Summer Time Collection",
   
      }, 
      {
         img         : "assets/images/h-slider-3.jpg",
         content     : "2018 Latest Collection",
         heading_one : "Men's Suiting and Clothing",
         
      }
   ]
   */

   constructor(private CategoriaService: CategoriaService) { }

   ngOnInit() {

      this.CategoriaService.get()
      .subscribe(response => {
          console.log(response);
          response.map(aux => {
            this.slides.push({
               img: aux.ImagenBanner,
               content: "",
               heading_one: aux.Nombre
            });
         });
        }, err => {
          
          console.error(err);
        }
      );
   }

   ngOnChanges() {
      this.slideConfig = {
         infinite: true,
         slidesToShow: 1,
         slidesToScroll: 1,
         autoplay: true,
         autoplaySpeed: 2000,
         dots: false,
         rtl: this.isRTL,
         responsive: [
            {
               breakpoint: 991,
               settings: {
                  arrows: false,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: true,
                  autoplaySpeed: 2000
               }
            },
            {
               breakpoint: 768,
               settings: {
                  arrows: false,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: true,
                  autoplaySpeed: 2000
               }
            },
            {
               breakpoint: 480,
               settings: {
                  arrows: false,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  autoplay: true,
                  autoplaySpeed: 2000
               }
            }
         ]
      };
   }

}
