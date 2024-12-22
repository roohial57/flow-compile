<template>
  <div>
    <vs-popup class="holamundo" title="Lorem ipsum dolor sit amet" :active.sync="visible">
      <p v-for="(item, index) of NodeTypeDetails" :key="index" @click="select(item.value)" v-if="item.canAdd">
        {{ item.title }}</p>
    </vs-popup>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NodeType,NodeTypeDetails } from '../graph/NodeType';

@Component
export default class SelectNodeType extends Vue {
  NodeTypeDetails: any = NodeTypeDetails;
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