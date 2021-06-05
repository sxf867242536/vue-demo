<template>
  <div class="cinema" :style="{ height: height }">
    <ul>
      <li v-for="cinema in cinemaList" :key="cinema.cinemaId">
        <div>{{ cinema.name }}</div>
        <div class="address">{{ cinema.address }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import http from '@/util/http'
import BetterScroll from 'better-scroll'
export default {
  data () {
    return {
      cinemaList: [],
      height: '0'
    }
  },
  mounted () {
    this.height = document.documentElement.clientHeight - 50 + 'px'
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
