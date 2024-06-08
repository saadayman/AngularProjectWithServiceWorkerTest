import {Injectable} from '@angular/core'
import {SwUpdate} from '@angular/service-worker'
@Injectable({providedIn: 'root'})
export class LogUpdateService {
  constructor(updates: SwUpdate) {
    console.log('invoked')
    updates.versionUpdates.subscribe((evt) => {
      console.log('evt',evt)
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });
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