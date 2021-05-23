<template>
  <div>
    detail
  </div>
</template>

<script>
import axios from 'axios'
export default {
  mounted () {
    // console.log(this.$route)
    axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.$route.params.myid}&k=3316774`,
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16216707141035585334542337"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped></style>
