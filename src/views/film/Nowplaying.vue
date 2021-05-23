<template>
  <div>
    <ul>
      <li
        v-for="data in datalist"
        :key="data.filmId"
        @click="handleClick(data.filmId)"
      >
        <img :src="data.poster" alt="" />
        {{ data.name }}
        <p>主演：{{ data.actors | actorFilter }}</p>
        <p>{{ data.nation }} | {{ data.runtime }}分钟</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
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
      datalist: []
    }
  },
  methods: {
    handleClick (id) {
      this.$router.push(`/detail/${id}`)
    }
  },
  mounted () {
    axios({
      url:
        'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=2499752',
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1621520980801290573578241","bc":"310100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      this.datalist = res.data.data.films
    })
  }
}
</script>

<style lang="scss" scoped>
li {
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
