<template>
  <div>
    <tabbar></tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import tabbar from './components/Tabbar'

export default {
  components: {
    tabbar
  },
  mounted () {
    // axios
    //   .get(
    //     'http://www.mei.com/appapi/home/eventForH5?params=%7B%7D&timestamp=1621519399955&summary=5e9dd55411aae892109cc81fd1e97b4d&platform_code=H5'
    //   )
    //   .then(res => {
    //     console.log(res.data)
    //   })
    // axios
    //   .get(
    //     'ajax/movieOnInfoList?token=&optimus_uuid=12D456B0B97511EB886BB1D9900ACFB918ABE53F42D745959A46B7199B107633&optimus_risk_level=71&optimus_code=10'
    //   )
    //   .then(res => {
    //     console.log(res.data)
    //   })
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
</style>
