<template>
  <div class="index">
    <div class="viewer-container" id="viewer-container"></div>
  </div>
</template>

<script>
  export default {
    name:'index',
    methods:{
      initViewer(){
        let viewer = new  DC.Viewer("viewer-container")
      }
    },
    mounted() {
      this.$nextTick(()=>{
        DC.ready(this.initViewer)
      })
    }
  }
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
#app,html,body,.index{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.viewer-container{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
