<template>
  <div>
    <van-nav-bar title="标题" @click-left="handleLeft">
      <template #left> <van-icon name="arrow-down" />上海 </template>
      <template #right>
        <van-icon name="search" size="18" color="black" />
      </template>
    </van-nav-bar>
    <div class="cinema" :style="{ height: height }">
      <ul>
        <li v-for="cinema in cinemaList" :key="cinema.cinemaId">
          <div>{{ cinema.name }}</div>
          <div class="address">{{ cinema.address }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import http from '@/util/http'
import BetterScroll from 'better-scroll'
import Vue from 'vue'
import { NavBar, Icon } from 'vant'

Vue.use(NavBar).use(Icon)
export default {
  data () {
    return {
      cinemaList: [],
      height: '0'
    }
  },
  mounted () {
    this.height = document.documentElement.clientHeight - 100 + 'px'
    http({
      url: '/gateway?cityId=110100&ticketFlag=1&k=7115329',
      headers: {
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      this.cinemaList = res.data.data.cinemas
      this.$nextTick(() => {
        new BetterScroll('.cinema', {
          scrollbar: {
            fade: true
          }
        })
      })
    })
  },
  methods: {
    handleLeft () {
      this.$router.push('/city')
    }
  }
}
</script>

<style lang="scss" scoped>
.cinema {
  height: 300px;
  overflow: hidden;
  position: relative; //修正滚动条位置
}
li {
  padding: 5px;
  .address {
    font-size: 12px;
    color: gray;
  }
}
</style>
