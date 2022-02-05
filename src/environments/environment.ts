// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //gsutil cors set cors.json gs://societymaintenance-e775d.appspot.com
  apiEndPoint: 'https://societymaintenance-e775d-default-rtdb.firebaseio.com/',

  firebaseConfig: {
    apiKey: "AIzaSyD2hJiVX6-WcE6ffaGngvW3xQNqQw1Vnek",
    authDomain: "societymaintenance-e775d.firebaseapp.com",
    projectId: "societymaintenance-e775d",
    storageBucket: "societymaintenance-e775d.appspot.com",
    messagingSenderId: "1075368524021",
    appId: "1:1075368524021:web:9bfe5547e6ee41e3faedbc",
    measurementId: "G-PW41JPHD2Y"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
