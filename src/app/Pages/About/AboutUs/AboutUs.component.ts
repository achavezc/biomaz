import { Component, OnInit } from '@angular/core';
import { EmbryoService } from '../../../Services/Embryo.service';


@Component({
  selector: 'app-AboutUs',
  templateUrl: './AboutUs.component.html',
  styleUrls: ['./AboutUs.component.scss']
})
export class AboutUsComponent implements OnInit {

   teamData          : any;
   testimonialData   : any;
   missionVisionData : any;
   aboutInfo         : any;


   constructor(private embryoService : EmbryoService) { }

   ngOnInit() {
      this.getAboutInfo();
      this.getMissionVision();
      this.getTestimonialData();
      this.getTeamData();
   }

   public getAboutInfo() 
   {     
      
      this.aboutInfo = {
         "id":1,
         "heading": "Objetivos",
         "sub_heading1" : "Económicos",
         "content1a" : "Crear una fuente de ingreso para familias en zonas rurales.",
         "content1b" : "Generar rentabilidad a nuestros inversionistas.",
         "sub_heading2" : "Sociales",
         "content2a" : "Empoderar a mujeres dentro de su hogar y comunidad.",
         "content2b" : "Mejorar la alientación y nutrición en niños y familias de zonas rurales.",
         "content2c" : "Investigar y desarrollar productos que mejoren nuestra nutrición, salud y ayuden a prevenir enfermedades o curarlas.",
         "sub_heading3" : "Medio ambiente",
         "content3a" : "Proteger y reproducir especies de abejas nativas de bosques trópicales.",
         "content3b" : "Contribuir a la polenización de la flora local.",
         "image":"assets/images/about-us.jpg"
      };

      //this.embryoService.getAboutInfo().valueChanges().subscribe(res => {this.aboutInfo = res});
   }

   public getMissionVision() 
   {
      this.missionVisionData = [
         {
            "id":"1",
            "image": "assets/images/our-mission.jpg",
            "heading" : "Visión",
            "sub_heading": "Visión",
            "content" : "Facilitar el desarrollo de una nueva economía con impacto social y cuidando del medio ambiente."
         },
         {
            "id":"2",
            "image": "assets/images/procedimientoafiliacion/procedimiento.jpg",
            "heading" : "Procedimiento de Afiliación",
            "sub_heading": "",
            "content" : ""
         }
      ];

      //this.embryoService.getMissionVision().valueChanges().subscribe(res => {this.missionVisionData = res});
   }

   public getTeamData() 
   {
      this.teamData =[ 
         { 
            "id":1,
            "image"   : "assets/images/procedimientoafiliacion/Paso1.png",
            "name"       : "Genera tu usuario",
            "designation": "1",
            "description": ""
         },
         { 
            "id":2,
            "image"    : "assets/images/procedimientoafiliacion/Paso2.png",
            "name"        : "Confirma tus datos",
            "designation" : "2",
            "description" : ""
         },
         { 
            "id":3,
            "image"   : "assets/images/procedimientoafiliacion/Paso3.png",
            "name"       : "Elige tu proyecto",
            "designation": "3",
            "description": ""
         },
         { 
            "id":4,
            "image"   : "assets/images/procedimientoafiliacion/Paso4.png",
            "name"       : "Invierte",
            "designation": "4",
            "description": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque esse iure aliquid enim, corrupti distinctio sit praesentium ducimus incidunt rem facilis expedita illo at tempore natus nihil veritatis accusamus vel."
         },
         { 
            "id":5,
            "image"   : "assets/images/procedimientoafiliacion/Paso5.png",
            "name"       : "Gestiona tus inversiones",
            "designation": "5",
            "description": ""
         },
         { 
            "id":6,
            "image"   : "assets/images/procedimientoafiliacion/Paso6.png",
            "name"       : "Recibe o comparte los beneficios",
            "designation": "6",
            "description": ""
         }
      ];

      //this.embryoService.getTeam().valueChanges().subscribe(res => {this.teamData = res});
   }

   public getTestimonialData() 
   {
      this.embryoService.getTestimonial().valueChanges().subscribe(res => {this.testimonialData = res});
   }
}

