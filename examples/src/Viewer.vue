<template>
  <div :id="mapId"></div>
</template>

<script setup>
import { onMounted, onUnmounted, inject } from 'vue';
import { CESIUM_REF_KEY } from './cesiumVue';

const props = defineProps({
  mapId: {
    type: String,
    default: 'viewer-container',
  },
  options: {
    type: Object,
  },
})

const emit = defineEmits(['on-viewer-created']);

const cesiumRef = inject(CESIUM_REF_KEY);

const initViewer = () => {
  const viewer = new DC.Viewer(props.mapId, props.options || {});
  if (!cesiumRef) {
    throw new Error('No cesium reference exist.');
  }
  cesiumRef.viewer = viewer;

  return viewer;
}

onMounted(() => {
  DC.ready().then(() => {
    const viewer = initViewer();
    emit('on-viewer-created', viewer);
  });
});

onUnmounted(() => {
  const cesiumRef = inject(CESIUM_REF_KEY);
  if (cesiumRef) {
    cesiumRef.viewer = undefined;
  }
});

</script>
