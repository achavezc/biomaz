// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 // base_url: 'http://manuelruizbaca11-001-site1.htempurl.com/api/',a
 //base_url: 'http://mruizb-001-site2.htempurl.com/api/',
 
   
 base_url: 'http://localhost:5000/api/',
  firebase: {
    apiKey: "AIzaSyC5kr77VEU-FnklR5DBn3bPwmtmpEjYde4",
    authDomain: "embryo-version-2.firebaseapp.com",
    databaseURL: "https://embryo-version-2.firebaseio.com",
    projectId: "embryo-version-2",
    storageBucket: "embryo-version-2.appspot.com",
    messagingSenderId: "73552048992"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
