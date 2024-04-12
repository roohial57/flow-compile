<template>
  <div>
    <vs-popup class="holamundo" title="Lorem ipsum dolor sit amet" :active.sync="visible">
      <p v-for="(nodeType,index) of NodeType" :key="index" @click="select(nodeType)">{{ nodeType.title }}</p>
    </vs-popup>
  </div>
</template>

<script>
import {NodeType} from '@/enum.js';
export default {
  name: 'SelectNodeType',
  components: {},
  data() {
    return {
      NodeType,
      visible: false,
      source:null
    }
  },
  computed:{
  },
  methods: {
    show(source) {
      this.source=source;
      this.visible = true;
    },
    select(value) {
      this.visible = false;
      this.$emit("select",value,this.source)
    },
  },
  mounted() {
  }
}
</script> 
<style></style>