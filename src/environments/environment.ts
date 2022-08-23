// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";


export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyB8jI6-rvrqMFNtD052q8p31kuodMgLlWY",
    authDomain: "tennismaster-22032.firebaseapp.com",
    projectId: "tennismaster-22032",
    storageBucket: "tennismaster-22032.appspot.com",
    messagingSenderId: "475309292079",
    appId: "1:475309292079:web:aa2bf74b24ac9c594e24da",
    measurementId: "G-MQ0RSB33R9"
  },
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
