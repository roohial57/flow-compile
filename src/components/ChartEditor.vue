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
import { NodeType } from '@/enum.js';
export default {
  name: 'CharEditor',
  components: { ContextMenu, SelectNodeType },
  data() {
    return {
      graph: null
    }
  },
  methods: {
    showAddNode(data) {
      this.$refs.selectNodeType1.show(data);
    },
    addNode(nodeType, data) {
      const id = AntVGraph.getId(data.source);
      AntVGraph.addNode(nodeType, id, data.branchNo);
    },
    showNodeMenu(ev) {
      const item = ev.item;
      let contextMenuItems = [
        {
          icon: "edit",
          text: 'ویرایش',
          divider: true,
          click: () => {
            alert('Option0!')
          }
        }
      ];
      switch (AntVGraph.getNodeType(item)) {
        case NodeType.Operation:
        case NodeType.Start:
          contextMenuItems.push(
            {
              icon: 'plus',
              text: 'اضافه کردن فرزند',
              click: () => {
                this.showAddNode({ source: item, branchNo: 0 })
              }
            });
          break;
        case NodeType.Condition:
          contextMenuItems.push({
            icon: 'plus',
            text: 'اضافه کردن فرزند true',
            click: () => {
              this.showAddNode({ source: item, branchNo: 0 })
            }
          },
            {
              icon: 'plus',
              text: 'اضافه کردن فرزند false',
              click: () => {
                this.showAddNode({ source: item, branchNo: 1 })
              }
            });
      }
      this.$refs.contextMenu1.show(contextMenuItems, ev.clientX, ev.clientY)
    },
    showEdgeMenu(ev) {
      const item = AntVGraph.getSourceOfEdge(ev.item);
      const branchNo = AntVGraph.getEdges(item).filter(x => AntVGraph.getSourceOfEdge(x) == item).findIndex(x => x == ev.item);
      let contextMenuItems = [
        {
          icon: 'plus',
          text: 'اضافه کردن فرزند',
          divider: true,
          click: () => {
            this.showAddNode({ source: item, branchNo: branchNo })
          }
        }
      ];
      this.$refs.contextMenu1.show(contextMenuItems, ev.clientX, ev.clientY)
    }
  },
  mounted() {
    AntVGraph.init('chart1');

    AntVGraph.graph.on('node:click', this.showNodeMenu);
    AntVGraph.graph.on('edge:click', this.showEdgeMenu);
  }
}
</script> 
<style>
.flow-nav {
  /* width: 800px;
  height: 700px */
}
</style>