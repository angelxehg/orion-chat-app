# Tomatoe Chat

![Logo Aplicación](./src/assets/icon/favicon.png)

Aplicación de mensajería organizada en canales. Es una evolución de Orion Chat. Disponible para [Web](https://orion.angelxehg.com) y [Android](https://github.com/angelxehg/tomatoe-chat/releases)

- [Repositorio API Antigua](https://github.com/angelxehg/tomatoe-chat-api)

## Instalación

Use estos comandos para instalar la aplicación:

- Instalar Ionic CLI: `npm install -g @ionic/cli`

- Clonar el repositorio: `git clone https://github.com/angelxehg/tomatoe-chat.git`

- Instalar dependencias: `cd tomatoe-chat` & `npm install`

- Iniciar servidor: `ionic serve`

## Instalación en Dispositivos

Compilar y probar aplicación en dispositivos:

- Compilar assets con Ionic: `ionic build --prod`

<!-- - Ejecutar Jetifier (solo Android): `npx jetify` -->

- Copiar assets y actualizar plugins:

  - Android: `npx cap sync android`

  - iOS: `npx cap sync ios`

- Abrir IDE y compilar (Se abrirá Android Studio u Xcode):

  - Android: `npx cap open android`

  - iOS: `npx cap open ios`

## Tests y calidad

Use estos comandos para ejecutar pruebas y verificar calidad del código:

- Code linting: `ng lint`

- Unit testing: `ng test` (headless `ng test --configuration=ci`)

- E2E testing: `ng e2e` (headless `ng e2e --configuration=ci`)

## Configurar Visual Studio Code

Instale las siguientes extensiones si va a trabajar en el código:

- [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)

- [npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)

- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)

Configure VSCode para poder hacer debug:

- Iniciar servidor sin abrir navegador: `ionic serve --no-open`

- Crea el archivo `.vscode/launch.json` con el siguiente contenido:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:8100",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

- Lanza desde el menú de Debug en VSCode
