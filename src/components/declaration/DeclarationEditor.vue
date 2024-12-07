<template>
  <div>
    <vs-popup class="holamundo" title="ویرایش" :active.sync="visible">
      Type:
      <v-select label="Select" :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
      <select v-model="item.Type">
        <option v-for="option in VariableType" :value="option">
          {{ option }}
        </option>
      </select>
      <br />
      Name:
      <input v-model="item.Name" />
      <br />
      <input type="button" value="Save" @click="save" />
    </vs-popup>
  </div>
</template>

<script>
import { VariableType } from './VariableType.ts';
import { Variable } from './Variable.ts';
export default {
  name: 'operation',
  components: {},
  data() {
    return {
      VariableType,
      visible: false,
      item: new Variable()
    }
  },
  computed: {
  },
  methods: {
    show(item) {
      this.visible = true;
      this.item = item;
    },
    save() {
      if (!this.item.Name || !/^[A-Za-z][A-Za-z0-9_]*$/.test(this.item.Name)) {
        alert("Variable name shuld beginn by alfabet and contain alfanumeric!");
        return;
      }
      this.$emit("save", this.item);
      this.visible = false;
    }
  },
  mounted() {
  }
}
</script> 
<style></style>