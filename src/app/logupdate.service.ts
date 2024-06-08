import {Injectable} from '@angular/core'
import {SwUpdate} from '@angular/service-worker'
export class LogUpdateService {
  constructor(private updates: SwUpdate) {
    updates.versionUpdates.subscribe((evt) => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          alert(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          const r = confirm(`New app version ready. Reload to update?`);
          if (r) {
            this.doAppUpdate();
          }
          break;
        case 'VERSION_INSTALLATION_FAILED':
          alert(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });
  }

  private doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
import {ApplicationRef} from '@angular/core';
import {concat, interval} from 'rxjs';
import {first} from 'rxjs/operators';
@Injectable({providedIn: 'root'})
export class CheckForUpdateService {
  constructor(appRef: ApplicationRef, updates: SwUpdate) {
    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    console.log('APPPPPPP',appRef.isStable,appRef)
    const appIsStable$ = appRef.isStable.pipe(first((isStable) => isStable === true));
    const everySixHours$ = interval(6000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
    everySixHoursOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await updates.checkForUpdate();
        console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
    });
  }
}