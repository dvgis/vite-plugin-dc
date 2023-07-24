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

**_libPath_**

Which directory gets the dc-sdk lib

- **type** : String
- **default**: './node_modules/@dvgis/dc-sdk'

**_outPath_**

Directory to export dc-sdk lib to

- **type** : String
- **default**: '/libs/dc-sdk'


## Copyright

```warning
1. The framework is a basic platform, completely open source, which can be modified and reconstructed by any individual or institution without our authorization.
2. We are not responsible for any problems arising from the modification of the framework by individuals and organizations.
3. The package released by us may be used permanently and free of charge by any person or organization subject to:
  1) complete package reference;
We reserve the right of final interpretation of this copyright information.
```
