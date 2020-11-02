<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="(item, i) in dataList" :key="item.id">
      <div class="grid-content bg-purple">
        <i
          :class="'iconfont ' + item.icon"
          :style="`color: ${colorArr[i]};`"
        ></i>
        <!-- <img :src="item.src" alt="" /> -->
        <p>
          <span>{{ item.text }}</span>
          <strong>{{ cards[item.num] }}</strong>
        </p>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    cards: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      colorArr: ['#1296db', '#d4237a', '#ff9800', '#1afa29'],
      dataList: [
        {
          id: 1,
          text: '总订单',
          num: 'totalOrder',
          icon: 'icon-wenjian'
        },
        {
          id: 2,
          text: '总销售额',
          num: 'totalAmount',
          icon: 'icon-Dollar'
        },
        {
          id: 3,
          text: '今日订单',
          num: 'todayOrder',
          icon: 'icon-renwu'
        },
        {
          id: 4,
          text: '今日销售额',
          num: 'totayAmount',
          icon: 'icon-renminbi'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.bg-purple {
  background: #fff;
}
.grid-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 4px;
  min-height: 36px;

  i {
    font-size: 50px;
  }

  p {
    text-align: center;
    span,
    strong {
      display: block;
      color: #333;
      margin: 15px 0;
      font-size: 18px;
      color: red;
    }

    span {
      color: #999;
      margin-bottom: 5px;
    }
  }
}

img {
  width: 50px;
}
</style>
