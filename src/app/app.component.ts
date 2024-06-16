import { Component, OnInit, PLATFORM_ID } from '@angular/core';
import { SwPush, SwRegistrationOptions, SwUpdate } from '@angular/service-worker';
import { NotificationsService } from './services/notifications.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  standalone:true,
})
export class AppComponent implements OnInit {
  isOnline?: boolean;
  notificationGranted: boolean = false;
  pushSubscribed: boolean = false;

  constructor(
    private notificationsService: NotificationsService,
    private sw: SwRegistrationOptions,
    private swPush: SwPush,
    public updates:SwUpdate,

  ) {
    if(isPlatformBrowser(PLATFORM_ID))
    this.notificationGranted = window?.Notification.permission === 'granted';
  }

  ngOnInit(): void {
    this.isOnline = this.sw.enabled;
    this.swPush.subscription.subscribe((subscription) => {
      console.log(subscription);
    });
    this.subscribeToNotifications()
    alert('should ask for permission')
    this.swPush.messages.subscribe((message) => {
      console.log(message);
    });
  }
  checkForUpdates() {
    this.updates.checkForUpdate().then(() => {
      alert('Check for updates completed')
      console.log('Check for updates completed');
    }).catch(err => {
      alert(err)
      console.error('Failed to check for updates:', err);
    });
  }
  public async subscribeToNotifications() {
    try {
      alert('invoked to ask for permission');
      (await this.notificationsService.subscribeToNotifications()).subscribe({
        next: () => {
          this.pushSubscribed = true;
          // if(isPlatformBrowser(PLATFORM_ID)){
    alert(window?.Notification.permission)
          this.notificationGranted = window?.Notification.permission === 'granted'
          // }
          ;
        },
        error:(err)=>{
          alert(err)
        }
      });
    } catch (error) {
      alert(error)
    }
 
  }
  disableNotifications(){
    this.notificationsService.disableNotifications()
  }
}
