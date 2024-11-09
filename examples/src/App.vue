<template>
  <div class="index">
    <Viewer @on-viewer-created="viewerCreated" />
  </div>
</template>

<script setup>
import Viewer from './components/Viewer.vue';
import ViewerApi from "./api/ViewerApi";
const viewerCreated = (viewer) => {
  let viewerApi = new ViewerApi(viewer)
  viewerApi.addAMapImagery()
  window.viewerApi = viewerApi
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

</style>
