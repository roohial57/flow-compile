<template>
  <div>
    <vs-popup class="holamundo" title="ویرایش" :active.sync="visible">
      Type:
      <v-select label="Select" :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
      <select v-model="selectedType">
        <option v-for="option in VariableType" :value="option">
          {{ option }}
        </option>
      </select>
      <br />
      Name:
      <input v-model="typeName" />
      <br />
      <input type="button" value="Save" @click="save" />
    </vs-popup>
  </div>
</template>

<script>
import { VariableType } from './VariableType.ts';
export default {
  name: 'operation',
  components: {},
  data() {
    return {
      nodeId: null,
      VariableType,
      visible: false,
      selectedType: VariableType.Number,
      typeName: '',
    }
  },
  computed: {
  },
  methods: {
    show(id) {
      this.visible = true;
      this.nodeId = id;
    },
    save() {
      if (!this.typeName || !/^[A-Za-z][A-Za-z0-9_]*$/.test(this.typeName)) {
        alert("Variable name shuld beginn by alfabet and contain alfanumeric!");
        return;
      }
      this.$emit("save", { nodeId: this.nodeId, selectedType: this.selectedType, typeName: this.typeName });
      this.visible = false;
    }
  },
  mounted() {
  }
}
</script> 
<style></style>