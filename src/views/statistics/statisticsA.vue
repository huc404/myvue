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
          text: '堆叠区域图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }

      // 修改x坐标标题
      // option.xAxis.data = this.lineCharts.xData
      // option.series[0].data = this.lineCharts.orderData
      // option.series[1].data = this.lineCharts.amountData
      // 3.0 渲染数据
      myChart.setOption(option)

      // this.$emit('showLines', {
      //   option,
      //   myChart
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 40px;
}
</style>
