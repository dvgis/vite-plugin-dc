<template>
  <div class="index">
    <Viewer @on-viewer-created="viewerCreated" />
  </div>
</template>

<script setup>
import Viewer from './Viewer.vue';
const viewerCreated = (viewer) => {
  let baseLayer = DC.ImageryLayerFactory.createAmapImageryLayer({
    style: 'img',
    crs: "WGS84"
  })
  viewer.addBaseLayer(baseLayer);
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#app,
html,
body,
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#viewer-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.btn-box {
  position: absolute;
  top: 15px;
  left: 15px;
  min-height: unset;
  height: 30px;
  z-index: 1;
  background: rgba(0, 0, 0, 0.6);
  padding: 10px 10px 5px 10px;
  border-radius: 10px;
  color: #fff;
  user-select: none;
}

.btn-box button {
  width: 60px;
  height: 20px;
  margin: 0 5px;
  background-color: rgba(32, 160, 255, .2);
  border: 1px solid #cecece;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  outline: none;
}
</style>
