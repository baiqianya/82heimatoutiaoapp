/* eslint-disable indent */
import dayjs from 'dayjs'
import rTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

// const dayjs = require('dayjs')
// const relativeTime = require('dayjs/plugin/relativeTime')
// require('dayjs/locale/zh-cn')
dayjs.extend(rTime)

dayjs.locale('zh-cn') // 全局使用简体中文

export const relativeTime = dateTime => {
     // eslint-disable-next-line indent
     return dayjs().from(dayjs(dateTime))
}
