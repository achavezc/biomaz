import {Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Observable ,  Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { EmbryoService } from '../../../Services/Embryo.service';


export interface Card {
   title: string;
   subtitle: string;
   text: string;
 }
const DATA: Card[] = [
   {
     title: 'Shiba Inu 1',
     subtitle: 'Dog Breed',
     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
   },
   {
     title: 'Shiba Inu 2',
     subtitle: 'Dog Breed',
     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
   },
   {
     title: 'Shiba Inu 3',
     subtitle: 'Dog Breed',
     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
   },
   {
     title: 'Shiba Inu 4',
     subtitle: 'Dog Breed',
     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
   },
   {
     title: 'Shiba Inu 5',
     subtitle: 'Dog Breed',
     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
   },
   {
     title: 'Shiba Inu 6',
     subtitle: 'Dog Breed',
     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
   },
   {
     title: 'Shiba Inu 7',
     subtitle: 'Dog Breed',
     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
   },
   {
     title: 'Shiba Inu 8',
     subtitle: 'Dog Breed',
     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
   },
   {
     title: 'Shiba Inu 9',
     subtitle: 'Dog Breed',
     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
   },
   {
     title: 'Shiba Inu 10',
     subtitle: 'Dog Breed',
     text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.'
   }
 ];
 
@Component({
  selector: 'app-ProductsList',
  templateUrl: './ProductsList.component.html',
  styleUrls: ['./ProductsList.component.scss']
})


export class ProductsListComponent implements OnInit, OnDestroy {

   @ViewChild(MatPaginator) paginator: MatPaginator;
   obs: Observable<any>;
   dataSource: MatTableDataSource<Card> = new MatTableDataSource<Card>(DATA);

   type          : any;
   pips          : boolean = true;
   tooltips      : boolean = true;
   category      : any;
   pageTitle     : string;
   subPageTitle  : string;

   public subscribers: any = {};
   
   constructor(private route: ActivatedRoute,
               private router: Router, 
               public embryoService : EmbryoService,
               private changeDetectorRef: ChangeDetectorRef
               ) {
   }

   ngOnInit() {

      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      /*
      this.route.params.subscribe(params => {
         this.route.queryParams.forEach(queryParams => {
            this.category = queryParams['category'];
            this.type   = null;
            this.type = params['type'];

            this.getPageTitle();
         });   
      });
      */
   }
   ngOnDestroy() {
      if (this.dataSource) { 
        this.dataSource.disconnect(); 
      }
    }

   public getPageTitle() {
      this.pageTitle = null;
      this.subPageTitle = null;
      
      switch (this.type || this.category) {
         case undefined:
            this.pageTitle = "Fashion";
            this.subPageTitle="Explore your favourite fashion style.";
            break;

         case "gadgets":
            this.pageTitle = "Gadgets";
            this.subPageTitle="Check out our new gadgets.";
            break;

         case "accessories":
            this.pageTitle = "Accessories";
            this.subPageTitle="Choose the wide range of best accessories.";
            break;
         
         default:
            this.pageTitle = "Products";
            this.subPageTitle = null;
            break;
      }
   }

   public addToCart(value) {
      this.embryoService.addToCart(value);
   }

   public addToWishList(value) {
      this.embryoService.addToWishlist(value);
   }
   
   public transformHits(hits) {
      hits.forEach(hit => {
         hit.stars = [];
         for (let i = 1; i <= 5; i) {
           hit.stars.push(i <= hit.rating);
           i += 1;
         }
      });
      return hits;
   }
}
