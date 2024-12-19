<template>
  <div>
    <vs-popup class="holamundo" title="ویرایش" :active.sync="visible">
      Type:
      <v-select label="Select" :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
      <select v-model="item.Type">
        <option v-for="option in VariableType" :key="option" :value="option">
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

<script lang="ts">
import { defineComponent } from 'vue';
import { VariableType } from './VariableType';
import { Variable } from './Variable';

export default defineComponent({
  name: 'Operation',
  components: {},
  data() {
    return {
      VariableType,
      visible: false as boolean,
      id: 0 as Number,
      item: new Variable(0, VariableType.Number, '')
    };
  },
  computed: {
  },
  methods: {
    show(id: Number, item: Variable) {
      this.visible = true;
      this.id = id;
      if (item)
        this.item = item;
    },
    save() {
      // Type checking for item.Name ensures it exists and matches correct pattern
      if (!this.item.Name || !/^[A-Za-z][A-Za-z0-9_]*$/.test(this.item.Name)) {
        alert('Variable name should begin with an alphabet and contain only alphanumeric characters and underscores!');
        return;
      }

      // Emit event with the type specified (inferred from parent usage or documentation)
      this.$emit('save', this.id, this.item);
      this.visible = false;
    }
  },
  mounted() {
    // Lifecycle hook
  }
});
</script>

<style>
/* Add your styles here */
</style>