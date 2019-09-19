<template>
  <div class="login">
      <van-nav-bar title="登录" />
<ValidationObserver tag="form" ref="loginForm">
  <ValidationProvider tag="div" name="手机号" rules="required|phone" v-slot="{ errors }">
    <van-field
      v-model="user.mobile"
      clearable
      label="手机号"
      placeholder="请输入手机号"
      :error-message="errors[0]"
    />
  </ValidationProvider>
  <ValidationProvider tag="div" name="验证码" rules="required" v-slot="{ errors }">
    <van-field
      v-model="user.code"
      type="password"
      label="验证码"
      placeholder="请输入验证码"
      :error-message="errors[0]"
    />
  </ValidationProvider>
</ValidationObserver>

    <div class="login-btn">
      <van-button type="info" @click="onLogin" :loading="isLoginLoading">登录</van-button>
    </div>
  </div>
</template>

<script>
// 引入 request(请求)文件
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isLoginLoading: false
    }
  },
  methods: {
    // async 处理异步执行的代码
    async onLogin () {
      // try.. catch.. 异常处理函数
      try {
        // 表单验证
        const isValid = await this.$refs.loginForm.validate()
        // 验证失败 什么都不做
        if (!isValid) {
          return
        }
        // request 如果请求成功 赋值给 data  // await 等待async执行完再执行 request
        this.isLoginLoading = true
        const { data } = await login(this.user)
        this.$toast.success('登陆成功')
        this.isLoginLoading = false
        console.log(data)
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        }
      }
      this.isLoginLoading = false
    }
  }
}

</script>

<style lang="less" scoped>
.login-btn {
  padding: 20px;
  .van-button {
    width: 100%;
  }
}
</style>
