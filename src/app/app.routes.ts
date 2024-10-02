import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: ':clientId',  // Define a dynamic segment for clientId
        loadComponent: () => import('./test-client/test-client.component').then(m => m.TestClientComponent) // Example of lazy loading a module
      },
      {
        path: '**',  // Define a dynamic segment for clientId
        loadComponent: () => import('./client-name/client-name.component').then(m => m.WelcomeComponent) // Example of lazy loading a module
      },
];
