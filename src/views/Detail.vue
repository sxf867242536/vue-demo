<template>
  <div v-if="filminfo">
    <detail-header v-top :title="filminfo.name"></detail-header>
    <div
      :style="{ backgroundImage: 'url(' + filminfo.poster + ')' }"
      style="height:150px;background-size:cover;background-position:center"
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
          style="height:100px;background-size: cover;backgrounde-position:center;"
          @click="handlePreview(index)"
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
import detailHeader from '@/views/detail/DetailHeader.vue'
import { ImagePreview } from 'vant'
Vue.filter('dataFilter', date => {
  return moment(date * 1000).format('YYYY-MM-DD')
})
Vue.directive('top', {
  inserted (el) {
    el.style.display = 'none'
    window.onscroll = () => {
      if (
        (document.body.scrollTop || document.documentElement.scrollTop) > 10
      ) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})
export default {
  components: { detailSwiper, detailHeader },
  mounted () {
    http({
      url: `/gateway?filmId=${this.$route.params.myid}&k=3316774`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      this.filminfo = res.data.data.film
    })
  },
  data () {
    return {
      filminfo: null,
      isShow: false
    }
  },
  methods: {
    handlePreview (index) {
      ImagePreview({
        images: this.filminfo.photos,
        startPosition: index,
        loop: false,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.synopis {
  height: 30px;
  overflow: hidden;
}
</style>
