import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmbryoService } from '../../../Services/Embryo.service';
import { ProyectoService } from '../../../Services/proyecto.service';

@Component({
   selector: 'app-DetailPage',
   templateUrl: './DetailPage.component.html',
   styleUrls: ['./DetailPage.component.scss']
})
export class DetailPageComponent implements OnInit {
   contactInfo  : any;
   public images: string[] = [];
   id: any;
   type: any;
   apiResponse: any;
   singleProductData: any;
   productsList: any;

   constructor(private route: ActivatedRoute,
      private router: Router,
      public ProyectoService: ProyectoService,
      public embryoService: EmbryoService) {

         this.embryoService.getContactInfo().valueChanges().subscribe(res => {this.contactInfo = res});
   }

   ngOnInit() {
      this.route.params.subscribe(res => {
         this.id = res.id;
         this.type = res.type;
         this.getData();
      })
   }

   public getData() {
      this.ProyectoService.getProyectoPorId(this.id)
         .subscribe(response => {
            response.imagenes.map(aux => {
               this.images.push(aux)
            }, err => {
               console.error(err);
            });
            var obj =
            {
               "availablity": true,
               "brand": response.Nombre,
               "category": "Laptop",
               "category_type": "accessories",
               "color": "Black",
               "description": response.Descripcion,
               "discount_price": 0,
               "features": [
                  "Dell/Mac/Acer Laptop Bag",
                  "Pure Leather",
                  "20 Kg Capacity"
               ],
               "id": response.ProyectoPlantillaId,
               "image": response.Imagen,
               "image_gallery": this.images,
               "name": response.Nombre,
               "popular": true,
               "price": response.Precio,
               "product_code": "#EM1215",
               "quantity": 1,
               "rating": 4,
               "status": 0,
               "tags": [
                  "Black",
                  "Laptop",
                  "Bags"
               ],
               "type": "accessories",
               "especie": response.Especie,
               "tipo": response.Tipo,
               "formato1": response.Formato1,
               "formato2": response.Formato2,
               "cantidadEstimada": response.CantidadEstimada
            }
            this.singleProductData = obj;
         });
   }

   public checkResponse(response) {
      this.productsList = null;
      this.productsList = response[this.type];
      for (let data of this.productsList) {
         if (data.id == this.id) {
            this.singleProductData = data;
            break;
         }
      }
   }

   public addToCart(value) {
      this.embryoService.addToCart(value);
   }

   public addToWishList(value) {
      this.embryoService.addToWishlist(value);
   }

}
