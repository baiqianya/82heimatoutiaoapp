<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar fixed title="首页" />
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <van-pull-refresh v-model="channel.pullDownLoading" @refresh="onRefresh">
        <van-list
          v-model="channel.loading"
          :finished="channel.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="article in channel.articles"
            :key="article.art_id.toString()"
            :title="article.title"
          >
          <div slot="label">
            <van-grid :border="false" :column-num="3">
              <van-grid-item v-for="(img, index) in article.cover.images" :key="index">
                <van-image height="80" :src="img" lazy-load />
              </van-grid-item>
            </van-grid>
            <div class="article-info">
              <div class="meta">
                <span>{{ article.aut_name }}</span>
                <span>{{ article.comm_count }}评论</span>
                <span>{{ article.pubdate | relativeTime}}</span>
              </div>
              <van-icon name="close" />
            </div>
          </div>
          </van-cell>
        </van-list>
        </van-pull-refresh>
      </van-tab>
      <!-- 面包按钮 -->
      <div slot="nav-right" class="wap-nav" @click="isChannelEditShow = true">
        <van-icon name="wap-nav" size="24" />
      </div>
    </van-tabs>
    <!-- 编辑频道 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '95%' }"
      closeable
      round
      close-icon-position="top-left"
    />
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
import { getArticles } from '@/api/article'

export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: true
    }
  },

  computed: {
    currentChannel () {
      return this.channels[this.active]
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      data.data.channels.forEach(channel => {
        channel.articles = []
        channel.loading = false
        channel.finished = false
        channel.timestamp = null
        channel.pullDownLoading = false
      })
      this.channels = data.data.channels
      // console.log(data)
    },
    async onLoad () {
      const currentChannel = this.currentChannel
      const { data } = await getArticles({
        channel_id: currentChannel.id,
        timestamp: currentChannel.timestamp || Date.now(),
        with_top: 1
      })

      // eslint-disable-next-line camelcase
      const { pre_timestamp, results } = data.data

      currentChannel.articles.push(...results) // ... 把数组拆开

      currentChannel.loading = false

      // eslint-disable-next-line camelcase
      if (!pre_timestamp) {
        currentChannel.finished = true
      } else {
        // eslint-disable-next-line camelcase
        currentChannel.timestamp = pre_timestamp
      }
    },
    async onRefresh () {
      const currentChannel = this.currentChannel
      const { data } = await getArticles({
        channel_id: currentChannel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      const { results } = data.data

      currentChannel.articles.unshift(...results)

      currentChannel.pullDownLoading = false

      this.$toast('刷新成功')
    }
    // onLoad () {
    //   // 异步更新数据
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       const articles = this.currentChannel.articles
    //       articles.push(articles.length + 1)
    //     }
    //     // 加载状态结束
    //     this.currentChannel.loading = false

    //     // 数据全部加载完成
    //     if (this.currentChannel.articles.length >= 40) {
    //       this.currentChannel.finished = true
    //     }
    //   }, 500)
    // }
  }
}
</script>

<style lang="less">
.home {
  .van-tabs {
    .van-tabs__content {
      margin-bottom: 50px;
      margin-top: 90px;
    }
    .van-tabs__wrap {
      position: fixed;
      top: 46px;
      right: 0;
      left: 0;
      z-index: 2;
    }
  }
  .article-info{
    .meta span {
      margin-right: 10px;
    }
  }
  .wap-nav {
  position: sticky;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  opacity: 0.8;
}
}
</style>
