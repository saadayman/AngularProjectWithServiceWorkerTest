import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch()), provideFirebaseApp(() => initializeApp({ "projectId": "pushtest-adbc8", "appId": "1:1042305211859:web:08f3e1dd2e69f952eee326", "storageBucket": "pushtest-adbc8.appspot.com", "apiKey": "AIzaSyBiQNTOkej5vwszvg6Jsi7RN92x041h3Os", "authDomain": "pushtest-adbc8.firebaseapp.com", "messagingSenderId": "1042305211859", "measurementId": "G-EZKXGDB2NM" })), provideMessaging(() => getMessaging()), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })]
};
