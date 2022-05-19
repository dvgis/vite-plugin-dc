/**
 * @Author: Caven
 * @Date: 2022-02-13 14:37:15
 */

import path from "path";
import fs from "fs-extra";
import serveStatic from "serve-static";
import { HtmlTagDescriptor, normalizePath, Plugin } from "vite";

interface VitePluginDcOptions {
  packages?: String[];
  libsPath?: String;
  useCDNMode?: Boolean;
}

function vitePluginDC(
  options: VitePluginDcOptions = {
    packages: ["core", "mapv", "chart"],
    libsPath: "libs",
    useCDNMode: true,
  }
): Plugin {
  const dcsdkDist = "./node_modules/@dvgis/dc-sdk/dist";
  let base = "/";
  let outDir = "dist";
  let isBuild = false;
  let libsPath = options.libsPath || "libs";
  let useCDNMode = options.useCDNMode || false;
  let packages = options.packages || ["core", "mapv", "chart"];

  return {
    name: "vite-plugin-dc",
    config(config, { command }) {
      isBuild = command === "build";
      base = config.base || "/";
      outDir = config.build?.outDir || "dist";
    },
    configureServer({ middlewares }) {
      middlewares.use(
        `/${libsPath}/dc-sdk`,
        serveStatic(normalizePath(dcsdkDist))
      );
    },
    closeBundle() {
      if (isBuild) {
        try {
          fs.copySync(
            path.join(dcsdkDist, "resources"),
            path.join(outDir, String(libsPath), "dc-sdk", "resources")
          );
          if (useCDNMode) {
            fs.copySync(
              path.join(dcsdkDist, "dc.base.min.js"),
              path.join(outDir, String(libsPath), "dc-sdk", "dc.base.min.js")
            );
            if (Number(packages?.indexOf("core")) >= 0) {
              fs.copySync(
                path.join(dcsdkDist, "dc.core.min.js"),
                path.join(outDir, String(libsPath), "dc-sdk", "dc.core.min.js")
              );
              fs.copySync(
                path.join(dcsdkDist, "dc.core.min.css"),
                path.join(outDir, String(libsPath), "dc-sdk", "dc.core.min.css")
              );
            }
            if (Number(packages?.indexOf("mapv")) >= 0) {
              fs.copySync(
                path.join(dcsdkDist, "dc.mapv.min.js"),
                path.join(outDir, String(libsPath), "dc-sdk", "dc.mapv.min.js")
              );
            }
            if (Number(packages?.indexOf("chart")) >= 0) {
              fs.copySync(
                path.join(dcsdkDist, "dc.chart.min.js"),
                path.join(outDir, String(libsPath), "dc-sdk", "dc.chart.min.js")
              );
            }
          }
        } catch (e) {}
      }
    },
    transformIndexHtml() {
      let tags: HtmlTagDescriptor[] = [];
      if (!useCDNMode) {
        return tags;
      }
      tags.push({
        tag: "script",
        attrs: {
          src: normalizePath(
            path.join(base, String(libsPath), "dc-sdk", "dc.base.min.js")
          ),
        },
        injectTo: "head",
      });

      if (Number(packages?.indexOf("core")) >= 0) {
        tags.push({
          tag: "script",
          attrs: {
            src: normalizePath(
              path.join(base, String(libsPath), "dc-sdk", "dc.core.min.js")
            ),
          },
          injectTo: "head",
        });
        tags.push({
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: normalizePath(
              path.join(base, String(libsPath), "dc-sdk", "dc.core.min.css")
            ),
          },
          injectTo: "head",
        });
      }

      if (Number(packages?.indexOf("mapv")) >= 0) {
        tags.push({
          tag: "script",
          attrs: {
            src: normalizePath(
              path.join(base, String(libsPath), "dc-sdk", "dc.mapv.min.js")
            ),
          },
          injectTo: "head",
        });
      }

      if (Number(packages?.indexOf("chart")) >= 0) {
        tags.push({
          tag: "script",
          attrs: {
            src: normalizePath(
              path.join(base, String(libsPath), "dc-sdk", "dc.chart.min.js")
            ),
          },
          injectTo: "head",
        });
      }
      return tags;
    },
  };
}

export default vitePluginDC;
