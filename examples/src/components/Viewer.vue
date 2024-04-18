<template>
  <div :id="mapId"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

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

const initViewer = () => {
  const viewer = new DC.Viewer(props.mapId, props.options || {});
  emit('on-viewer-created', viewer);
}

onMounted(() => {
  DC.ready().then(initViewer);
});

onUnmounted(() => {
});

</script>
