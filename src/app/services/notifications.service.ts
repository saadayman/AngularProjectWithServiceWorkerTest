import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SwPush } from "@angular/service-worker";
import { firstValueFrom } from "rxjs";
@Injectable({ providedIn: 'root' })
export class NotificationsService {
  constructor(
    private http: HttpClient,
    private swPush: SwPush
  ) { }

  public async serverSubscribers() {
    const subscriptions = await firstValueFrom(this.http.get<any>(`https://testwebpushapi.onrender.com/notification/push/subscribers`));
    return subscriptions;
  }

  public async serverPublicKey() {
    const data = await firstValueFrom(this.http.get<{ publicKey: string; }>(`https://testwebpushapi.onrender.com/notification/push/publickey`));
    return data.publicKey;
  }

  public async subscribeToNotifications() {
    const subscription = await this.swPush.requestSubscription({
      serverPublicKey: 'BOncXD2WECeZZs8Q14-0lY-12G7xgsSUyEDUocPGtmFfUeYQADWIhD1tIwtHqdgGYnNckNKZZtN_GZsNkc9lStg'
    });
    console.log('https://testwebpushapi.onrender.com')
    return this.http.post<any>(`https://testwebpushapi.onrender.com/save/push`, subscription);
  }
}
