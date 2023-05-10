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
      source:null
    }
  },
  methods: {
    show(source,x, y) {
      this.source=source;
      var params = {
        pageX: x,
        pageY: y,
      };
      setTimeout(() => {
        this.showContextMenu(params);
      }, 1);
    },
    showContextMenu(event) {
      let items = [
        {
          icon: "edit",
          text: 'ویرایش',
          click: () => {
            alert('Option0!')
          }
        },
        {
          icon: 'plus',
          text: 'اضافه کردن فرزند',
          divider: true,
          click: () => {
            this.$emit("add",this.source)
          }
        }
      ];
      this.$refs.kiContext.show(event, items);
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