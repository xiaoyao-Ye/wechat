<template>
  <view>
    <NavBar :show-height="true" background="transparent">
      <view class="navBar">
        <uni-icons type="list" size="28" style="margin-right: 20rpx" @click="showDrawer"></uni-icons>
        <text>呵呵</text>
      </view>
    </NavBar>

    <uni-segmented-control
      :current="current"
      :values="['本月', '上月', '今年', '选择时间段']"
      @clickItem="tabChange"
      styleType="text"
      activeColor="#4cd964"
    ></uni-segmented-control>

    <view class="content">
      <view v-if="!currentDate.length">请选择时间</view>
      <view v-else>
        <view class="banner">
          <view>z</view>
          <view>s</view>
          <view>z</view>
        </view>
        <uni-swipe-action>
          <uni-swipe-action-item
            v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
            :key="index"
            :right-options="swipeActionOptions"
            @click="swipeClick($event, index)"
          >
            <view class="action-item">data {{ index }}</view>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>
    </view>

    <uni-datetime-picker ref="daterange" v-model="range" type="daterange" @change="rangeChange">
      {{ '' }}
    </uni-datetime-picker>

    <view class="addBill" @click="addBill">
      <uni-icons type="plusempty" size="32" color="#fff"></uni-icons>
    </view>

    <uni-drawer ref="drawer" mode="left">
      <view class="drawer">
        <view class="head" @click="loginAndLogout">
          <view class="avatar">
            <image :src="userInfo.avatar"></image>
          </view>
          <view>{{ userInfo.nickName ? userInfo.nickName : '未登录用户' }}</view>
          <view>{{ token ? '注销' : '点击进行登录' }}</view>
        </view>
        <view class="menuList">
          <view v-for="menu in menuList" :key="menu.name" @click="menuHandle(menu)">
            <uni-icons :type="menu.icon" size="32"></uni-icons>
            <text>{{ menu.name }}</text>
          </view>
        </view>
      </view>
    </uni-drawer>
  </view>
</template>

<script setup lang="ts">
import NavBar from '../../components/NavBar/index.vue'
import { formatDateRange, getCurrentMonthRange, getCurrentYearRange, getLastMonthRange } from '../../utils/dayjs'

import { IS_LAUNCH, TOKEN, USER_INFO } from '../../config/storage_key'

const isLaunch = uni.getStorageSync(IS_LAUNCH)
if (!isLaunch) uni.redirectTo({ url: '/pages/index/index' })

const userInfo = uni.getStorageSync(USER_INFO) ?? {}
const token = uni.getStorageSync(TOKEN) ?? {}

const loginAndLogout = () => {
  if (token) {
    console.log('注销')
  } else {
    uni.redirectTo({ url: '/pages/login/index' })
  }
}

const drawer = ref()
const showDrawer = () => {
  drawer.value.open()
}

const menuList = ref([
  { name: 'menu1', icon: 'settings' },
  { name: 'menu2', icon: 'medal' },
  { name: 'menu3', icon: 'vip' },
  { name: 'menu4', icon: 'paperclip' },
])
const menuHandle = (menu: any) => {
  uni.showToast({ title: menu.name, icon: 'none' })
}

const current = ref<number>(0)
const tabChange = (e: any) => {
  if (e.currentIndex == 3) {
    currentDate.value.length = 0
    daterange.value.show()
    current.value = 3
    return
  }
  if (current.value === e.currentIndex) return
  current.value = e.currentIndex

  const obj: { [key: number]: any } = {
    0: getCurrentMonthRange,
    1: getLastMonthRange,
    2: getCurrentYearRange,
  }
  currentDate.value = obj[current.value]()
  getList()
}

const getList = async () => {
  console.log('currentDate', currentDate.value)
  try {
    // const res = await axios({ url: '/api/v1/tags', method: 'GET' })
    // console.log({ res })
  } catch (error) {
    console.log('error1', error)
  }
}

const daterange = ref()
const range = ref([new Date(), new Date()])
const currentDate = ref<string[]>([]) // 当前选中的日期
const rangeChange = (val: string[]) => {
  currentDate.value = formatDateRange(val)
  getList()
}

const swipeActionOptions = [
  { text: '修改', style: { backgroundColor: '#4cd964' } },
  { text: '删除', style: { backgroundColor: '#F56C6C' } },
]
const swipeClick = (e: any, index: number) => {
  console.log('点击了' + (e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮' + index)
}

const addBill = () => {
  // uni.showToast({ title: 'addBill', icon: 'none' })
  uni.navigateTo({ url: '/pages/addBill/index' })
}
</script>

<style lang="scss" scoped>
.navBar {
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  height: 100%;
}

.addBill {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 40rpx;
  bottom: 60rpx;
  width: 100rpx;
  height: 100rpx;
  border-radius: 100%;
  background-color: #4cd964;
}

.drawer {
  .head {
    padding-bottom: 20rpx;
    padding-top: 120rpx;
    text-align: center;
    background-color: skyblue;
    .avatar {
      margin: 0 auto;
      width: 150rpx;
      height: 150rpx;
      overflow: hidden;
      image {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
  }
  .menuList {
    padding: 20rpx;
    > view {
      display: flex;
      align-items: center;
    }
  }
}

.content {
  .banner {
    margin: 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 140rpx;
    border: 2rpx solid;
    border-radius: 20rpx;
  }
  .action-item {
    padding: 20rpx;
    height: 80rpx;
    border-bottom: 2rpx solid #eee;
  }
}
</style>
