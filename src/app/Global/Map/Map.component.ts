import { Component, OnInit, Input } from '@angular/core';
declare var google: any;

@Component({
  selector: 'embryo-Map',
  templateUrl: './Map.component.html',
  styleUrls: ['./Map.component.scss']
})
export class MapComponent implements OnInit {

   @Input() address : any;
   @Input() lat : any;
   @Input() lng : any;

   mapOptions : any = {
      lat          : 33.5362475,
      lng          : -111.9267386,
      zoom         : 10,
      fillColor    : '#DC143C',
      draggable    : true,
      editable     : true,
      visible      : true,
   };

   showMap : boolean = false;

   icon : any = {
    url: './assets/images/flag.svg',
    scaledSize: {
        width: 40,
        height: 60
    }
}
   constructor() { }

   ngOnInit() 
   {
      if(this.address && (!this.lat || !this.lng )) 
      {
         this.getLatitudeLongitude(this.address);
      }
      else if(this.lat && this.lng) 
      {
         this.setLatitudeLongitude(this.lat,this.lng);
      }
      
      //this.address = "1899 Cemetery Street,MEDFORD - 1452451 New York";
      /* if(this.address) {
         this.getLatitudeLongitude(this.address);
      } */

      
   }

   getLatitudeLongitude(address) 
   {
      // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
      address = address || 'Ferrol, Galicia, Spain';
      let NewMapOptions = this.mapOptions
      // Initialize the Geocoder
      let geocoder = new google.maps.Geocoder();
      if (geocoder) 
      {
         geocoder.geocode({
            'address': address
         }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) 
            {
               NewMapOptions.lat = results[0].geometry.location.lat();
               NewMapOptions.lng = results[0].geometry.location.lng();
            }
        });

        this.mapOptions.lat = NewMapOptions.lat;
        this.mapOptions.lng = NewMapOptions.lng;
        this.showMap = true;
      }
   }

   setLatitudeLongitude(lat,lng) 
   {
      
      let NewMapOptions = this.mapOptions
      
      NewMapOptions.lat = lat;
      NewMapOptions.lng = lng;


        this.mapOptions.lat = lat;
        this.mapOptions.lng = lng;
        this.showMap = true;
      
   }

}
