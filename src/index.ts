/**
 * @Author: Caven Chen
 */

import path from "path";
import fs from "fs-extra";
import serveStatic from "serve-static";
import { HtmlTagDescriptor, normalizePath, Plugin } from "vite";

interface VitePluginDcOptions {
  libPath? :string;
  outPath?: string;
}

function vitePluginDC(
  options: VitePluginDcOptions = {
    outPath: "",
    libPath :""
  }
): Plugin {
  let  dcDist = path.join(options.libPath || "./node_modules/@dvgis/dc-sdk" ,'dist');
  let base = "/";
  let outDir = "dist";
  let isBuild = false;
  let outPath = options.outPath ||  "/libs/dc-sdk";

  return {
    name: "vite-plugin-dc",
    config(config, { command }) {
      isBuild = command === "build";
      base = config.base || "/";
      outDir = config.build?.outDir || "dist";
    },
    configureServer({middlewares}) {
      middlewares.use(outPath , serveStatic(normalizePath(dcDist)))
    },
    closeBundle() {
      if (isBuild) {
        try {
          fs.copySync(
              path.join(dcDist, "dc.min.js"),
              path.join(outDir, String(outPath), "dc.min.js")
          );
          fs.copySync(
              path.join(dcDist, "dc.min.css"),
              path.join(outDir, String(outPath), "dc.min.css")
          );
          fs.copySync(
              path.join(dcDist, "resources"),
              path.join(outDir, String(outPath), "resources")
          );
        } catch (e) {}
      }
    },
    transformIndexHtml() {
      let tags: HtmlTagDescriptor[] = [];
      tags.push({
        tag: "script",
        attrs: {
          src: normalizePath(
              path.join(base, String(outPath), "dc.min.js")
          ),
        },
        injectTo: "head",
      });
      tags.push({
        tag: "link",
        attrs: {
          rel: "stylesheet",
          href: normalizePath(
              path.join(base, String(outPath), "dc.min.css")
          ),
        },
        injectTo: "head",
      });
      return tags;
    },
  };
}

export default vitePluginDC;
