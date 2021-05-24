<template>
  <div v-if="filminfo">
    <div
      :style="{ backgroundImage: 'url(' + filminfo.poster + ')' }"
      style="height:200px;background-size:cover;background-position:center"
    ></div>
    <h3>{{ filminfo.name }}-{{ filminfo.filmType.name }}</h3>
    <div>{{ filminfo.category }}</div>
    <div>{{ filminfo.premiereAt | dataFilter }}</div>
    <div>{{ filminfo.nation }} | {{ filminfo.runtime }}分钟</div>
    <div>{{ filminfo.synopsis }}</div>
  </div>
</template>

<script>
import http from '@/util/http'
import Vue from 'vue'
import moment from 'moment'
Vue.filter('dataFilter', date => {
  return moment(date * 1000).format('YYYY-MM-DD')
})
export default {
  mounted () {
    http({
      url: `/gateway?filmId=${this.$route.params.myid}&k=3316774`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      this.filminfo = res.data.data.film
      console.log('filminfo: ', this.filminfo)
    })
  },
  data () {
    return {
      filminfo: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
