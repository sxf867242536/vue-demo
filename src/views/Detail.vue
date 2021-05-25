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
    <div :class="isShow ? '' : 'synopis'">{{ filminfo.synopsis }}</div>
    <div style="text-align:center">
      <i
        class="iconfont"
        :class="isShow ? 'icon-less' : 'icon-moreunfold'"
        @click="isShow = !isShow"
      ></i>
    </div>
    <h3>演职人员</h3>
    <detail-swiper :perslide="3" swiperclass="swiper-actors">
      <div
        v-for="(actor, index) in filminfo.actors"
        :key="index"
        class="swiper-slide"
      >
        <img :src="actor.avatarAddress" alt="" />
        <div style="text-align:center">
          <div>{{ actor.name }}</div>
          <div>{{ actor.role }}</div>
        </div>
      </div>
    </detail-swiper>
    <h3>剧照</h3>
    <detail-swiper :perslide="2" swiperclass="swiper-photos">
      <div
        v-for="(photo, index) in filminfo.photos"
        :key="index"
        class="swiper-slide"
      >
        <div
          :style="{ backgroundImage: 'url(' + photo + ')' }"
          style="height:100px;background-size: cover;"
        ></div>
      </div>
    </detail-swiper>
  </div>
</template>

<script>
import http from '@/util/http'
import Vue from 'vue'
import moment from 'moment'
import detailSwiper from '@/views/detail/DetailSwiper.vue'
Vue.filter('dataFilter', date => {
  return moment(date * 1000).format('YYYY-MM-DD')
})
export default {
  components: { detailSwiper },
  mounted () {
    http({
      url: `/gateway?filmId=${this.$route.params.myid}&k=3316774`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      this.filminfo = res.data.data.film
      console.log(this.filminfo)
    })
  },
  data () {
    return {
      filminfo: null,
      isShow: false
    }
  }
}
</script>

<style lang="scss" scoped>
.synopis {
  height: 50px;
  overflow: hidden;
}
</style>
