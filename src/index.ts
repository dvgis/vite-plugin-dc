/**
 * @Author: Caven
 * @Date: 2022-02-07 21:03:25
 */
const fs = require("fs-extra");
const path = require("path");
const serveStatic = require("serve-static");
import { HtmlTagDescriptor, normalizePath, Plugin, UserConfig } from "vite";

interface VitePluginDcOptions {
  packages?: String[];
}

function vitePluginDC(
  options: VitePluginDcOptions = {
    packages: ["core", "mapv", "chart"],
  }
): Plugin {
  const dvgisDist = "node_modules/@dvgis";
  let base: string = "/";
  let outDir = "dist";
  let isBuild: boolean = false;
  return {
    name: "vite-plugin-dc",
    config(config, { command }) {
      isBuild = command === "build";
      base = config.base || "./";
      if (config.build?.outDir) {
        outDir = config.build.outDir;
      }
    },
    configureServer({ middlewares }) {
      middlewares.use("libs/dc-sdk/res", serveStatic());
    },
    closeBundle() {
      if (isBuild) {
        try {
          fs.copyFileSync();
          fs.copyFileSync();
        } catch (err) {
          console.error("copy failed", err);
        }
      }
    },
    transformIndexHtml() {
      const tags: HtmlTagDescriptor[] = [];
      return tags;
    },
  };
}
export default vitePluginDC;
