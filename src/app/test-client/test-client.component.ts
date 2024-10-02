import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientIdService } from '../services/client-id-service.service';

@Component({
  selector: 'app-test-client',
  standalone: true,
  imports: [],
  templateUrl: './test-client.component.html',
  styleUrl: './test-client.component.sass'
})
export class TestClientComponent {
  constructor(
    private route: ActivatedRoute,
    private clientIdService: ClientIdService,
    private renderer: Renderer2
  ) {}
  clientId: string = '';
  clientConfig: any = {};
 async ngOnInit(): Promise<any> {
    // Get clientId from the route parameters
    this.route.paramMap.subscribe(async(params) => {
      this.clientId = params.get('clientId') || '';

      // Fetch client configuration based on clientId
      const s= await this.clientIdService.fetchClientConfig(this.clientId)
      console.log(s);
      this.applyTheme(s)
    });
  }

  // Apply the theme by setting CSS variables dynamically
  applyTheme(clientConfig: any) {
    console.log('ClientConfig:', clientConfig);
  
    if (clientConfig.textColor && clientConfig.backgroundColor) {
      document.documentElement.style.setProperty('--text-color', clientConfig.textColor);
      document.documentElement.style.setProperty('--background-color', clientConfig.backgroundColor);
  
      console.log('CSS variables applied:', document.documentElement.style.getPropertyValue('--text-color'), document.documentElement.style.getPropertyValue('--background-color'));
    } else {
      console.log('Invalid clientConfig values');
    }
  }
  
  
}

