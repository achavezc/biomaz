import {Component, OnInit, OnDestroy,Input, ViewChild, ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Observable ,  Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { EmbryoService } from '../../../Services/Embryo.service';
import {ProyectoService} from '../../../Services/proyecto.service';



@Component({
  selector: 'app-ProductsList',
  templateUrl: './ProductsList.component.html',
  styleUrls: ['./ProductsList.component.scss']
})


export class ProductsListComponent implements OnInit, OnDestroy {


   @Input() nameCategoria : any ;
   @Input() idCategoria : any ;
   @Input() content : any ;
   showMore = false;


   @ViewChild(MatPaginator) paginator: MatPaginator;

   public DATA: any[] = [];
   public obs: Observable<any>;
   public dataSource: MatTableDataSource<any>;

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
               public ProyectoService: ProyectoService,                       
               private changeDetectorRef: ChangeDetectorRef
               ) {
   }

   ngOnInit() {

      this.loadProjects();
   }


   ngOnDestroy() {
      if (this.dataSource) { 
        this.dataSource.disconnect(); 
      }
    }
    
    public loadProjects() {
      this.ProyectoService.getProyectosPorCategoria(this.idCategoria,'0')
      .subscribe(response => {
          console.log(response);
          response.map(aux => {
            this.DATA.push({
              title: aux.Nombre,
              subtitle: aux.Especie,
              text: aux.Formato1,
              type: this.nameCategoria,
              id: aux.ProyectoPlantillaId,
              image: aux.Imagen,
              name: aux.Nombre,
              price: aux.Precio,
              especie: aux.Especie,
              tipo: aux.Tipo,
              formado: aux.Formato1,
              departamento: aux.Departamento,
              

            })
            
         });
         this.dataSource = new MatTableDataSource<any>(this.DATA);
         this.changeDetectorRef.detectChanges();
         this.dataSource.paginator = this.paginator;
         this.obs = this.dataSource.connect();
        }, err => {
          console.error(err);
        }
      );
    }



   public addToCart(value) 
   {
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