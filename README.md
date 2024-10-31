#  Esbuild Plugin Import Flat

Esbuild Plugin to import files as text plain

## Installation

```bash
pnpm install @vixen-js/plugin-import-flat
```

## Usage

```js
// build.mjs contents
import * as esbuild from "esbuild";
import flatImport from "@vixen-js/plugin-import-flat";

esbuild.build({
    plugins: [flatImport()],
    ...
})
```

```ts
// main.ts contents
import styles from "./myStyles.css?raw"; // This file should be compiled as plain text by esbuild
// const styles = "[your myStyles file content]";

console.log(styles);
```

## Options

```ts
export interface PluginOptions {
  filterRegexp?: RegExp;  // Default: /\?raw$/
  namespace?: string;    // Plugin instance identifier
  transform?: (code: string, args: any) => Promise<string>; // Function to apply transformations to the file content
}
```

## License

[AGPL-3.0-only](LICENSE)
