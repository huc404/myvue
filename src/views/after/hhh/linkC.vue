<template>
  <el-card>
    <div ref="homeCharts" style="width: 750px;height:400px;"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts'

export default {
  mounted() {
    this.setCharts()
  },
  methods: {
    setCharts() {
      // 1.0 初始化数据
      const myChart = echarts.init(this.$refs.homeCharts)
      // 2.0 设置配置项
      const option = {
        title: {
          text: '数据统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['订单统计', '销售统计']
        },
        grid: {
          left: '5%',
          right: '6%',
          bottom: '10%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '订单统计',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: '销售统计',
            type: 'line',
            stack: '总量',
            data: []
          }
        ]
      }

      // 修改x坐标标题
      // option.xAxis.data = this.lineCharts.xData
      // option.series[0].data = this.lineCharts.orderData
      // option.series[1].data = this.lineCharts.amountData
      // 3.0 渲染数据
      // myChart.setOption(option)

      this.$emit('showLines', {
        option,
        myChart
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 40px;
}
</style>
