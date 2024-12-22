<template>
  <div class="flow-nav">
    <div id="chart1"></div>
    <context-menu ref="contextMenu1" @add="showAddNode" />
    <select-node-type ref="selectNodeType1" @select="addNode" />
    <operation-editor ref="operationEditor1" />
    <declaration-editor ref="declarationEditor1" @save="saveDeclaration" />
    <input-editor ref="inputEditor1" />
    <output-editor ref="outputEditor" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { VariableType } from './declaration/VariableType';
import { Variable } from './declaration/Variable';
import Graph from "./graph/Graph";
import ContextMenu from './ContextMenu.vue';
import SelectNodeType from './add-node/SelectNodeType.vue';
import OperationEditor from './operation/OperationEditor.vue';
import DeclarationEditor from './declaration/DeclarationEditor.vue';
import InputEditor from './input/InputEditor.vue';
import OutputEditor from './output/OutputEditor.vue';
import { NodeType,NodeTypeDetails } from './graph/NodeType';

export default defineComponent({
  name: 'CharEditor',
  components: {
    ContextMenu,
    SelectNodeType,
    OperationEditor,
    DeclarationEditor,
    InputEditor,
    OutputEditor
  },
  data() {
    return {
      graph: null as any
    };
  },
  methods: {
    showAddNode(data: any) {
      (this.$refs.selectNodeType1 as any).show(data);
    },
    addNode(nodeType: any, data: { sourceId: string; branchNo: number }) {
      Graph.addNode(nodeType, data.sourceId, data.branchNo);
    },
    showNodeMenu(ev: any) {
      const item = ev.item;
      let contextMenuItems: Array<any> = []; // Properly type the array if possible
      if (NodeTypeDetails[Graph.getNodeType(item)].canEdit) {
        contextMenuItems.push({
          icon: "edit",
          text: 'ویرایش',
          divider: true,
          click: () => {
            switch (Graph.getNodeType(item)) {
              case NodeType.Declaration:
                let node = Graph.getNode(item._cfg.id);
                (this.$refs.declarationEditor1 as any).show(node!.id, node!.data);
                break;
            }
          }
        });
      }
      switch (Graph.getNodeType(item)) {
        case NodeType.Operation:
        case NodeType.Start:
          contextMenuItems.push({
            icon: 'plus',
            text: 'اضافه کردن فرزند',
            click: () => {
              this.showAddNode({ sourceId: item.id, branchNo: 0 });
            }
          });
          break;
        case NodeType.Condition:
          contextMenuItems.push(
            {
              icon: 'plus',
              text: 'اضافه کردن فرزند true',
              click: () => {
                this.showAddNode({ sourceId: item.id, branchNo: 0 });
              }
            },
            {
              icon: 'plus',
              text: 'اضافه کردن فرزند false',
              click: () => {
                this.showAddNode({ sourceId: item.id, branchNo: 1 });
              }
            }
          );
      }
      (this.$refs.contextMenu1 as any).show(contextMenuItems, ev.clientX, ev.clientY);
    },
    showEdgeMenu(ev: any) {
      const item = Graph.getSourceOfEdge(ev.item);
      const branchNo = Graph.getEdges(item)
        .filter((x: any) => Graph.getSourceOfEdge(x) === item)
        .findIndex((x: any) => x === ev.item);
      this.showAddNode({ sourceId: item.id, branchNo: branchNo });
      return;
      let contextMenuItems = [
        {
          icon: 'plus',
          text: 'اضافه کردن فرزند',
          divider: true,
          click: () => {
            this.showAddNode({ sourceId: item.id, branchNo: branchNo });
          }
        }
      ];
      (this.$refs.contextMenu1 as any).show(contextMenuItems, ev.clientX, ev.clientY);
    },
    saveDeclaration(nodeId: string, data: any) {
      Graph.editNode(nodeId, data);
    }
  },
  mounted() {
    Graph.init('chart1');
    this.addNode(NodeType.Declaration, { sourceId: Graph.getNodes()[0].id, branchNo: 0 });
    Graph.onNodeClick(this.showNodeMenu);
    Graph.onEdgeClick(this.showEdgeMenu);
  }
});
</script>

<style>
.flow-nav {
  /* width: 800px;
  height: 700px */
}
</style>