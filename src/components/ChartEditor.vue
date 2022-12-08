<template>
  <div class="flow-nav">
    <v-g-editor  ref="editor1" height="700" width="800"> aaaaaaaaaaa
      <flow :data="data" height="700" width="800" ref="flow1" />
    </v-g-editor>
  </div>
</template>

<script>
import VGEditor, { Flow } from 'vg-editor'
const data = {
  nodes: [{
    type: 'node',
    size: '70*70',
    shape: 'flow-circle',
    color: '#FA8C16',
    label: 'Start',
    x: 55,
    y: 55,
    id: 'ea1184e8',
    index: 0,
  }, {
    type: 'node',
    size: '70*70',
    shape: 'flow-circle',
    color: '#FA8C16',
    label: 'End',
    x: 55,
    y: 255,
    id: '481fbb1a',
    index: 2,
  }],
  edges: [{
    source: 'ea1184e8',
    sourceAnchor: 2,
    target: '481fbb1a',
    targetAnchor: 0,
    id: '7989ac70',
    index: 1,
  }],
};
export default {
  name: 'CharEditor',
  data() {
    return { data }
  },
  components: { VGEditor, Flow },
  methods:{},
  mounted(){
    setTimeout(() => {
      document.getElementById('canvas_1').height=700;
      document.getElementById('canvas_1').width=800;
    }, 3000);
  }
}
</script> 
<style>
.flow-nav {
  /* width: 800px;
  height: 700px */
}
canvas#canvas_1 {
    height: 700px !important;
    width: 800px !important;
    border: 1px solid;
}
</style>