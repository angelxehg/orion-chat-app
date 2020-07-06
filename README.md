# Orion Chat App

Orion Hybrid Chat application

- Run application in browser `ionic serve`

## Build (Android)

- Compile sources `ionic build --prod`

- Copy sources to android `ionic cap sync --no-build`

- Open Android Studio `ionic cap open android`

## Build (Electron)

- Compile sources for Electron `npm run build:electron`

- Copy sources to electron `ionic cap sync --no-build`

- Open Electron version `ionic cap open electron`

### Windows Package

Requires `electron-installer-windows`

- Build for Windows `npm run electron:windows`

- Create Windows package `npm run electron:windows:exe`

### Debian Package

Requires `electron-installer-debian`

- Build for Linux `npm run electron:linux`

- Create Debian package `npm run electron:linux:deb`
