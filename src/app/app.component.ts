import { Component, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SwPush, SwUpdate} from '@angular/service-worker'
import { HttpClient } from '@angular/common/http';
import {YouTubePlayer} from '@angular/youtube-player';
import { GooglePayButtonModule } from "@google-pay/button-angular";
import { isPlatformBrowser } from '@angular/common';
import { CheckForUpdateService, LogUpdateService } from './logupdate.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,YouTubePlayer,GooglePayButtonModule],
  providers:[
    HttpClient
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent  {
  VAPID_PUBLIC_KEY: string= 'BOncXD2WECeZZs8Q14-0lY-12G7xgsSUyEDUocPGtmFfUeYQADWIhD1tIwtHqdgGYnNckNKZZtN_GZsNkc9lStg'
  constructor(private swPush: SwPush,private updates: SwUpdate,public http:HttpClient,public logupdateService:LogUpdateService,public _CheckForUpdateService:CheckForUpdateService) {
  }
  platform:any
  ngOnInit(): void {

  this.platform=  isPlatformBrowser(PLATFORM_ID)
    this.subscribeToNotifications();
    this.swPush.messages.subscribe(message=>{
      console.log('MESSAGE',message)
    })

  }
  checkForUpdates() {
    this.updates.checkForUpdate().then(() => {
      console.log('Check for updates completed');
    }).catch(err => {
      console.error('Failed to check for updates:', err);
    });
  }
  onLoadPaymentData($event:any){
    console.log($event)
  }

  subscribeToNotifications() {
    console.log(this.swPush.isEnabled)
    if (this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      }).then(subscription => {
        console.log(subscription)
        // Send subscription to the server
        this.http.post('https://testwebpushapi.onrender.com/save/push', subscription).subscribe(res=>console.log(res));
      }).catch(err => console.error('Could not subscribe to notifications', err));
    }
  }

  title = 'app-test';
}

if (typeof Worker !== 'undefined') {
  // Create a new
  console.log(new URL('./app.worker', import.meta.url))
  const worker = new Worker(new URL('./app.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  console.log('not supported')
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}