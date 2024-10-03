import { afterNextRender, Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone:true,
  imports:[FormsModule],
  template: `
    <div>
      <h1>Welcome! Please enter your client ID:</h1>
      <input [(ngModel)]="clientId" placeholder="Enter client ID" />
      <button (click)="onSubmit()">Submit</button>
    </div>
  `,
})
export class WelcomeComponent  implements OnInit{
  clientId: string='';
  private environmentInjector = inject(EnvironmentInjector);

  localStorageVal:any=''
  clientConfig: any = {};
ngOnInit(): void {
  afterNextRender(()=>{
    this.localStorageVal = JSON.stringify(localStorage.getItem('clientsConfig'))
  },{injector:this.environmentInjector})
}
  constructor(private router: Router) {}

  onSubmit() {
    // Store clientId in localStorage or make an API call
    localStorage.setItem('clientId', this.clientId);

    // Redirect to the client route
    this.router.navigate([`/${this.clientId}`]);
  }
}
