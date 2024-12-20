<template>
  <div>
    <vs-popup class="holamundo" title="Lorem ipsum dolor sit amet" :active.sync="visible">
      <p v-for="(nodeType, index) of NodeType" :key="index" @click="select(nodeType)" v-if="nodeType.canAdd">{{
        nodeType.title }}</p>
    </vs-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NodeType } from '../graph/NodeType';

@Component
export default class SelectNodeType extends Vue {
  NodeType: any = NodeType;
  visible: boolean = false;
  data: any = null;

  show(data: any) {
    this.data = data;
    this.visible = true;
  }

  select(value: any) {
    this.visible = false;
    this.$emit('select', value, this.data);
  }

  mounted() {
  }
}
</script>
<style></style>