<template>
  <div>
    <vs-popup class="holamundo" title="Lorem ipsum dolor sit amet" :active.sync="visible">
      <p v-for="(nodeType,index) of NodeType" :key="index" @click="select(nodeType)" v-if="nodeType.canAdd">{{ nodeType.title }}</p>
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
      data:null
    }
  },
  computed:{
  },
  methods: {
    show(data) {
      this.data=data;
      this.visible = true;
    },
    select(value) {
      this.visible = false;
      this.$emit("select",value,this.data)
    },
  },
  mounted() {
  }
}
</script> 
<style></style>