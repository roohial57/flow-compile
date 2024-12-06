<template>
  <div class="home">
    <chart-editor/>
  </div>
</template>

<script lang="ts">
import ChartEditor from '@/components/ChartEditor.vue'
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    'chart-editor':ChartEditor
  },
})
export default class HomeView extends Vue {}
</script>
