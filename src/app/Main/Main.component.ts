import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, of as observableOf, interval ,  Subscription } from 'rxjs';
import { map, take, delay, withLatestFrom, finalize, tap } from 'rxjs/operators';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { EmbryoService } from '../Services/Embryo.service';
import { MenuItems } from '../Core/menu/menu-items/menu-items';
import { Directionality } from '@angular/cdk/bidi';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
//import { TranslateService } from '@ngx-translate/core';
import { Meta, Title } from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './Main.component.html',
  styleUrls: ['./Main.component.scss']
})
export class MainComponent implements OnInit {

   timer = 0;
   isRtl: any;
   private _dirChangeSubscription = Subscription.EMPTY;
   currentUrl : any; 

   constructor(private loader : LoadingBarService,
               public embryoService : EmbryoService, 
               public menuItems: MenuItems,
               dir: Directionality,
               //public translate: TranslateService,
               private router: Router,
               meta: Meta, title: Title) { 

      title.setTitle('BEE QUEEN COIN');

      meta.addTags([
         { name: 'author',   content: 'BEE QUEEN COIN'},
         { name: 'keywords', content: 'Apicultura, Acuicultura, Agricultura'},
         { name: 'description', content: 'BEE QUEEN COIN.' }
      ]);

      if(this.embryoService.isDirectionRtl) {
         this.isRtl = 'rtl';
      } else {
         this.isRtl = 'ltr';
      }

      this.router.events
        .subscribe((event) => {
          if (event instanceof NavigationEnd) {
            this.currentUrl = event.url;
          }
        });
   }

   ngOnInit() {
      this.startTimer(); 
   }

   public startTimer() {
      this.timer = 0;
      interval(1000).pipe(
      take(3),
      tap(value => { this.timer = value + 1; }),
       finalize(() => this.loader.complete()),
      ).subscribe();

      // We're sure that subscription has been made, we can start loading bar service
      this.loader.start();
   }

   public hideSideNav() {
      this.embryoService.sidenavOpen = false;
   }

   public changeDirection() {
      if(this.isRtl == "rtl") {
         this.isRtl = "ltr";
         this.embryoService.isDirectionRtl = false;
      } else {
         this.isRtl = "rtl"
         this.embryoService.isDirectionRtl = true;
      }

      this.embryoService.featuredProductsSelectedTab = 0;
      this.embryoService.newArrivalSelectedTab = 0;
   }

   /**
    * On window scroll add class header-fixed.
    */
   @HostListener('window:scroll', ['$event'])
   onScrollEvent($event){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (scrollTop >= 200) {
           $("app-main").addClass("header-fixed");
       } else {
           $("app-main").removeClass("header-fixed");
       }
   }
}
