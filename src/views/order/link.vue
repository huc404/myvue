<template>
  <el-card>
    <!--1.0 订单查询 -->
    <el-form size="mini" :model="searchForm" label-width="80px" :inline="true">
      <el-form-item label="订单号">
        <el-input v-model="searchForm.orderNum"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="searchForm.orderName"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchForm.tel"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="searchForm.state">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间" required>
        <el-date-picker
          v-model="searchForm.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 2.0订单列表 -->
    <el-table :data="tableData" border style="width: 100%" size="mini">
      <el-table-column prop="orderNo" label="订单号" width="60">
      </el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="100">
      </el-table-column>
      <el-table-column prop="consignee" label="收货人"> </el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址">
      </el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="180">
      </el-table-column>
      <el-table-column prop="remarks" label="用户备注"> </el-table-column>
      <el-table-column prop="orderAmount" label="订单金额"> </el-table-column>
      <el-table-column prop="orderState" label="订单状态"> </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template v-slot="{ row }">
          <el-link @click="showCurData(row)">
            查看
          </el-link>
          <el-link @click="$router.push(`/order/edit/${row.id}`)">
            编辑
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 5, 10, 15]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 查看面板 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <div>
        <h3>订单号：{{ curOrder.orderNo }}</h3>
        <h3>下单时间：{{ curOrder.orderTime }}</h3>
        <h3>手机号：{{ curOrder.phone }}</h3>
        <h3>收货人：{{ curOrder.consignee }}</h3>
        <h3>配送地址：{{ curOrder.deliverAddress }}</h3>
        <h3>送达时间：{{ curOrder.deliveryTime }}</h3>
        <h3>用户备注：{{ curOrder.remarks }}</h3>
        <h3>订单金额：{{ curOrder.orderAmount }}</h3>
        <h3>订单状态：{{ curOrder.orderState }}</h3>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import moment from 'moment'
import { getOrderList, orderSearch } from '../../api/order.js'
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      searchForm: {
        orderNum: '',
        orderName: '',
        tel: '',
        state: '',
        time: []
      },
      dialogVisible: false,
      curOrder: {},
      tableData: [],
      timeStr: 'YYYY-MM-DD HH:mm:ss',
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  created() {
    this.getOrderData()
  },
  methods: {
    async getOrderData() {
      const res = await getOrderList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.searchForm.orderNum,
        consignee: this.searchForm.orderName,
        phone: this.searchForm.tel,
        orderState: this.searchForm.state,
        date: this.searchForm.time
      })
      this.tableData = res.data
      this.total = res.total
      res.data.forEach(item => {
        item.orderTime = moment(item.orderTime).format(this.timeStr)
        item.deliveryTime = moment(item.deliveryTime).format(this.timeStr)
      })
      console.log(res)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getOrderData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getOrderData()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async onSubmit() {
      const dateArr = []
      console.log(this.searchForm)
      this.searchForm.time.forEach(item => {
        dateArr.push(moment(item).format(this.timeStr))
      })
      this.currentPage = 1

      // 收集查询数据
      const searchObj = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.searchForm.orderNum,
        consignee: this.searchForm.orderName,
        phone: this.searchForm.tel,
        orderState: this.searchForm.state,
        date: JSON.stringify(dateArr)
      }
      const data = await orderSearch(searchObj)
      console.log(data)
    },
    showCurData(o) {
      this.curOrder = o
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  float: right;
  margin: 30px 0 40px;
}
.el-link {
  margin-right: 10px;
}
</style>
