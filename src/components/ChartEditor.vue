<template>
  <div class="flow-nav">
    <div id="chart1"></div>
    <context-menu ref="contextMenu1" @add="showAddNode" />
    <select-node-type ref="selectNodeType1" @select="addNode" />
  </div>
</template>

<script>
import AntVGraph from "./AntVGraph.js";
import ContextMenu from './ContextMenu.vue'
import SelectNodeType from './SelectNodeType.vue'
export default {
  name: 'CharEditor',
  components: { ContextMenu, SelectNodeType },
  data() {
    return {
      graph: null
    }
  },
  methods: {
    showAddNode(source) {
      this.$refs.selectNodeType1.show(source);
    },
    addNode(nodeType, source) {
      const id = source._cfg.id;
      AntVGraph.addNode(nodeType, id);
    }
  },
  mounted() {
    AntVGraph.init('chart1');

    AntVGraph.graph.on('node:click', (ev) => {
      const shape = ev.target;
      const item = ev.item;
      if (item) {
        const type = item.getType();
      }
      this.$refs.contextMenu1.show(item, ev.clientX, ev.clientY)
    });
    AntVGraph.graph.on('edge:click', (ev) => {
      alert('')
      const shape = ev.target;
      const item = ev.item;
      if (item) {
        const type = item.getType();
      }
    });
  }
}
</script> 
<style>
.flow-nav {
  /* width: 800px;
  height: 700px */
}
</style>