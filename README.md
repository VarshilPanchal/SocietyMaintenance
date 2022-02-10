# SocietyMaintenance

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.





=======================================================================================================================
install Firebase:

npm install --save firebase @angular/fire@6.0.4
npm install firebase@8

setup: https://www.techiediaries.com/angular-10-firebase-database-crud/
https://console.firebase.google.com/project/societymaintenance-991bf/firestore/data/~2F
==============================================================================================================================================================================================================================================
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC-O1glZXeEduZyYD-MvkYGgT7kEhPfaU",
  authDomain: "societymaintenance-991bf.firebaseapp.com",
  projectId: "societymaintenance-991bf",
  storageBucket: "societymaintenance-991bf.appspot.com",
  messagingSenderId: "967694209573",
  appId: "1:967694209573:web:968e1617d60d9aa9e6a5cc",
  measurementId: "G-Q198VV1Z8T"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
==============================================================================================================================================================================================================================================

import { AngularFireModule} from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database';
=======================================================================================================================



npm i ngx-spinner
npm i ngx-toastr
npm install bootstrap
npm install jquery

npm i tslib
=======================================================================================================================
Primeng version => https://www.npmjs.com/package/primeng?activeTab=versions


npm install @angular/cdk@^11.0.0 --save

npm i jspdf

https://www.npmjs.com/package/jspdf

https://stackoverflow.com/questions/55019343/how-to-generate-a-pdf-using-angular-7

=======================================================================================================================
==============================================================================================================================================================================================================================================
==============================================================================================================================================================================================================================================

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2hJiVX6-WcE6ffaGngvW3xQNqQw1Vnek",
  authDomain: "societymaintenance-e775d.firebaseapp.com",
  projectId: "societymaintenance-e775d",
  storageBucket: "societymaintenance-e775d.appspot.com",
  messagingSenderId: "1075368524021",
  appId: "1:1075368524021:web:9bfe5547e6ee41e3faedbc",
  measurementId: "G-PW41JPHD2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);












































Varshil Nedd to work on::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:Transfer fees=> 2bhk and 3 bhkEntry fees
:View maintainence bill button on dashboard
:header making for all the screens
:header to design for all the pdfs
:balance to show on top
:if amount greater than zero change font color on dashboard


:previous reading and current reading field to add in generate maintainence popup
:previous reading, current reading and average reading(not mandatory) field to add in generate maintainence popup

:Receipt:
Tenant fees
Maintainence
Entry fees
Transfer fees
Voucher

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:Change password screen
:Auth guard to implement
:new about us screen
:Complaint box to think
:expense and income screen me se flat no field htani h
:View voucher button in expense table screen
:Receive maintainence screen
:Made new components Header ki links bnai for admin
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::