import { Injectable } from '@angular/core';

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

const HeaderOneItems= [
  {
    state: "home",
    name: "PROYECTOS",
    type: "link",
    icon: "home"
  },
  
  {
  state: "pages",
  name: "PAGES",
  type: "sub",
  icon: "pages",
  children: [
     {  state: 'about', 
        name: 'ABOUT',
        type: 'link',
        icon: 'arrow_right_alt',
     },
     {  state: 'term-condition', 
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
        state: 'blogs/detail', 
        name: 'BLOG DETAIL',
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
        state: 'not-found', 
        name: '404 PAGE',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {  
         state: 'account/profile', 
         name: 'User Profile',
         type: 'link',
         icon: 'arrow_right_alt',
       }
    ]
},
{
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
  },
  {
    state:'contact',
    name:"CONTACT US",
    type:"link",
    icon: 'perm_contact_calendar'
  }
];

const FooterOneItems= [
  {
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
         name:"CONTACT US",
         type:"link",
         icon: 'perm_contact_calendar',
       }
    ]
  }, 
  {
    state:'',
    name:"SESSION",
    type:"sub",
    icon: '',
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
  },
  
  {
    state:'',
    name:"SOCIAL",
    type:"sub",
    icon: '',
    children: [
      {
        state: 'https://www.facebook.com/', 
        name: 'Facebook',
        type: 'social_link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'https://twitter.com/', 
        name: 'Twitter',
        type: 'social_link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'https://www.youtube.com/', 
        name: 'Youtube',
        type: 'social_link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'https://plus.google.com', 
        name: 'Google Plus',
        type: 'social_link',
        icon: 'arrow_right_alt',
      }
    ]
  }

]

@Injectable()
export class MenuItems {

   /*
    * Get all header menu
    */
   getMainMenu(): Menu[] {
      return HeaderOneItems;
   }

   /*
    * Get all footer menu
    */
   getFooterOneMenu(): Menu[] {
      return FooterOneItems;
   }
}
