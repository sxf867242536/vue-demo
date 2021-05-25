<template>
  <div>
    <tabbar></tabbar>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import tabbar from './components/Tabbar'

export default {
  components: {
    tabbar
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
html,
body {
  height: 100%;
}
section {
  margin-bottom: 50px;
}
</style>
