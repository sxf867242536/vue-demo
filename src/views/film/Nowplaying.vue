<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="data in datalist"
        :key="data.filmId"
        @click="handleClick(data.filmId)"
      >
        <img :src="data.poster" alt="" />
        {{ data.name }}
        <p>主演：{{ data.actors | actorFilter }}</p>
        <p>{{ data.nation }} | {{ data.runtime }}分钟</p>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import http from '@/util/http'
import Vue from 'vue'
import { List, Cell } from 'vant'

Vue.use(List).use(Cell)
Vue.filter('actorFilter', actors => {
  if (actors) {
    return actors
      .map(act => {
        return act.name
      })
      .join(' ')
  } else {
    return '暂无主演'
  }
})
export default {
  data () {
    return {
      datalist: [],
      loading: false, // 是否正在加载中
      finished: false, // 是否已经结束
      current: 1, // 记录第几页数据
      total: 0 // 总数据长度
    }
  },
  methods: {
    handleClick (id) {
      this.$router.push(`/detail/${id}`)
    },
    onLoad () {
      if (this.datalist.length === this.total) {
        console.log('this.datalist.length: ', this.datalist.length)
        console.log('this.total: ', this.total)
        this.finished = true
        return
      }
      this.current++
      http({
        url: `/gateway?cityId=310100&pageNum=${this.current}&pageSize=10&type=1&k=2499752`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        this.datalist = [...this.datalist, ...res.data.data.films]
        this.loading = false
      })
    }
  },
  mounted () {
    http({
      url: '/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=2499752',
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      this.datalist = res.data.data.films
      this.total = res.data.data.total
    })
  }
}
</script>

<style lang="scss" scoped>
.van-cell {
  overflow: hidden;
  padding: 10px;
  img {
    float: left;
    width: 100px;
  }
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
