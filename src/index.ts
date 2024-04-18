/**
 * @Author: Caven Chen
 */

import path from 'path';
import fs from 'fs-extra';
import serveStatic from 'serve-static';
import { HtmlTagDescriptor, normalizePath, Plugin } from 'vite';

interface VitePluginDcOptions {
  libPath?: string;
  outPath?: string;
  useCDN?: boolean;
}

function vitePluginDC(
  options: VitePluginDcOptions = {
    outPath: '',
    libPath: '',
    useCDN: false
  }
): Plugin {
  let dcDist =
    options.libPath || path.join('./node_modules/@dvgis/dc-sdk', 'dist');
  let base = '/';
  let outDir = 'dist';
  let isBuild = false;
  let outPath = options.outPath || '/libs/dc-sdk';
  let useCDN = options.useCDN
  return {
    name: 'vite-plugin-dc',
    config(config, { command }) {
      isBuild = command === 'build';
      base = config.base || '/';
      outDir = config.build?.outDir || 'dist';
      if(!useCDN){
        if(config.optimizeDeps ){
          config.optimizeDeps.exclude = [...(config.optimizeDeps.exclude || []),"@dvgis/dc-sdk"]
        }
      }
    },
    configureServer({ middlewares }) {
      middlewares.use(
        normalizePath(path.join('/' , base, outPath)),
        serveStatic(normalizePath(dcDist))
      );
    },
    closeBundle() {
      if (isBuild) {
        try {
          if(useCDN){
            fs.copySync(
                path.join(dcDist, 'dc.min.js'),
                path.join(outDir, outPath, 'dc.min.js')
            );
            fs.copySync(
                path.join(dcDist, 'dc.min.css'),
                path.join(outDir, outPath, 'dc.min.css')
            );
          }
          fs.copySync(
            path.join(dcDist, 'resources'),
            path.join(outDir, outPath, 'resources')
          );
        } catch (e) {}
      }
    },
    transformIndexHtml() {
      let tags: HtmlTagDescriptor[] = [];
      if(useCDN) {
        tags.push({
          tag: 'script',
          attrs: {
            src: normalizePath(path.join('/', base, outPath, 'dc.min.js')),
          },
          injectTo: 'head',
        });
        tags.push({
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: normalizePath(path.join('/', base, outPath, 'dc.min.css')),
          },
          injectTo: 'head',
        });
      }
      return tags;
    },
  };
}

export default vitePluginDC;
