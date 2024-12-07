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
import { defineComponent, ref } from 'vue';
import { VariableType } from './declaration/VariableType';
import { Variable } from './declaration/Variable';
import AntVGraph from "./ant-graph/AntVGraph";
import ContextMenu from './ContextMenu.vue';
import SelectNodeType from './SelectNodeType.vue';
import OperationEditor from './operation/OperationEditor.vue';
import DeclarationEditor from './declaration/DeclarationEditor.vue';
import InputEditor from './input/InputEditor.vue';
import OutputEditor from './output/OutputEditor.vue';
import { NodeType } from '@/enum';

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
    addNode(nodeType: NodeType, data: { source: any; branchNo: number }) {
      const id = AntVGraph.getId(data.source);
      AntVGraph.addNode(nodeType, id, data.branchNo);
    },
    showNodeMenu(ev: any) {
      const item = ev.item;
      let contextMenuItems: Array<any> = []; // Properly type the array if possible
      if (AntVGraph.getNodeType(item).canEdit) {
        contextMenuItems.push({
          icon: "edit",
          text: 'ویرایش',
          divider: true,
          click: () => {
            switch (AntVGraph.getNodeType(item)) {
              case NodeType.Declaration:
                const variable = new Variable(item._cfg.id, VariableType.Number, "aaaa");
                (this.$refs.declarationEditor1 as any).show(variable);
                break;
            }
          }
        });
      }
      switch (AntVGraph.getNodeType(item)) {
        case NodeType.Operation:
        case NodeType.Start:
          contextMenuItems.push({
            icon: 'plus',
            text: 'اضافه کردن فرزند',
            click: () => {
              this.showAddNode({ source: item, branchNo: 0 });
            }
          });
          break;
        case NodeType.Condition:
          contextMenuItems.push(
            {
              icon: 'plus',
              text: 'اضافه کردن فرزند true',
              click: () => {
                this.showAddNode({ source: item, branchNo: 0 });
              }
            },
            {
              icon: 'plus',
              text: 'اضافه کردن فرزند false',
              click: () => {
                this.showAddNode({ source: item, branchNo: 1 });
              }
            }
          );
      }
      (this.$refs.contextMenu1 as any).show(contextMenuItems, ev.clientX, ev.clientY);
    },
    showEdgeMenu(ev: any) {
      const item = AntVGraph.getSourceOfEdge(ev.item);
      const branchNo = AntVGraph.getEdges(item)
        .filter((x: any) => AntVGraph.getSourceOfEdge(x) === item)
        .findIndex((x: any) => x === ev.item);
      this.showAddNode({ source: item, branchNo: branchNo });
      return;
      let contextMenuItems = [
        {
          icon: 'plus',
          text: 'اضافه کردن فرزند',
          divider: true,
          click: () => {
            this.showAddNode({ source: item, branchNo: branchNo });
          }
        }
      ];
      (this.$refs.contextMenu1 as any).show(contextMenuItems, ev.clientX, ev.clientY);
    },
    saveDeclaration(data: any) {
      console.log('object :>> ', data);
    }
  },
  mounted() {
    AntVGraph.init('chart1');
    this.addNode(NodeType.Declaration, { source: AntVGraph.getNodes()[0], branchNo: 0 });
    AntVGraph.graph.on('node:click', this.showNodeMenu);
    AntVGraph.graph.on('edge:click', this.showEdgeMenu);
  }
});
</script>

<style>
.flow-nav {
  /* width: 800px;
  height: 700px */
}
</style>