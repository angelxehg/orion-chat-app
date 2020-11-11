// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  version: '2.0.0-rc.1',
  firebase: {
    apiKey: 'AIzaSyAJCX0vuYdhkEgbT53JlLGgVKueIz8iNDs',
    authDomain: 'tomatoe-chat.firebaseapp.com',
    databaseURL: 'https://tomatoe-chat.firebaseio.com',
    projectId: 'tomatoe-chat',
    storageBucket: 'tomatoe-chat.appspot.com',
    messagingSenderId: '107405856304',
    appId: '1:107405856304:web:98fc6fd126d360955de7f5'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
