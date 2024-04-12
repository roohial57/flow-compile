<template>
  <div>
    <ki-context ref="kiContext" minWidth='1em' maxWidth='15em' backgroundColor='#fbfbfb' fontSize='15px'
      textColor='#35495e' iconColor='#41b883' borderRadius='0.1' />
  </div>
</template>

<script>
import kiContext from '@kiyoaki_w/vue-context'
import Vue from 'vue'
Vue.use(kiContext)
export default {
  name: 'context-menu',
  components: {},
  data() {
    return {
    }
  },
  methods: {
    show(items,x, y) {
      var params = {
        pageX: x,
        pageY: y,
      };
      setTimeout(() => {
        this.$refs.kiContext.show(params, items);
      }, 1);
    },
    hideContextMenu() {
      this.$refs.kiContext.hide();
    }
  },
  mounted() {
    window.onclick = () => {
      this.hideContextMenu();
    }
  }
}
</script> 
<style></style>