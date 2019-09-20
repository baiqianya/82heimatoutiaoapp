<template>
  <div>
    <van-nav-bar title="首页" />
    <van-tabs v-model="active">
      <van-tab
       :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
        >{{channel.name}}</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 2,
      channels: []
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.channels = data.data.channels
    }
  }
}
</script>

<style>
</style>
