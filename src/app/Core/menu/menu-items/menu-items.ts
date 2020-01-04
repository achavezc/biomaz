import { Injectable } from '@angular/core';
import { EmbryoService } from '../../../Services/Embryo.service';
/*
 * Menu interface
 */
export interface Menu {
	state: string;
	name?: string;
	type?: string;
	icon?: string;
	children?: Menu[];
}

var HeaderOneItems= [
  {
    state: "home",
    name: "PROYECTOS",
    type: "link",
    icon: "home"
  }, 
  {  
    state: 'adminaccount/profile', 
    name: 'ADMIN',
    type: 'link',
    icon: 'arrow_right_alt',
  },
  , 
  {  
    state: 'session/signin', 
    name: 'INICIAR SESION',
    type: 'link',
    icon: 'arrow_right_alt',
  }, 
  {  
    state: 'session/signup', 
    name: 'REGISTRO',
    type: 'link',
    icon: 'arrow_right_alt',
  } , 
/* {
    state:'session',
    name:"SESSION",
    type:"sub",
    icon: 'supervised_user_circle',
    children: [
        {  
        state: 'session/signin', 
        name: 'SIGN IN',
        type: 'link',
        icon: 'arrow_right_alt',
        },
        {  
            state: 'session/signup', 
            name: 'REGISTER',
            type: 'link',
            icon: 'arrow_right_alt',
        },
        {  
            state: 'session/forgot-password', 
            name: 'FORGET PASSWORD',
            type: 'link',
            icon: 'arrow_right_alt',
        },
        {  
            state: 'session/thank-you', 
            name: 'THANK YOU',
            type: 'link',
            icon: 'arrow_right_alt',
        }
    ]
  }, */
  {
    state:'contact',
    name:"CONTACTANOS",
    type:"link",
    icon: 'perm_contact_calendar'
  },
  {
    state:'about',
    name:"ABOUT",
    type:"link",
    icon: 'arrow_right_alt'
  }
];

const FooterOneItems= [
 /*  {
     state:'',
     name:"ABOUT",
     type:"sub",
     icon: '',
     children: [
      {  
         state: 'about', 
         name: 'ABOUT',
         type: 'link',
         icon: 'arrow_right_alt',
      },
      {  
         state: 'term-condition', 
         name: 'TERM AND CONDITION',
         type: 'link',
         icon: 'arrow_right_alt',
      },
      {  
        state: 'privacy-policy', 
        name: 'PRIVACY POLICY',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {  
        state: 'faq', 
        name: 'FAQ',
        type: 'link',
        icon: 'arrow_right_alt',
       }, 
       {  
         state:'contact',
         name:"CONTÁCTANOS",
         type:"link",
         icon: 'perm_contact_calendar',
       }
    ]
  },  */
 
  
  {
    state:'',
    name:"SOCIAL",
    type:"sub",
    icon: '',
    children: [
      {
        state: 'https://www.facebook.com/beequeencoin/', 
        name: 'Facebook',
        type: 'social_link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'https://www.instagram.com/beequeencoin', 
        name: 'Instagram',
        type: 'social_link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'https://www.youtube.com/', 
        name: 'Youtube',
        type: 'social_link',
        icon: 'arrow_right_alt',
      }
    ]
  }

]

@Injectable()
export class MenuItems {

  constructor(public embryoService : EmbryoService) { }

   /*
    * Get all header menu
    */
   getMainMenu(): Menu[]
    {
      let usuario = this.embryoService.isLoggedIn();     

       if(!usuario.Autenticado)
       {
          HeaderOneItems = HeaderOneItems.filter(obj => obj.name !== 'ADMIN');   
         
       }
       else
       {        
        
        HeaderOneItems = HeaderOneItems.filter(obj => obj.name !== 'INICIAR SESION' && obj.name !== 'REGISTRO');

        if(usuario.RoleId!=1)
        {
          HeaderOneItems = HeaderOneItems.filter(obj => obj.name !== 'ADMIN');            
        }


       }
      return HeaderOneItems;
   }

   /*
    * Get all footer menu
    */
   getFooterOneMenu(): Menu[] {
      return FooterOneItems;
   }
}
