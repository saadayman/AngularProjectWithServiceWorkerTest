import { afterNextRender, EnvironmentInjector, inject, Injectable, Injector  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClientIdService {
  constructor(private router: Router, private http: HttpClient) {}
  private environmentInjector = inject(EnvironmentInjector);

  fetchClients(clientId?:string): Observable<any> {
    // Example API call to get clientId (or use localStorage as fallback)
    const apiUrl = 'http://localhost:3008/clients';

    return this.http.get(`${apiUrl}`);

    
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
