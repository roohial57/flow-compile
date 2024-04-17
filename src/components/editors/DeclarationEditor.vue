<template>
  <div>
    <vs-popup class="holamundo" title="ویرایش" :active.sync="visible">

      <select v-model="selected">
        <option v-for="option in VariableType" :value="option.value">
          {{ option.title }}
        </option>
      </select>

      <div>Selected: {{ selected }}</div>


    </vs-popup>
  </div>
</template>

<script>
import { VariableType } from '@/enum.js';
export default {
  name: 'operation',
  components: {},
  data() {
    return {
      VariableType,
      visible: false,
      selected: null,
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