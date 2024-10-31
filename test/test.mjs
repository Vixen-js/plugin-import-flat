import * as esbuild from "esbuild";
import flatImport from "../dist/main.js";

esbuild.build({
  entryPoints: ["./mock.ts"],
  outfile: "./mock.js",
  outExtension: { ".js": ".mjs" },
  bundle: true,
  plugins: [flatImport()],
});
