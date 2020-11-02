<template>
  <div>
    <!-- 1.0 卡片列表 -->
    <list-card :cards="topCards" />
    <!-- 2.0 数据统计 -->
    <lineChart @showLines="fn"></lineChart>
  </div>
</template>

<script>
import listCard from './hhh/lc.vue'
import lineChart from './hhh/linkC.vue'
import { getHomeData } from '../../api/goodsCate.js'

export default {
  data() {
    return {
      topCards: {},
      globalData: {}
    }
  },
  components: {
    listCard,
    lineChart
  },
  created() {
    this.getCharts()
  },
  methods: {
    async getCharts() {
      const data = await getHomeData()
      // 上面的卡片赋值
      this.topCards = {
        todayOrder: data.todayOrder,
        totalAmount: data.totalAmount,
        totalOrder: data.totalOrder,
        totayAmount: data.totayAmount
      }
      // 折线图数据赋值
      // 在这里操作子组件的option的其他项，最好在这里调用最后的渲染
      this.globalData.option.xAxis.data = data.xData
      this.globalData.option.series[0].data = data.orderData
      this.globalData.option.series[1].data = data.amountData
      // 3.0 渲染数据
      this.globalData.myChart.setOption(this.globalData.option)
    },
    fn(o) {
      this.globalData = o
    }
  }
}
</script>

<style lang="less" scoped></style>
