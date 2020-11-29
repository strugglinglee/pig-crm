<template>
  <div id="app">
    <v-layout>
      <template #content>
        <router-view/>
      </template>
    </v-layout>
  </div>
</template>

<script>
import vLayout from '@/components/layout.vue'
export default {
  components: {
    vLayout,
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}
</style>
