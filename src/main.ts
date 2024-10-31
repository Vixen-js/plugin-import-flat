import path from "path";
import fs from "fs/promises";

type PluginOptions = {
  filterRegexp: RegExp;
  namespace: string;
  transform: (code: string, args: any) => Promise<string>;
};

type EsbuildPlugin = {
  name: string;
  setup: (build: any) => void;
};

function generateRandNameSpace() {
  return (
    Math.round(Math.random() * 1000 + 1).toString(36) +
    Math.round(Math.random() * 1000 + 1).toString(36)
  );
}

export default (
  options: PluginOptions = {
    filterRegexp: /\?raw$/,
    namespace: `_${generateRandNameSpace()}`,
    transform: async (code: string, _args: any) => code,
  }
): EsbuildPlugin => {
  const { filterRegexp, namespace, transform } = options;

  return {
    name: "plugin-import-flat",
    setup(build) {
      build.onResolve({ filter: filterRegexp }, async (args: any) => {
        let cleanPath = path.resolve(args.resolveDir, args.path);

        try {
          await fs.access(cleanPath);
        } catch (_) {
          cleanPath = path.resolve(
            args.resolveDir,
            args.path.replace(filterRegexp, "")
          );
        }

        return {
          path: cleanPath,
          namespace,
        };
      });

      build.onLoad({ filter: /.*/, namespace }, async (args: any) => {
        let fileContent = await fs.readFile(args.path, "utf-8");

        if (typeof transform === "function") {
          fileContent = await transform(fileContent, args);
        }

        return {
          contents: fileContent,
          watchFiles: [args.path],
          loader: "text",
        };
      });
    },
  };
};
