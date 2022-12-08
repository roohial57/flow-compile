<template>
  <div class="home">
    <chart-editor/>
  </div>
</template>

<script>
// @ is an alias to /src
import ChartEditor from '@/components/ChartEditor.vue'

export default {
  name: 'HomeView',
  components: {
    ChartEditor
  }
}
</script>
