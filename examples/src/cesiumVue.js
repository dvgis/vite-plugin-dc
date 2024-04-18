export const CESIUM_REF_KEY = Symbol();

export default {
  install: function (app) {
    const cr = {
      viewer: undefined,
    };
    app.config.globalProperties.$cesiumRef = cr;
    app.provide(CESIUM_REF_KEY, cr);
  },
};
