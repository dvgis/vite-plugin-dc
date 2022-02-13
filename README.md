# vite-plugin-dc
Vite plugin for DC-SDK

## Install

```shell
npm i  @dvgis/dc-sdk  @dvgis/vite-plugin-dc vite  -D
# yarn add @dvgis/dc-sdk @dvgis/vite-plugin-dc vite  -D
```

## Usage
add blow codes to `vite.config.js`

```js
import { defineConfig } from 'vite';
import DC from '@dvgis/vite-plugin-dc';
export default defineConfig({
  plugins: [DC()]
});
```

##Options

**_libsPath_**

Which directory to put Cesium in

- **type** : String
- **default**: 'libs'

**_packages_**

Whether to use the unminified files in development mode

- **type** : Array
- **default**: ['core','mapv','chart']

**_useCDNMode_**

Whether to use the CDN method to import dc-sdk

- **type** : Boolean
- **default**: false

## Copyright

```warning
1. The framework is a basic platform, completely open source, which can be modified and reconstructed by any individual or institution without our authorization.
2. We are not responsible for any problems arising from the modification of the framework by individuals and organizations.
3. The package released by us may be used permanently and free of charge by any person or organization subject to:
  1) complete package reference;
We reserve the right of final interpretation of this copyright information.
```