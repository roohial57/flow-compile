<template>
  <div>
    <vs-popup class="holamundo" title="ویرایش" :active.sync="visible">
      aaaaaaaaaaaaaa
    </vs-popup>
  </div>
</template>

<script>
import { NodeType } from '@/enum.js';
export default {
  name: 'operation',
  components: {},
  data() {
    return {
      NodeType,
      visible: false,
      data: null
    }
  },
  computed: {
  },
  methods: {
    show() {
      this.visible = true;
    }
  },
  mounted() {
  }
}
</script> 
<style></style>