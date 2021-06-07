<template>
  <div>
    <film-swiper>
      <div v-for="img in imglist" :key="img" class="swiper-slide">
        <div
          :style="{ backgroundImage: 'url(' + img + ')' }"
          style="height:600px;background-size: cover;"
        ></div>
      </div>
    </film-swiper>
    <film-header
      style="position:sticky;top:0px;background:white;z-index:100;"
    ></film-header>
    <router-view></router-view>
  </div>
</template>

<script>
import filmHeader from './../views/film/FilmHeader'
import filmSwiper from './../views/film/FilmSwiper'
export default {
  components: {
    filmHeader,
    filmSwiper
  },
  data () {
    return {
      imglist: [
        'https://pic.maizuo.com/usr/movie/4c4153c2a4c00a055f839adc9b85c551.jpg?x-oss-process=image/quality,Q_70',
        'https://pic.maizuo.com/usr/movie/e36d2d9c7db09e956849e89aebbc5259.jpg?x-oss-process=image/quality,Q_70',
        'https://pic.maizuo.com/usr/movie/56b8d62c897ee7d632361eb111d6a24d.jpg?x-oss-process=image/quality,Q_70'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  li {
    flex: 1;
  }
}
.active {
  color: red;
}
</style>
