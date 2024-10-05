import { afterNextRender, EnvironmentInjector, inject, Injectable, Injector  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClientIdService {
  constructor(private router: Router, private http: HttpClient) {}
  private environmentInjector = inject(EnvironmentInjector);

  fetchClients(clientId?: string): Observable<any> {
    const staticData = {
      clients: [
        {
          id: 1,
          clientId: "client1",
          textColor: "orange",
          backgroundColor: "green",
          theme: "light"
        },
        {
          id: 2,
          clientId: "client2",
          textColor: "red",
          backgroundColor: "orange",
          theme: "dark"
        }
      ]
    };
  
    // Instead of making an API call, return the static data as an Observable
    return of(staticData);
  }
  
  fetchClientConfig(clientId: string): Promise<any> {
    return new Promise((resolve) => {
      afterNextRender(() => {
        const clients = localStorage.getItem('clientsConfig');
        console.log(clients);
        if (clients) {
          const clientsArray = JSON.parse(clients);
          console.log(clientsArray);
          console.log(clientId);
          // Find the client with the matching clientId
          const clientConfig = clientsArray.find((client: any) => client.id == clientId);
          console.log(clientConfig);
          resolve(clientConfig || null); // Resolve the clientConfig or null if not found
        } else {
          resolve(null); // Resolve null if no clients found in localStorage
        }
      }, { injector: this.environmentInjector });
    });
  }
  


  handleClientId(clients:any) {
    afterNextRender(()=>{
      localStorage.setItem('clientsConfig',JSON.stringify(clients))

    },{injector:this.environmentInjector})
  }
}
