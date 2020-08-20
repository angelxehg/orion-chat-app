# Orion Chat App

Orion Hybrid Chat application

[![Netlify Status](https://api.netlify.com/api/v1/badges/752d12e0-e2e7-44b1-996d-5821c59053ce/deploy-status)](https://app.netlify.com/sites/orion-chat/deploys)

- Install sources `npm install`

- Run application in browser `ionic serve`

## Build (Android)

- Compile sources `ionic build --prod`

- Copy sources to android `ionic cap sync --no-build`

- Open Android Studio `ionic cap open android`

## Build (Electron)

- Install electron sources `cd electron` && `npm install`

- Return to app directory `cd ..`

- Compile sources for Electron `npm run build:electron`

- Copy sources to electron `ionic cap sync --no-build`

- Open Electron version `ionic cap open electron`

### Windows Package

Requires `electron-installer-windows` and `electron-packager` installed globally

- Build for Windows `npm run electron:windows`

- Create Windows package `npm run electron:windows:exe`

### Debian Package

Requires `electron-installer-debian` and `electron-packager` installed globally

- Build for Linux `npm run electron:linux`

- Create Debian package `npm run electron:linux:deb`
