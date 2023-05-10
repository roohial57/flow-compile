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
const data = {
  nodes: [
    {
      id: '0',
      label: '000',
      type: 'circle',
    },
    {
      id: '1',
      label: '1',
    },
    {
      id: '2',
      label: '2',
    },
    {
      id: '3',
      label: '3',
    },
    {
      id: '4',
      label: '4',
    },
    {
      id: '5',
      label: '5',
    }
  ],
  edges: [
    {
      source: '0',
      target: '1',
    },
    {
      source: '1',
      target: '2',
    },
    {
      source: '2',
      target: '3',
    },
    {
      source: '3',
      target: '4',
    },
    {
      source: '4',
      target: '5',
    },
  ],
};
export default {
  name: 'CharEditor',
  components: { ContextMenu, SelectNodeType },
  data() {
    return {
      data,
      graph: null
    }
  },
  methods: {
    showAddNode(source) {
      this.$refs.selectNodeType1.show(source);
    },
    addNode(nodeType, source) {
      const id = source._cfg.id;
      let node = this.data.nodes.find(x => x.id == id);
      let edge = this.data.edges.find(x => x.source == id);
      let newNode = {
        id: '15',
        label: '15',
      };
      this.data.nodes.push(newNode);
      this.data.edges.push({
        source: '15',
        target: edge.target,
      });
      edge.target=newNode.id;
    this.graph.data(data);
    this.graph.render();
    }
  },
  mounted() {
    this.graph = AntVGraph('chart1', data);
    this.graph.data(data);
    this.graph.render();

    this.graph.on('node:click', (ev) => {
      const shape = ev.target;
      const item = ev.item;
      if (item) {
        const type = item.getType();
      }
      this.$refs.contextMenu1.show(item, ev.clientX, ev.clientY)
    });
    this.graph.on('edge:click', (ev) => {
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